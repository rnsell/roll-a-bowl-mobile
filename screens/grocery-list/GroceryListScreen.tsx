import { Suspense, useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StyleSheet } from 'react-native';
import { useMutation, useSuspenseQuery } from '@apollo/client/react';

import { Box, Caption, Card, Heading, Icon, Label, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import {
  GetShoppingList,
  GenerateShoppingList,
  RegenerateShoppingList,
  ToggleShoppingListItem,
  AddShoppingListItem,
  RemoveShoppingListItem,
  GetFamilyShoppingList,
  GenerateFamilyShoppingList,
  RegenerateFamilyShoppingList,
  ToggleFamilyShoppingListItem,
  AddFamilyShoppingListItem,
  RemoveFamilyShoppingListItem,
} from '@/graphql/operations';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { useAppSelector } from '@/store/hooks';
import { ProgressBar } from './ProgressBar';
import { AisleGroup } from './AisleGroup';
import { GroceryItem } from './GroceryItem';
import type { GroceryItemData } from './GroceryItem';
import { GeneratePrompt } from './GeneratePrompt';
import { WriteInForm } from './WriteInForm';

// ── Date Helpers (shared with meal plan) ─────────────────────────────

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

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const startDate = toDateString(monday);
  const endDate = toDateString(sunday);

  const monMonth = shortMonth(monday);
  const sunMonth = shortMonth(sunday);
  const weekLabel =
    monMonth === sunMonth
      ? `${monMonth} ${monday.getDate()} – ${sunday.getDate()}`
      : `${monMonth} ${monday.getDate()} – ${sunMonth} ${sunday.getDate()}`;

  return { startDate, endDate, weekLabel };
}

type ShoppingListMode = 'personal' | 'family';

// ── Personal Content ─────────────────────────────────────────────────

function PersonalShoppingListContent({ week, mode }: { week: WeekInfo; mode: ShoppingListMode }): React.JSX.Element {
  const { data, refetch } = useSuspenseQuery(GetShoppingList, {
    variables: { input: { startDate: week.startDate, endDate: week.endDate } },
  });

  const [generate, { loading: generating }] = useMutation(GenerateShoppingList);
  const [regenerate] = useMutation(RegenerateShoppingList);
  const [toggle] = useMutation(ToggleShoppingListItem);
  const [addItem] = useMutation(AddShoppingListItem);
  const [removeItem] = useMutation(RemoveShoppingListItem);

  const list = data.shoppingList;

  if (!list) {
    return (
      <GeneratePrompt
        loading={generating}
        onGenerate={async () => {
          try {
            await generate({ variables: { input: { startDate: week.startDate, endDate: week.endDate } } });
            refetch();
          } catch (err) {
            Alert.alert('Error', err instanceof Error ? err.message : 'Failed to generate list');
          }
        }}
      />
    );
  }

  return (
    <ShoppingListView
      listId={list.id}
      aisleGroups={list.aisleGroups}
      onToggle={async (itemId) => {
        try {
          await toggle({ variables: { input: { itemId } } });
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to toggle item');
        }
      }}
      onRemove={async (itemId) => {
        try {
          await removeItem({ variables: { input: { itemId } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to remove item');
        }
      }}
      onAddItem={async (name) => {
        try {
          await addItem({ variables: { input: { shoppingListId: list.id, name } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add item');
        }
      }}
      onRegenerate={async () => {
        try {
          await regenerate({ variables: { input: { shoppingListId: list.id } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to regenerate list');
        }
      }}
    />
  );
}

// ── Family Content ───────────────────────────────────────────────────

function FamilyShoppingListContent({ week, mode }: { week: WeekInfo; mode: ShoppingListMode }): React.JSX.Element {
  const { data, refetch } = useSuspenseQuery(GetFamilyShoppingList, {
    variables: { input: { startDate: week.startDate, endDate: week.endDate } },
  });

  const [generate, { loading: generating }] = useMutation(GenerateFamilyShoppingList);
  const [regenerate] = useMutation(RegenerateFamilyShoppingList);
  const [toggle] = useMutation(ToggleFamilyShoppingListItem);
  const [addItem] = useMutation(AddFamilyShoppingListItem);
  const [removeItem] = useMutation(RemoveFamilyShoppingListItem);

  const list = data.familyShoppingList;

  if (!list) {
    return (
      <GeneratePrompt
        loading={generating}
        onGenerate={async () => {
          try {
            await generate({ variables: { input: { startDate: week.startDate, endDate: week.endDate } } });
            refetch();
          } catch (err) {
            Alert.alert('Error', err instanceof Error ? err.message : 'Failed to generate list');
          }
        }}
      />
    );
  }

  return (
    <ShoppingListView
      listId={list.id}
      aisleGroups={list.aisleGroups}
      onToggle={async (itemId) => {
        try {
          await toggle({ variables: { input: { itemId } } });
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to toggle item');
        }
      }}
      onRemove={async (itemId) => {
        try {
          await removeItem({ variables: { input: { itemId } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to remove item');
        }
      }}
      onAddItem={async (name) => {
        try {
          await addItem({ variables: { input: { familyShoppingListId: list.id, name } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to add item');
        }
      }}
      onRegenerate={async () => {
        try {
          await regenerate({ variables: { input: { familyShoppingListId: list.id } } });
          refetch();
        } catch (err) {
          Alert.alert('Error', err instanceof Error ? err.message : 'Failed to regenerate list');
        }
      }}
    />
  );
}

// ── Shared List View ─────────────────────────────────────────────────

interface AisleGroupData {
  aisle: { id: number; name: string; slug: string; sortOrder: number };
  allChecked: boolean;
  items: Array<{
    id: number;
    name: string;
    quantity?: number | null | undefined;
    measurement?: { id: number; name: string; abbreviation: string } | null | undefined;
    source: string;
    isChecked: boolean;
    sortOrder: number;
  }>;
}

interface ShoppingListViewProps {
  listId: number;
  aisleGroups: AisleGroupData[];
  onToggle: (itemId: number) => void;
  onRemove: (itemId: number) => void;
  onAddItem: (name: string) => void;
  onRegenerate: () => void;
}

function ShoppingListView({ listId, aisleGroups, onToggle, onRemove, onAddItem, onRegenerate }: ShoppingListViewProps): React.JSX.Element {
  const { colors } = useTheme();

  const { totalItems, checkedItems } = useMemo(() => {
    let total = 0;
    let checked = 0;
    for (const group of aisleGroups) {
      total += group.items.length;
      checked += group.items.filter((i) => i.isChecked).length;
    }
    return { totalItems: total, checkedItems: checked };
  }, [aisleGroups]);

  const handleRegenerate = useCallback(() => {
    Alert.alert(
      'Regenerate List',
      'This will rebuild your shopping list from the current meal plan and reset all checked items. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Regenerate', style: 'destructive', onPress: onRegenerate },
      ],
    );
  }, [onRegenerate]);

  return (
    <>
      <Box mt={2}>
        <ProgressBar checked={checkedItems} total={totalItems} />
      </Box>

      <Box mt={2}>
        <WriteInForm onSubmit={onAddItem} />
      </Box>

      <Box mt={2} gap={1}>
        {aisleGroups.map((group) => {
          const checkedCount = group.items.filter((i) => i.isChecked).length;

          return (
            <Card key={group.aisle.id}>
              <AisleGroup
                name={group.aisle.name}
                allChecked={group.allChecked}
                checkedCount={checkedCount}
                totalCount={group.items.length}
              >
                {group.items.map((item) => (
                  <GroceryItem
                    key={item.id}
                    item={{
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity ?? null,
                      measurementAbbreviation: item.measurement?.abbreviation ?? null,
                      isChecked: item.isChecked,
                    }}
                    onToggle={() => onToggle(item.id)}
                    onRemove={() => onRemove(item.id)}
                  />
                ))}
              </AisleGroup>
            </Card>
          );
        })}
      </Box>

      {aisleGroups.length > 0 ? (
        <Box mt={2}>
          <Pressable onPress={handleRegenerate}>
            <Row alignItems="center" justifyContent="center" py={1}>
              <Caption.Regular color={colors.secondary}>Regenerate from meal plan</Caption.Regular>
            </Row>
          </Pressable>
        </Box>
      ) : null}
    </>
  );
}

// ── Mode Toggle ─────────────────────────────────────────────────────

function ModeToggle({ mode, onModeChange }: { mode: ShoppingListMode; onModeChange: (m: ShoppingListMode) => void }): React.JSX.Element {
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

export function GroceryListScreen(): React.JSX.Element {
  useScreenFocus(Screen.GroceryList);
  const { colors } = useTheme();
  const familyGroupId = useAppSelector((state) => state.user.profile?.familyGroupId);
  const hasFamilyGroup = familyGroupId !== null && familyGroupId !== undefined;
  const [mode, setMode] = useState<ShoppingListMode>(hasFamilyGroup ? 'family' : 'personal');
  const [weekOffset, setWeekOffset] = useState(0);

  const week = useMemo(() => getWeekInfo(weekOffset), [weekOffset]);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
        <Row alignItems="center" justifyContent="space-between">
          <Heading.Regular>Grocery List</Heading.Regular>
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
            <FamilyShoppingListContent week={week} mode={mode} />
          ) : (
            <PersonalShoppingListContent week={week} mode={mode} />
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
