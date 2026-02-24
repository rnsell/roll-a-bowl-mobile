import { View } from 'react-native';
import type { BoxProps, SpacingProps } from './types';
import { resolveSpacingStyle } from './types';

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

export function Row({
  children,
  backgroundColor,
  border,
  borderColor,
  borderRadius,
  borderTopWidth,
  borderBottomWidth,
  borderLeftWidth,
  borderRightWidth,
  flex,
  alignItems,
  justifyContent,
  flexWrap,
  gap,
  width,
  height,
  style,
  ...spacingRest
}: BoxProps): React.JSX.Element {
  const spacingStyle = resolveSpacingStyle(pickSpacingProps({ ...spacingRest, children }));

  return (
    <View
      style={[
        { flexDirection: 'row' as const, flexWrap: 'nowrap' as const },
        spacingStyle,
        backgroundColor !== undefined && { backgroundColor },
        border !== undefined && { borderWidth: border },
        borderColor !== undefined && { borderColor },
        borderRadius !== undefined && { borderRadius },
        borderTopWidth !== undefined && { borderTopWidth },
        borderBottomWidth !== undefined && { borderBottomWidth },
        borderLeftWidth !== undefined && { borderLeftWidth },
        borderRightWidth !== undefined && { borderRightWidth },
        flex !== undefined && { flex },
        alignItems !== undefined && { alignItems },
        justifyContent !== undefined && { justifyContent },
        flexWrap !== undefined && { flexWrap },
        gap !== undefined && { gap },
        width !== undefined && { width },
        height !== undefined && { height },
        style,
      ]}
    >
      {children}
    </View>
  );
}
