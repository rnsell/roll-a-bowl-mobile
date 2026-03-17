import { SafeAreaView } from 'react-native-safe-area-context';
import type { Edge } from 'react-native-safe-area-context';
import type { BoxProps, SpacingProps } from './types';
import { resolveSpacingStyle } from './types';
import { SPACING_UNIT } from './theme';
import { useTheme } from './useTheme';

function pickSpacingProps(props: BoxProps): SpacingProps {
  return {
    p: props.p,
    px: props.px,
    py: props.py,
    pt: props.pt,
    pb: props.pb,
    pl: props.pl,
    pr: props.pr,
    m: props.m,
    mx: props.mx,
    my: props.my,
    mt: props.mt,
    mb: props.mb,
    ml: props.ml,
    mr: props.mr,
  };
}

export interface SafeAreaBoxProps extends BoxProps {
  edges?: Edge[];
}

export function SafeAreaBox({
  children,
  edges,
  backgroundColor,
  border,
  borderColor,
  borderRadius,
  borderTopWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderRightWidth,
  flex,
  flexGrow,
  flexShrink,
  alignItems,
  alignSelf,
  justifyContent,
  flexWrap,
  gap,
  overflow,
  width,
  height,
  style,
  ...spacingRest
}: SafeAreaBoxProps): React.JSX.Element {
  const { colors } = useTheme();
  const spacingStyle = resolveSpacingStyle(pickSpacingProps({ ...spacingRest, children }));

  return (
    <SafeAreaView
      edges={edges}
      style={[
        { flexDirection: 'column' as const, backgroundColor: backgroundColor ?? colors.background },
        spacingStyle,
        border !== undefined && { borderWidth: border },
        borderColor !== undefined && { borderColor },
        borderRadius !== undefined && { borderRadius },
        borderTopWidth !== undefined && { borderTopWidth },
        borderBottomWidth !== undefined && { borderBottomWidth },
        borderLeftWidth !== undefined && { borderLeftWidth },
        borderRightWidth !== undefined && { borderRightWidth },
        flex !== undefined && { flex },
        flexGrow !== undefined && { flexGrow },
        flexShrink !== undefined && { flexShrink },
        alignItems !== undefined && { alignItems },
        alignSelf !== undefined && { alignSelf },
        justifyContent !== undefined && { justifyContent },
        flexWrap !== undefined && { flexWrap },
        gap !== undefined && { gap: gap * SPACING_UNIT },
        overflow !== undefined && { overflow },
        width !== undefined && { width },
        height !== undefined && { height },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
