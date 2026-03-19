import { Suspense, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet } from 'react-native';
import { useMutation, useSuspenseQuery } from '@apollo/client/react';

import { Box, Caption, Heading, Icon, Label, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import {
  GetMealPlanRange,
  GetFamilyMealPlanRange,
  AddRecipeToMealPlan,
  RemoveRecipeFromMealPlan,
  ClearMealSlot,
  AddAdHocMeal,
  RemoveAdHocMeal,
  UpdateAdHocMeal,
  AddRecipeToFamilyMealPlan,
  RemoveRecipeFromFamilyMealPlan,
  ClearFamilyMealSlot,
  AddFamilyAdHocMeal,
  RemoveFamilyAdHocMeal,
  UpdateFamilyAdHocMeal,
} from '@/graphql/operations';
import type { GetMealPlanRangeQuery, GetFamilyMealPlanRangeQuery } from '@/graphql/generated/graphql';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { useAppSelector } from '@/store/hooks';
import { DayPill } from './DayPill';
import { MealSlotCard } from './MealSlotCard';
import type { MealSlot } from './MealSlotCard';
import type { MealEntryData } from './MealEntryRow';
import { RecipePickerModal } from './RecipePickerModal';
import { AddMealSheet } from './AddMealSheet';

// ── Constants ────────────────────────────────────────────────────────

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snacks'] as const;
const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
  snacks: 'Snacks',
};

// ── Date Helpers ─────────────────────────────────────────────────────

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function toDateString(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function shortMonth(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short' });
}

interface WeekInfo {
  monday: Date;
  sunday: Date;
  dates: Date[];
  startDate: string;
  endDate: string;
  weekLabel: string;
}

function getWeekInfo(offset: number = 0): WeekInfo {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday + offset * 7);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    dates.push(d);
  }

  const sunday = dates[6];
  const startDate = toDateString(monday);
  const endDate = toDateString(sunday);

  const monMonth = shortMonth(monday);
  const sunMonth = shortMonth(sunday);
  const weekLabel =
    monMonth === sunMonth
      ? `${monMonth} ${monday.getDate()} – ${sunday.getDate()}`
      : `${monMonth} ${monday.getDate()} – ${sunMonth} ${sunday.getDate()}`;

  return { monday, sunday, dates, startDate, endDate, weekLabel };
}

type MealPlanMode = 'personal' | 'family';

// ── Slot Builder ─────────────────────────────────────────────────────

interface RawEntry {
  id: string;
  mealType: string;
  meal: { __typename?: string; id?: number; name?: string; slug?: string; text?: string };
  addedBy?: string;
}

function buildSlots(entries: RawEntry[]): MealSlot[] {
  const entriesByType = new Map<string, MealEntryData[]>();
  for (const mealType of MEAL_TYPES) {
    entriesByType.set(mealType, []);
  }

  for (const entry of entries) {
    const list = entriesByType.get(entry.mealType);
    if (!list) continue;

    const { meal } = entry;
    const isAdHoc = meal.__typename === 'AdHocMealType';
    list.push({
      id: entry.id,
      name: isAdHoc ? (meal.text ?? '') : (meal.name ?? ''),
      isAdHoc,
      addedBy: entry.addedBy,
    });
  }

  return MEAL_TYPES.map((mealType) => ({
    meal: MEAL_LABELS[mealType],
    mealType,
    entries: entriesByType.get(mealType) ?? [],
  }));
}

// ── Meal Plan Content ────────────────────────────────────────────────

interface MealPlanContentProps {
  week: WeekInfo;
  weekOffset: number;
  mode: MealPlanMode;
}

function PersonalMealPlanContent({ week, weekOffset, mode }: MealPlanContentProps): React.JSX.Element {
  const { data, refetch } = useSuspenseQuery(GetMealPlanRange, {
    variables: { input: { startDateInclusive: week.startDate, endDateInclusive: week.endDate } },
  });

  const entriesByDate = useMemo(() => {
    const map = new Map<string, GetMealPlanRangeQuery['mealPlanRange'][number]>();
    for (const day of data.mealPlanRange) map.set(day.date, day);
    return map;
  }, [data.mealPlanRange]);

  return (
    <MealPlanDayView
      week={week}
      weekOffset={weekOffset}
      mode={mode}
      entriesByDate={entriesByDate}
      refetch={refetch}
    />
  );
}

function FamilyMealPlanContent({ week, weekOffset, mode }: MealPlanContentProps): React.JSX.Element {
  const { data, refetch } = useSuspenseQuery(GetFamilyMealPlanRange, {
    variables: { input: { startDateInclusive: week.startDate, endDateInclusive: week.endDate } },
  });

  const entriesByDate = useMemo(() => {
    const map = new Map<string, GetFamilyMealPlanRangeQuery['familyMealPlanRange'][number]>();
    for (const day of data.familyMealPlanRange) map.set(day.date, day);
    return map;
  }, [data.familyMealPlanRange]);

  return (
    <MealPlanDayView
      week={week}
      weekOffset={weekOffset}
      mode={mode}
      entriesByDate={entriesByDate}
      refetch={refetch}
    />
  );
}

// ── Day View (shared) ────────────────────────────────────────────────

interface MealPlanDayViewProps {
  week: WeekInfo;
  weekOffset: number;
  mode: MealPlanMode;
  entriesByDate: Map<string, { entries: RawEntry[] }>;
  refetch: () => void;
}

function MealPlanDayView({ week, weekOffset, mode, entriesByDate, refetch }: MealPlanDayViewProps): React.JSX.Element {
  const [activeDayIndex, setActiveDayIndex] = useState(() => {
    if (weekOffset !== 0) return 0;
    const dayOfWeek = new Date().getDay();
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  });

  // Add meal sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetSlot, setSheetSlot] = useState<{ date: string; mealType: string } | null>(null);

  // Recipe picker state
  const [pickerOpen, setPickerOpen] = useState(false);
  const [targetSlot, setTargetSlot] = useState<{ date: string; mealType: string } | null>(null);


  // Personal mutations
  const [addRecipe] = useMutation(AddRecipeToMealPlan);
  const [removeRecipe] = useMutation(RemoveRecipeFromMealPlan);
  const [clearSlot] = useMutation(ClearMealSlot);
  const [addAdHoc] = useMutation(AddAdHocMeal);
  const [removeAdHoc] = useMutation(RemoveAdHocMeal);
  const [updateAdHoc] = useMutation(UpdateAdHocMeal);

  // Family mutations
  const [addFamilyRecipe] = useMutation(AddRecipeToFamilyMealPlan);
  const [removeFamilyRecipe] = useMutation(RemoveRecipeFromFamilyMealPlan);
  const [clearFamilySlot] = useMutation(ClearFamilyMealSlot);
  const [addFamilyAdHoc] = useMutation(AddFamilyAdHocMeal);
  const [removeFamilyAdHoc] = useMutation(RemoveFamilyAdHocMeal);
  const [updateFamilyAdHoc] = useMutation(UpdateFamilyAdHocMeal);

  const daysWithMeals = useMemo(() => {
    const set = new Set<number>();
    week.dates.forEach((date, i) => {
      const dayData = entriesByDate.get(toDateString(date));
      if (dayData && dayData.entries.length > 0) set.add(i);
    });
    return set;
  }, [entriesByDate, week.dates]);

  const dateStr = toDateString(week.dates[activeDayIndex]);
  const dayData = entriesByDate.get(dateStr);
  const slots = useMemo(() => buildSlots(dayData?.entries ?? []), [dayData]);

  // ── Handlers ─────────────────────────────────────────────────────

  const handleAddMeal = useCallback((mealType: string) => {
    const date = toDateString(week.dates[activeDayIndex]);
    setSheetSlot({ date, mealType });
    setSheetOpen(true);
  }, [week.dates, activeDayIndex]);

  const handleSheetAddRecipe = useCallback(() => {
    if (!sheetSlot) return;
    setTargetSlot(sheetSlot);
    setPickerOpen(true);
    setSheetOpen(false);
  }, [sheetSlot]);

  const handleAddQuickMeal = useCallback(async (text: string) => {
    if (!sheetSlot) return;

    try {
      if (mode === 'family') {
        await addFamilyAdHoc({
          variables: { input: { date: sheetSlot.date, mealType: sheetSlot.mealType, text } },
        });
      } else {
        await addAdHoc({
          variables: { input: { date: sheetSlot.date, mealType: sheetSlot.mealType, text } },
        });
      }
      refetch();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add meal');
    }
    setSheetSlot(null);
  }, [sheetSlot, mode, addAdHoc, addFamilyAdHoc, refetch]);

  const handleRecipeSelected = useCallback(async (recipe: { id: number; slug: string; name: string }) => {
    if (!targetSlot) return;
    setPickerOpen(false);

    try {
      if (mode === 'family') {
        await addFamilyRecipe({
          variables: { input: { date: targetSlot.date, mealType: targetSlot.mealType, recipeId: recipe.id } },
        });
      } else {
        await addRecipe({
          variables: { input: { date: targetSlot.date, mealType: targetSlot.mealType, recipeSlug: recipe.slug } },
        });
      }
      refetch();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add recipe');
    }
    setTargetSlot(null);
  }, [targetSlot, mode, addRecipe, addFamilyRecipe, refetch]);


  const handleRemoveEntry = useCallback(async (entry: MealEntryData) => {
    try {
      if (entry.isAdHoc) {
        const adHocId = parseInt(entry.id.replace('adhoc:', ''), 10);
        if (mode === 'family') {
          await removeFamilyAdHoc({ variables: { input: { adHocMealId: adHocId } } });
        } else {
          await removeAdHoc({ variables: { input: { adHocMealId: adHocId } } });
        }
      } else {
        const date = toDateString(week.dates[activeDayIndex]);
        // Find which mealType this entry belongs to
        const slot = slots.find((s) => s.entries.some((e) => e.id === entry.id));
        const mealType = slot?.mealType ?? '';
        const recipeId = parseInt(entry.id.replace('recipe:', ''), 10);

        if (mode === 'family') {
          await removeFamilyRecipe({ variables: { input: { date, mealType, recipeId } } });
        } else {
          // Personal uses slug — we need to find it. For now, use the entry name as fallback.
          // The entry id is "recipe:<id>", we need the slug. Let's extract from the raw data.
          const rawEntry = dayData?.entries.find((e) => e.id === entry.id);
          const slug = rawEntry?.meal && 'slug' in rawEntry.meal ? rawEntry.meal.slug : '';
          if (slug) {
            await removeRecipe({ variables: { input: { date, mealType, recipeSlug: slug } } });
          }
        }
      }
      refetch();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to remove meal');
    }
  }, [mode, week.dates, activeDayIndex, slots, dayData, removeRecipe, removeFamilyRecipe, removeAdHoc, removeFamilyAdHoc, refetch]);

  const handleEditAdHoc = useCallback(async (entry: MealEntryData, newText: string) => {
    try {
      const adHocId = parseInt(entry.id.replace('adhoc:', ''), 10);
      if (mode === 'family') {
        await updateFamilyAdHoc({ variables: { input: { adHocMealId: adHocId, text: newText } } });
      } else {
        await updateAdHoc({ variables: { input: { adHocMealId: adHocId, text: newText } } });
      }
      refetch();
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to update meal');
    }
  }, [mode, updateAdHoc, updateFamilyAdHoc, refetch]);

  const handleClearSlot = useCallback((mealType: string) => {
    Alert.alert(
      'Clear Slot',
      `Remove all meals from ${MEAL_LABELS[mealType]}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            const date = toDateString(week.dates[activeDayIndex]);
            try {
              if (mode === 'family') {
                await clearFamilySlot({ variables: { input: { date, mealType } } });
              } else {
                await clearSlot({ variables: { input: { date, mealType } } });
              }
              refetch();
            } catch (err) {
              Alert.alert('Error', err instanceof Error ? err.message : 'Failed to clear slot');
            }
          },
        },
      ],
    );
  }, [week.dates, activeDayIndex, mode, clearSlot, clearFamilySlot, refetch]);

  return (
    <>
      <Row justifyContent="space-around" mt={2} mx={-1}>
        {week.dates.map((date, i) => (
          <DayPill
            key={i}
            day={DAY_LABELS[i]}
            dayNum={date.getDate()}
            active={activeDayIndex === i}
            hasMeals={daysWithMeals.has(i)}
            onPress={() => setActiveDayIndex(i)}
          />
        ))}
      </Row>

      <Box mt={2.5} gap={1.5}>
        {slots.map((slot) => (
          <MealSlotCard
            key={slot.mealType}
            slot={slot}
            onAddMeal={handleAddMeal}
            onRemoveEntry={handleRemoveEntry}
            onEditAdHoc={handleEditAdHoc}
            onClearSlot={handleClearSlot}
          />
        ))}
      </Box>

      <RecipePickerModal
        isOpen={pickerOpen}
        mode={mode}
        onSelect={handleRecipeSelected}
        onClose={() => { setPickerOpen(false); setTargetSlot(null); }}
      />

      <AddMealSheet
        isOpen={sheetOpen}
        mealLabel={sheetSlot ? MEAL_LABELS[sheetSlot.mealType] : ''}
        onAddRecipe={handleSheetAddRecipe}
        onAddQuickMeal={handleAddQuickMeal}
        onClose={() => { setSheetOpen(false); setSheetSlot(null); }}
      />
    </>
  );
}

// ── Mode Toggle ─────────────────────────────────────────────────────

function ModeToggle({ mode, onModeChange }: { mode: MealPlanMode; onModeChange: (m: MealPlanMode) => void }): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <Row
      gap={0.5}
      backgroundColor={colors.card}
      borderRadius={12}
      p={0.5}
      border={1}
      borderColor={colors.border}
      mt={2}
    >
      <Box flex={1}>
        <Pressable onPress={() => onModeChange('family')}>
          <Box py={1} borderRadius={10} alignItems="center" backgroundColor={mode === 'family' ? colors.primary : undefined}>
            <Label.Small color={mode === 'family' ? colors.onPrimary : colors.secondary}>Family</Label.Small>
          </Box>
        </Pressable>
      </Box>
      <Box flex={1}>
        <Pressable onPress={() => onModeChange('personal')}>
          <Box py={1} borderRadius={10} alignItems="center" backgroundColor={mode === 'personal' ? colors.primary : undefined}>
            <Label.Small color={mode === 'personal' ? colors.onPrimary : colors.secondary}>Personal</Label.Small>
          </Box>
        </Pressable>
      </Box>
    </Row>
  );
}

// ── Screen ──────────────────────────────────────────────────────────

export function MealPlanScreen(): React.JSX.Element {
  useScreenFocus(Screen.MealPlan);
  const { colors } = useTheme();
  const familyGroupId = useAppSelector((state) => state.user.profile?.familyGroupId);
  const hasFamilyGroup = familyGroupId !== null && familyGroupId !== undefined;
  const [mode, setMode] = useState<MealPlanMode>(hasFamilyGroup ? 'family' : 'personal');
  const [weekOffset, setWeekOffset] = useState(0);

  const week = useMemo(() => getWeekInfo(weekOffset), [weekOffset]);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
        <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
          <Row alignItems="center" justifyContent="space-between">
            <Heading.Regular>Meal Plan</Heading.Regular>
          </Row>

          {hasFamilyGroup ? (
            <ModeToggle mode={mode} onModeChange={setMode} />
          ) : null}

          <Box mt={1}>
            <Row alignItems="center" gap={1}>
              <Pressable onPress={() => setWeekOffset((o) => o - 1)}>
                <Icon name="chevron-left" size="sm" color={colors.primary} />
              </Pressable>
              <Caption.Regular color={colors.secondary} style={styles.weekLabel}>
                {week.weekLabel}
              </Caption.Regular>
              <Pressable onPress={() => setWeekOffset((o) => o + 1)}>
                <Icon name="chevron-right" size="sm" color={colors.primary} />
              </Pressable>
            </Row>
            {weekOffset !== 0 ? (
              <Pressable onPress={() => setWeekOffset(0)}>
                <Box mt={0.5}>
                  <Caption.Small color={colors.primary}>Back to this week</Caption.Small>
                </Box>
              </Pressable>
            ) : null}
          </Box>

          <Suspense fallback={
            <Box mt={4} alignItems="center">
              <ActivityIndicator size="small" />
            </Box>
          }>
            {mode === 'family' && hasFamilyGroup ? (
              <FamilyMealPlanContent week={week} weekOffset={weekOffset} mode={mode} />
            ) : (
              <PersonalMealPlanContent week={week} weekOffset={weekOffset} mode={mode} />
            )}
          </Suspense>
        </ScrollBox>
    </SafeAreaBox>
  );
}

const styles = StyleSheet.create({
  weekLabel: {
    fontWeight: '500',
  },
});
