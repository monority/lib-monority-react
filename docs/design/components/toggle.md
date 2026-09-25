# Toggle
Statut : spec v4 — à valider
Source : prompt maître §7.2

## Rôle
Bascule binaire pressée / non pressée (mise en avant, favori). Plus petite qu'un Switch : état d'interface, pas de mise en marche de paramètre.

## Anatomie
Bouton `secondary` avec `aria-pressed` et rail d'accent inférieur en état pressé.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size | `--mr-control-size-lg` | 48px | 40px |
| sm/md/lg | padding-inline | `--mr-control-padding-inline-sm/md/lg` | 12 / 16 / 20px | 8 / 12 / 16px |
| sm/md/lg | font-size | `--mr-control-font-size-sm/md/lg` | 13 / 14 / 16px | 12 / 13 / 14px |
| toutes | font-weight | `--mr-font-weight-medium` | 500 | 500 |
| toutes | écart icône/texte | `--mr-control-gap` | 8px | 6px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | rail | `--mr-rail-width` | 2px | 2px |
| toutes | retrait du rail | `--mr-spacing-2` | 8px | 8px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| secondary | repos | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-default` | aucun rail |
| secondary | survol | `--mr-bg-hover` | `--mr-text-primary` | `--mr-border-default` | aucun rail |
| secondary | pression | `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | — |
| secondary | pressé (repos) | `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | rail inférieur 2px `--mr-accent`, retrait 8px de chaque côté, rendu par pseudo-élément |
| secondary | pressé + survol | `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | rail inférieur `--mr-accent` |
| secondary | focus | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-default` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| secondary | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | rail absent, `cursor: not-allowed` |
| secondary | chargement | `--mr-bg-raised` | libellé en `opacity: 0` | `--mr-border-default` | spinner `currentColor`, `aria-busy` |

## Comportement et clavier
- Clic ou `Espace`/`Enter` bascule `aria-pressed` ; `onPressedChange(pressed)` émis.
- Rail : apparition en `--mr-duration-base` / `--mr-ease-standard` (transition `background-color`, `border-color`, `color`, `opacity` du pseudo-élément).
- Survol uniquement avec `@media (hover: hover) and (pointer: fine)` ; aucune transformation.
- `data-mr-preview="hover | active | focus"` force les états en documentation/tests (section 6).

## Accessibilité
- `<button type="button">` avec `aria-pressed="true" | "false"` (jamais absent).
- Focus `:focus-visible`, anneau `--mr-focus-color`.
- Cible ≥ `--mr-min-target` (24px) : 32/40/48px conformes.
- La couleur n'est jamais seule : l'état est exposé par `aria-pressed`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `pressed` | `boolean` | — | contrôlé (P5) |
| `defaultPressed` | `boolean` | `false` | non contrôlé (P5) |
| `onPressedChange` | `(pressed: boolean) => void` | — | futur événement `pressed-change` (P6) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'secondary'` | forme héritée de Button (7.1) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `disabled` | `boolean` | `false` | désactivé |
| `name` | `string` | — | participation formulaire natif (P4) |
| `value` | `string` | — | valeur dans le formulaire |
| `className` | `string` | — | fusion (P9) |
| `children` | `ReactNode` | — | libellé |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| pressé : fond `bg-active` seul | pressé : fond `bg-active` + rail inférieur 2px `--mr-accent` (signature, section 4) | non (ajout) | — |
| variantes héritées BEM (`.mr-btn--*`) | `[data-variant]`, `[data-size]` (section 6) | non | interne |
| `transition` ancienne (`--mr-dur-150`, `--mr-ease-in-out`, opacité) | `--mr-duration-base` / `--mr-ease-standard`, aucune opacité d'état (5.11, section 6) | non | 5.16 (approx) / tokens sans équivalent |
| recette Toggle : 1 valeur en dur signalée par l'audit (inventory §2.1) | token de l'échelle (T2, phase 2/3) | non | inventory §2.1 |

## Critères de vérification
1. Toggle md : `block-size` = 40px (compact 32px) ; sm 32px ; lg 48px.
2. `border-radius` = 6px ; `border-width` = 1px ; rail `--mr-rail-width` = 2px.
3. repos : `background-color` = `--mr-bg-raised` (`#ffffff` light), `border-color` = `--mr-border-default`.
4. pressé : `background-color` = `--mr-bg-active` (`#e1e8e9` light) ; pseudo-élément inférieur `background-color` = `--mr-accent` (`#07787d` light), `height` 2px, retrait horizontal 8px.
5. survol (non pressé) : `background-color` = `--mr-bg-hover` (`#e8eef0` light).
6. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)`.
7. désactivé : `color` = `--mr-text-disabled`, `background-color` = `--mr-bg-hover`, `cursor` = `not-allowed`, `opacity` 1, `aria-disabled="true"`.
8. clavier : `Espace` bascule `aria-pressed` de `false` à `true` et émet `onPressedChange(true)`.
9. transition : `--mr-duration-base` (180ms) / `--mr-ease-standard`.

## Interdits
- Jamais d'opacité pour le désactivé ; jamais `transition: all` ; jamais de transformation au clic.
- Jamais de rail sur un état non sélectionné ; jamais d'aplat d'accent en fond (rail uniquement, section 4).
- Pas de `role="switch"` (c'est un `Toggle` pressé, pas un Switch) ; pas de `as` (P3).
