import { Text } from "@monority/ui"

const lorem = "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs."

export function TextBasicExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <Text as="p" size="sm" tone="muted">
        In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content.
      </Text>
      <Text as="p" size="md" tone="base">
        The standard Lorem ipsum passage, used since the 1500s, is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
      </Text>
      <Text as="p" size="lg" tone="strong">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words.
      </Text>
    </div>
  )
}

export function TextSizesExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Text size="sm">{lorem}</Text>
      <Text size="md">{lorem}</Text>
      <Text size="lg">{lorem}</Text>
    </div>
  )
}

export function TextTonesExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <Text tone="muted">{lorem}</Text>
      <Text tone="base">{lorem}</Text>
      <Text tone="strong">{lorem}</Text>
    </div>
  )
}

export function TextAsExample() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
      <Text as="p" tone="muted">Rendered as &lt;p&gt; -- paragraph block element.</Text>
      <Text as="span" tone="base">Rendered as &lt;span&gt; -- inline element.</Text>
      <Text as="div" tone="strong">Rendered as &lt;div&gt; -- block element.</Text>
    </div>
  )
}
