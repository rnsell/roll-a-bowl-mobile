import type { ReactNode } from 'react';
import type {
  DimensionValue,
  FlexAlignType,
  TextStyle,
  ViewStyle,
} from 'react-native';

// ── Spacing Props ───────────────────────────────────────────────────

export interface SpacingProps {
  p?: number;
  px?: number;
  py?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  m?: number;
  mx?: number;
  my?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
}

// ── Border Props ────────────────────────────────────────────────────

export interface BorderProps {
  border?: number;
  borderColor?: string;
  borderRadius?: number;
  borderTopWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
  borderRightWidth?: number;
}

// ── Layout Props ────────────────────────────────────────────────────

export interface LayoutProps {
  flex?: number;
  alignItems?: FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: number;
  width?: DimensionValue;
  height?: DimensionValue;
}

// ── Box Props ───────────────────────────────────────────────────────

export interface BoxProps extends SpacingProps, BorderProps, LayoutProps {
  children?: ReactNode;
  backgroundColor?: string;
  style?: ViewStyle;
}

// ── Text Family Props ───────────────────────────────────────────────

export interface TextFamilyProps {
  children?: ReactNode;
  color?: string;
  textAlign?: 'auto' | 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
}

// ── Spacing Resolution ──────────────────────────────────────────────

/**
 * Converts shorthand spacing props into a React Native style object.
 * Precedence: specific (pt, pb, pl, pr) > axis (px, py) > general (p).
 * Same for margin.
 */
export function resolveSpacingStyle(props: SpacingProps): ViewStyle {
  const style: ViewStyle = {};

  // Padding: general → axis → specific
  if (props.p !== undefined) {
    style.paddingTop = props.p;
    style.paddingBottom = props.p;
    style.paddingLeft = props.p;
    style.paddingRight = props.p;
  }
  if (props.px !== undefined) {
    style.paddingLeft = props.px;
    style.paddingRight = props.px;
  }
  if (props.py !== undefined) {
    style.paddingTop = props.py;
    style.paddingBottom = props.py;
  }
  if (props.pt !== undefined) style.paddingTop = props.pt;
  if (props.pb !== undefined) style.paddingBottom = props.pb;
  if (props.pl !== undefined) style.paddingLeft = props.pl;
  if (props.pr !== undefined) style.paddingRight = props.pr;

  // Margin: general → axis → specific
  if (props.m !== undefined) {
    style.marginTop = props.m;
    style.marginBottom = props.m;
    style.marginLeft = props.m;
    style.marginRight = props.m;
  }
  if (props.mx !== undefined) {
    style.marginLeft = props.mx;
    style.marginRight = props.mx;
  }
  if (props.my !== undefined) {
    style.marginTop = props.my;
    style.marginBottom = props.my;
  }
  if (props.mt !== undefined) style.marginTop = props.mt;
  if (props.mb !== undefined) style.marginBottom = props.mb;
  if (props.ml !== undefined) style.marginLeft = props.ml;
  if (props.mr !== undefined) style.marginRight = props.mr;

  return style;
}
