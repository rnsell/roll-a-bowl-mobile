import { Suspense, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useSuspenseQuery } from '@apollo/client/react';

import { Box, Button, Caption, Heading, Row, SafeAreaBox, ScrollBox, useTheme } from '@/design-system';
import { GetMealPlanRange } from '@/graphql/operations';
import type { GetMealPlanRangeQuery } from '@/graphql/generated/graphql';
import { useScreenFocus } from '@/lib/navigation';
import { Screen } from '@/lib/screens';
import { DayPill } from './DayPill';
import { MealSlotCard } from './MealSlotCard';
import type { MealSlot } from './MealSlotCard';

// ── Helpers ─────────────────────────────────────────────────────────

const DAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;
const MEAL_TYPES = ['breakfast', 'lunch', 'dinner'] as const;
const MEAL_LABELS: Record<string, string> = {
  breakfast: 'Breakfast',
  lunch: 'Lunch',
  dinner: 'Dinner',
};

const placeholderColors = [
  '#C9956B', '#7BA06B', '#C0574B', '#D4A843', '#6B8F5E',
  '#A08660', '#8B7A6B', '#C07070', '#5C6B4A', '#B08930',
];

function pickColor(id: number): string {
  return placeholderColors[id % placeholderColors.length];
}

/** Pad a number to 2 digits. */
function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

/** Format a Date as YYYY-MM-DD. */
function toDateString(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

/** Short month name. */
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

function getWeekInfo(): WeekInfo {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0=Sun, 1=Mon, ...
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(today);
  monday.setDate(today.getDate() + diffToMonday);

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

// ── Content (Suspense boundary) ─────────────────────────────────────

function MealPlanContent({ week }: { week: WeekInfo }): React.JSX.Element {
  const { colors } = useTheme();
  const [activeDayIndex, setActiveDayIndex] = useState(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    // Map Sunday(0) → 6, Mon(1) → 0, Tue(2) → 1, etc.
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  });

  const { data } = useSuspenseQuery(GetMealPlanRange, {
    variables: {
      input: {
        startDateInclusive: week.startDate,
        endDateInclusive: week.endDate,
      },
    },
  });

  // Index entries by date string for fast lookup
  const entriesByDate = useMemo(() => {
    const map = new Map<string, typeof data.mealPlanRange[number]>();
    for (const day of data.mealPlanRange) {
      map.set(day.date, day);
    }
    return map;
  }, [data.mealPlanRange]);

  // Determine which dates have at least one entry
  const daysWithMeals = useMemo(() => {
    const set = new Set<number>();
    week.dates.forEach((date, i) => {
      const dayData = entriesByDate.get(toDateString(date));
      if (dayData && dayData.entries.length > 0) {
        set.add(i);
      }
    });
    return set;
  }, [entriesByDate, week.dates]);

  // Build MealSlot[] for the active day
  const slots: MealSlot[] = useMemo(() => {
    const dateStr = toDateString(week.dates[activeDayIndex]);
    const dayData = entriesByDate.get(dateStr);
    type MealPlanEntry = GetMealPlanRangeQuery['mealPlanRange'][number]['entries'][number];
    const entryByType = new Map<string, MealPlanEntry>();

    if (dayData) {
      for (const entry of dayData.entries) {
        // Use the first entry per meal type
        if (!entryByType.has(entry.mealType)) {
          entryByType.set(entry.mealType, entry);
        }
      }
    }

    return MEAL_TYPES.map((mealType) => {
      const entry = entryByType.get(mealType);
      if (!entry) {
        return { meal: MEAL_LABELS[mealType], name: null };
      }

      const { meal } = entry;
      if ('name' in meal) {
        return {
          meal: MEAL_LABELS[mealType],
          name: meal.name,
          color: pickColor(meal.id),
        };
      }
      // AdHocMealType
      return {
        meal: MEAL_LABELS[mealType],
        name: meal.text,
        color: '#A08660',
      };
    });
  }, [activeDayIndex, entriesByDate, week.dates]);

  return (
    <>
      <Box mt={1}>
        <Row alignItems="center" gap={1}>
          <FontAwesome name="chevron-left" size={12} color={colors.primary} />
          <Caption.Regular color={colors.secondary} style={styles.weekLabel}>
            {week.weekLabel}
          </Caption.Regular>
          <FontAwesome name="chevron-right" size={12} color={colors.primary} />
        </Row>
      </Box>

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
        {slots.map((slot, i) => (
          <MealSlotCard key={i} slot={slot} />
        ))}
      </Box>

      <Box mt={2.5}>
        <Row gap={1.5}>
          <Box flex={1}>
            <Button label="Copy Last Week" variant="outline" />
          </Box>
          <Box flex={1}>
            <Button label="Auto-Fill" variant="solid" />
          </Box>
        </Row>
      </Box>
    </>
  );
}

// ── Screen ──────────────────────────────────────────────────────────

export function MealPlanScreen(): React.JSX.Element {
  useScreenFocus(Screen.MealPlan);
  const { colors } = useTheme();
  const week = useMemo(() => getWeekInfo(), []);

  return (
    <SafeAreaBox flex={1} edges={['top']}>
      <ScrollBox contentSpacing={{ px: 2.5, pt: 0.5, pb: 4 }}>
        <Row alignItems="center" justifyContent="space-between">
          <Heading.Regular>Meal Plan</Heading.Regular>
          <Box
            width={38}
            height={38}
            borderRadius={12}
            backgroundColor={colors.primary}
            alignItems="center"
            justifyContent="center"
          >
            <FontAwesome name="plus" size={16} color="#FFFFFF" />
          </Box>
        </Row>

        <Suspense fallback={
          <Box mt={4} alignItems="center">
            <ActivityIndicator size="small" />
          </Box>
        }>
          <MealPlanContent week={week} />
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
