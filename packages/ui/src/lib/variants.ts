import { cn } from './cn'

type Variants = Record<string, Record<string, string>>

type Props<T extends Variants> = {
  [K in keyof T]?: keyof T[K] | null | undefined
}

type CompoundVariant<T extends Variants> = {
  [K in keyof T]?: keyof T[K]
} & { className: string }

function cva<T extends Variants>(schema: {
  base?: string
  variants: T
  defaultVariants?: Partial<Props<T>>
  compoundVariants?: CompoundVariant<T>[]
}) {
  return (props?: Props<T>): string => {
    const resolved = { ...schema.defaultVariants, ...props } as Record<string, string | undefined>
    const classes: string[] = schema.base ? [schema.base] : []

    if (schema.variants) {
      for (const key of Object.keys(schema.variants)) {
        const value = resolved[key]
        const map = schema.variants[key]
        if (value && map[value]) {
          classes.push(map[value])
        }
      }
    }

    if (schema.compoundVariants) {
      for (const compound of schema.compoundVariants) {
        const { className, ...matches } = compound
        const match = Object.entries(matches).every(
          ([key, val]) => resolved[key] === val
        )
        if (match) classes.push(className)
      }
    }

    return cn(...classes)
  }
}

export { cva }
