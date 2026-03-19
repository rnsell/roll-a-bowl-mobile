import FontAwesome from '@expo/vector-icons/FontAwesome';

import { useTheme } from './useTheme';

type IconName =
  | 'book'
  | 'calendar'
  | 'check'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevron-up'
  | 'cog'
  | 'link'
  | 'pencil'
  | 'plus'
  | 'search'
  | 'shopping-cart'
  | 'times'
  | 'users';

type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const sizeMap: Record<IconSize, number> = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 28,
};

export type { IconName, IconSize };

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
  style?: { marginBottom?: number };
}

export function Icon({ name, size = 'md', color, style }: IconProps): React.JSX.Element {
  const { colors } = useTheme();

  return (
    <FontAwesome
      name={name}
      size={sizeMap[size]}
      color={color ?? colors.text}
      style={style}
    />
  );
}
