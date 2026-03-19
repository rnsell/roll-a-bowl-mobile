import React, { useMemo } from 'react';
import { Platform } from 'react-native';
import Markdown from 'react-native-markdown-display';

import Heading from './Heading';
import Paragraph from './Paragraph';
import Label from './Label';
import Caption from './Caption';
import { Box } from './Box';
import { Row } from './Row';
import { useTheme } from './useTheme';

export interface MarkdownContentProps {
  children: string;
}

export function MarkdownContent({ children }: MarkdownContentProps): React.JSX.Element {
  const { colors } = useTheme();

  const rules = useMemo(
    () => ({
      body: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key}>{childElements}</Box>
      ),

      heading1: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={2} mb={1}>
          <Heading.Regular>{childElements}</Heading.Regular>
        </Box>
      ),

      heading2: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={2} mb={1}>
          <Heading.Small>{childElements}</Heading.Small>
        </Box>
      ),

      heading3: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={1.5} mb={0.5}>
          <Label.Large>{childElements}</Label.Large>
        </Box>
      ),

      paragraph: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={0.5} mb={0.5}>
          <Paragraph.Small>{childElements}</Paragraph.Small>
        </Box>
      ),

      strong: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Label.Small key={node.key}>{childElements}</Label.Small>
      ),

      em: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Paragraph.Small key={node.key} style={{ fontStyle: 'italic' }}>
          {childElements}
        </Paragraph.Small>
      ),

      bullet_list: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={0.5} mb={0.5}>
          {childElements}
        </Box>
      ),

      ordered_list: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box key={node.key} mt={0.5} mb={0.5}>
          {childElements}
        </Box>
      ),

      list_item: (
        node: { key: string; index: number },
        childElements: React.ReactNode,
        parent: Array<{ type: string; attributes?: { start?: number } }>,
      ) => {
        const isOrdered = parent.some((p) => p.type === 'ordered_list');

        let marker: string;
        if (isOrdered) {
          const orderedParent = parent.find((p) => p.type === 'ordered_list');
          const start = orderedParent?.attributes?.start ?? 1;
          marker = `${start + node.index}.`;
        } else {
          marker = Platform.select({ ios: '\u00B7', default: '\u2022' });
        }

        return (
          <Row
            key={node.key}
            mt={isOrdered ? 1 : 0.25}
            mb={isOrdered ? 1 : 0.25}
          >
            <Box width={isOrdered ? 24 : 16}>
              <Caption.Regular color={colors.secondary}>{marker}</Caption.Regular>
            </Box>
            <Box flex={1}>{childElements}</Box>
          </Row>
        );
      },

      blockquote: (
        node: { key: string },
        childElements: React.ReactNode,
      ) => (
        <Box
          key={node.key}
          borderLeftWidth={3}
          borderColor={colors.primary}
          pl={1.5}
          mt={0.5}
          mb={0.5}
        >
          {childElements}
        </Box>
      ),

      hr: (node: { key: string }) => (
        <Box
          key={node.key}
          borderBottomWidth={1}
          borderColor={colors.border}
          mt={1.5}
          mb={1.5}
        />
      ),
    }),
    [colors],
  );

  return <Markdown rules={rules}>{children}</Markdown>;
}
