import { Accordion } from '@monority/ui'

export function AccordionBasicExample() {
  return (
    <>
      <Accordion>Example</Accordion>
    </>
  )
}

export function AccordionWithItemsExample() {
  return (
    <Accordion
      items={[
        { value: 'a', title: 'What is Monority?', content: <p>Monority is a design system for building consistent interfaces.</p> },
        { value: 'b', title: 'How do I get started?', content: <p>Install the package and import components as needed.</p> },
        { value: 'c', title: 'Is it accessible?', content: <p>Yes, all components follow WAI-ARIA best practices.</p> },
      ]}
    />
  )
}

export function AccordionMultipleExample() {
  return (
    <Accordion
      allowMultiple
      defaultValue={['a']}
      items={[
        { value: 'a', title: 'Section A', content: <p>Content for section A.</p> },
        { value: 'b', title: 'Section B', content: <p>Content for section B.</p> },
        { value: 'c', title: 'Section C', content: <p>Content for section C.</p> },
      ]}
    />
  )
}

export function AccordionCollapsibleExample() {
  return (
    <Accordion
      collapsible
      items={[
        { value: 'a', title: 'Collapsible section', content: <p>This section can be closed.</p> },
        { value: 'b', title: 'Another section', content: <p>More content here.</p> },
      ]}
    />
  )
}
