import { Avatar, Button, ContentRow, Label, useTheme } from '@/design-system';
import type { FamilyMember } from '@/store/family-group';

interface MemberRowProps {
  member: FamilyMember;
  showRemove?: boolean;
  onRemove?: () => void;
}

export function MemberRow({ member, showRemove, onRemove }: MemberRowProps): React.JSX.Element {
  const { colors } = useTheme();
  const initial = member.firstName.charAt(0).toUpperCase();
  const fullName = `${member.firstName} ${member.lastName}`;
  const isOwner = member.role === 'OWNER';

  return (
    <ContentRow
      label={fullName}
      subtitle={member.email}
      showChevron={false}
      left={
        <Avatar
          initial={initial}
          color={isOwner ? colors.primary : colors.border}
          foregroundColor={isOwner ? undefined : colors.text}
        />
      }
      right={
        showRemove ? (
          <Button
            label="Remove"
            variant="ghost"
            color={colors.error}
            onPress={onRemove}
          />
        ) : isOwner ? (
          <Label.Small color={colors.secondary}>Owner</Label.Small>
        ) : undefined
      }
    />
  );
}
