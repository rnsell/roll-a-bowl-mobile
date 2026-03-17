import { useCallback } from 'react';
import { useFocusEffect } from 'expo-router';

import { EventEmitter } from './events';
import { Screen } from './screens';
import { createLogger } from './logger';

type NavigationEvents = {
  screenView: { screen: Screen };
};

export const navigationEvents = new EventEmitter<NavigationEvents>();

// Logging subscriber
const logger = createLogger('Navigation');
navigationEvents.on('screenView', ({ screen }) => {
  logger.info('Screen viewed:', screen);
});

export function useScreenFocus(screen: Screen): void {
  useFocusEffect(
    useCallback(() => {
      navigationEvents.emit('screenView', { screen });
    }, [screen]),
  );
}
