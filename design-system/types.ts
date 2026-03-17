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
  flexGrow?: number;
  flexShrink?: number;
  alignItems?: FlexAlignType;
  alignSelf?: 'auto' | FlexAlignType;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  gap?: number;
  overflow?: 'visible' | 'hidden' | 'scroll';
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

import { SPACING_UNIT } from './theme';

function toPixels(units: number): number {
  return units * SPACING_UNIT;
}

/**
 * Converts shorthand spacing props into a React Native style object.
 * Values are in spacing units (1 unit = 8px).
 * Precedence: specific (pt, pb, pl, pr) > axis (px, py) > general (p).
 * Same for margin.
 */
export function resolveSpacingStyle(props: SpacingProps): ViewStyle {
  const style: ViewStyle = {};

  // Padding: general → axis → specific
  if (props.p !== undefined) {
    style.paddingTop = toPixels(props.p);
    style.paddingBottom = toPixels(props.p);
    style.paddingLeft = toPixels(props.p);
    style.paddingRight = toPixels(props.p);
  }
  if (props.px !== undefined) {
    style.paddingLeft = toPixels(props.px);
    style.paddingRight = toPixels(props.px);
  }
  if (props.py !== undefined) {
    style.paddingTop = toPixels(props.py);
    style.paddingBottom = toPixels(props.py);
  }
  if (props.pt !== undefined) style.paddingTop = toPixels(props.pt);
  if (props.pb !== undefined) style.paddingBottom = toPixels(props.pb);
  if (props.pl !== undefined) style.paddingLeft = toPixels(props.pl);
  if (props.pr !== undefined) style.paddingRight = toPixels(props.pr);

  // Margin: general → axis → specific
  if (props.m !== undefined) {
    style.marginTop = toPixels(props.m);
    style.marginBottom = toPixels(props.m);
    style.marginLeft = toPixels(props.m);
    style.marginRight = toPixels(props.m);
  }
  if (props.mx !== undefined) {
    style.marginLeft = toPixels(props.mx);
    style.marginRight = toPixels(props.mx);
  }
  if (props.my !== undefined) {
    style.marginTop = toPixels(props.my);
    style.marginBottom = toPixels(props.my);
  }
  if (props.mt !== undefined) style.marginTop = toPixels(props.mt);
  if (props.mb !== undefined) style.marginBottom = toPixels(props.mb);
  if (props.ml !== undefined) style.marginLeft = toPixels(props.ml);
  if (props.mr !== undefined) style.marginRight = toPixels(props.mr);

  return style;
}
