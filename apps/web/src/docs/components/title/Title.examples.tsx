import { Title } from "@monority/ui"
import { Text } from "@monority/ui"

export function TitleBasicExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Title as="h1" size="display">The Art of Typography</Title>
      <Title as="h2" size="lg">A Brief History of Type</Title>
      <Text as="p" tone="base" size="md">
        Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed. The arrangement of type involves selecting typefaces, point sizes, line lengths, line-spacing (leading), and letter-spacing (tracking), as well as adjusting the space within letters pairs (kerning).
      </Text>
      <Title as="h3" size="md">The Printing Revolution</Title>
      <Text as="p" tone="muted" size="sm">
        Johannes Gutenberg invented movable type printing in the 15th century, revolutionizing the spread of information across Europe. This innovation made books available to a wider audience and laid the foundation for modern mass communication.
      </Text>
    </div>
  )
}

export function TitleSizesExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Title as="h1" size="display">Display -- Page Title</Title>
      <Title as="h2" size="lg">Large -- Section Header</Title>
      <Title as="h3" size="md">Medium -- Subsection</Title>
      <Title as="h4" size="sm">Small -- Card Title</Title>
    </div>
  )
}

export function TitleLevelsExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Title as="h1">H1 -- Document Title</Title>
      <Title as="h2">H2 -- Chapter Title</Title>
      <Title as="h3">H3 -- Section Title</Title>
      <Title as="h4">H4 -- Subsection Title</Title>
      <Title as="h5">H5 -- Sub-subsection Title</Title>
      <Title as="h6">H6 -- Detail Title</Title>
    </div>
  )
}
