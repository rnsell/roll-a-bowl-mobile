import { Component } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Box, Heading, Paragraph, Caption } from '@/design-system';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('[ErrorBoundary] Something went wrong:', error);
    console.error('[ErrorBoundary] Component stack:', info.componentStack);
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <SafeAreaView style={styles.safe}>
          <Box flex={1} alignItems="center" justifyContent="center" px={32}>
            <Heading.Large>Too many cooks</Heading.Large>
            <Box mt={8}>
              <Paragraph.Regular style={styles.centered}>
                Looks like something boiled over. We've burned the recipe on this one.
              </Paragraph.Regular>
            </Box>

            {this.state.error && (
              <Box mt={16}>
                <Caption.Small style={styles.centered}>
                  {this.state.error.message}
                </Caption.Small>
              </Box>
            )}

            <Box mt={32} width="100%">
              <Pressable onPress={this.handleRetry} style={styles.button}>
                <Paragraph.Regular color="#FFFFFF" style={styles.buttonText}>
                  Back to the kitchen
                </Paragraph.Regular>
              </Pressable>
            </Box>
          </Box>
        </SafeAreaView>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
  },
  centered: {
    textAlign: 'center',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F95DC',
  },
  buttonText: {
    fontWeight: '600',
  },
});
