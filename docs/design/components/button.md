# Button
Statut : spec v4 — à valider
Source : prompt maître §7.1

## Rôle
Déclenche une action immédiate. Choisir `ButtonLink` si l'action navigue, `IconButton` si le libellé est une icône seule, `CopyButton` si l'action copie une valeur.

## Anatomie
`[iconLeading] libellé [iconTrailing]` — spinner superposé centré à la taille de l'icône en chargement.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size | `--mr-control-size-lg` | 48px | 40px |
| sm | padding-inline | `--mr-control-padding-inline-sm` | 12px | 8px |
| md | padding-inline | `--mr-control-padding-inline-md` | 16px | 12px |
| lg | padding-inline | `--mr-control-padding-inline-lg` | 20px | 16px |
| sm | font-size / line-height | `--mr-control-font-size-sm` | 13px / 20px | 12px / 20px |
| md | font-size / line-height | `--mr-control-font-size-md` | 14px / 20px | 13px / 20px |
| lg | font-size / line-height | `--mr-control-font-size-lg` | 16px / 24px | 14px / 24px |
| toutes | font-weight | `--mr-font-weight-medium` | 500 | 500 |
| sm/md | icône | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | icône | `--mr-icon-size-lg` | 20px | 20px |
| toutes | écart icône/texte | `--mr-control-gap` | 8px | 6px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

Block-size fixe, pas déduite du padding. Libellé sur une seule ligne. `fullWidth` : largeur 100 %.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| primary | repos | `--mr-accent` | `--mr-on-accent` | transparent | — |
| primary | survol | `--mr-accent-hover` | `--mr-on-accent` | transparent | — |
| primary | pression | `--mr-accent-active` | `--mr-on-accent` | transparent | — |
| primary | focus | repos | `--mr-on-accent` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, `outline-offset: var(--mr-focus-offset)` |
| primary | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed`, aucun survol |
| primary | chargement | `--mr-accent` | libellé + icônes en `opacity: 0` (arbre d'accessibilité conservé) | transparent | spinner centré `currentColor`, `aria-busy="true"` |
| secondary | repos | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-default` | — |
| secondary | survol | `--mr-bg-hover` | `--mr-text-primary` | `--mr-border-default` | — |
| secondary | pression | `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | — |
| secondary | focus | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-default` | anneau de focus (5.8) |
| secondary | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed` |
| secondary | chargement | `--mr-bg-raised` | `opacity: 0` | `--mr-border-default` | spinner |
| ghost | repos | transparent | `--mr-text-secondary` | transparent | — |
| ghost | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | — |
| ghost | pression | `--mr-bg-active` | `--mr-text-primary` | transparent | — |
| ghost | focus | transparent | `--mr-text-secondary` | transparent | anneau de focus (5.8) |
| ghost | désactivé | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed` |
| ghost | chargement | transparent | `opacity: 0` | transparent | spinner |
| danger | repos | `--mr-danger-solid` | `--mr-on-danger-solid` | transparent | — |
| danger | survol | `--mr-danger-solid-hover` | `--mr-on-danger-solid` | transparent | — |
| danger | pression | `--mr-danger-solid-hover` | `--mr-on-danger-solid` | transparent | — |
| danger | focus | `--mr-danger-solid` | `--mr-on-danger-solid` | transparent | anneau de focus (5.8) |
| danger | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed` |
| danger | chargement | `--mr-danger-solid` | `opacity: 0` | transparent | spinner |

## Comportement et clavier
- Survol uniquement dans `@media (hover: hover) and (pointer: fine)` (section 6).
- Transitions : `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Aucune transformation au clic, aucune animation de dimension.
- Chargement : interactions bloquées (`aria-disabled="true"`, clics ignorés), largeur identique au repos, `aria-busy="true"`.
- Clavier : activation native (`Enter`, `Espace`) via `<button>` ; `type` défaut `button` (pas de soumission par défaut dans un formulaire).
- Focus : `:focus-visible` uniquement (section 5.8).

## Accessibilité
- Élément natif `<button>` ; `aria-disabled="true"` + `aria-busy="true"` en chargement.
- Focus : `outline: var(--mr-focus-width) solid var(--mr-focus-color)` ; `outline-offset: var(--mr-focus-offset)` ; dans une liste, offset `-2px`.
- Cible interactive ≥ `--mr-min-target` (24px) : sm 32px, md 40px, lg 48px conformes.
- Icônes décoratives `aria-hidden="true"` ; libellé requis (jamais bouton vide).
- Contraste : texte sur accent ≥ 4.5:1 (5.5 vérifié en phase 2).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'secondary'` | forme et emphase |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `loading` | `boolean` | `false` | état de chargement (section états) |
| `disabled` | `boolean` | `false` | désactivé |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | type natif |
| `fullWidth` | `boolean` | `false` | largeur 100 % |
| `iconLeading` | `ReactNode` | — | icône de début |
| `iconTrailing` | `ReactNode` | — | icône de fin |
| `className` | `string` | — | fusion de classe (P9) |
| `children` | `ReactNode` | — | libellé |

Callbacks : aucun callback maison — `onClick` est l'événement natif `click` (P6 : `onChange` réservé au natif). Prochain événement DOM : `click` → `click`.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `as?: ElementType` (Button.types.ts:7) | retiré → `ButtonLink` (7.19) | oui | ligne Button |
| `copyValue?: string` (Button.types.ts:19) | retiré → `CopyButton` | oui | ligne Button |
| `iconOnly?: boolean` (Button.types.ts:24) | retiré → `IconButton` | oui | ligne Button |
| variantes `muted`, `subtle`, `warning` | `secondary`, `ghost`, `secondary` | oui | ligne Button |
| défaut `variant="primary"` | défaut `secondary` | oui | ligne Button |
| classes `.mr-btn--primary` / `.mr-btn--sm` (BEM) | `[data-variant]`, `[data-size]` + classe `.mr-btn` seule (section 6) | non | interne, convention |
| `opacity: var(--mr-opacity-disabled, 0.5)` au désactivé (button.recipe.css:39) | couleurs `text-disabled` / `bg-hover` / `border-subtle`, jamais d'opacité (section 6) | non (visuel) | conventions : opacité interdite |
| `gap: var(--mr-space-2)` | `--mr-control-gap` (7.1) | non | tokens sans équivalent |
| `font-size: var(--mr-text-sm)` | `--mr-control-font-size-*` (7.1) | non | tokens sans équivalent |
| `border-radius: var(--mr-btn-radius)` | `--mr-radius-control` | non | mappé exact (5.16) |
| `transition: … var(--mr-dur-150) var(--mr-ease-in-out)` + propriété `opacity` | `--mr-duration-fast` / `--mr-ease-standard`, propriétés `background-color`, `border-color`, `color` | non | tokens sans équivalent / approx (5.16) |
| `outline: none` en base, focus via `--mr-accent` | focus `--mr-focus-color` sur `:focus-visible` (5.8) | non (visuel) | — |

## Critères de vérification
1. Button md comfortable : `block-size` = 40px (compact : 32px).
2. Button sm comfortable : `block-size` = 32px ; lg : 48px.
3. Button md : `padding-inline` = 16px (compact : 12px).
4. Toutes tailles : `border-radius` = 6px ; `border-width` = 1px.
5. primary repos (light) : `background-color` = valeur de `--mr-accent` (indicatif light `#07787d`), `color` = `--mr-on-accent` (`#ffffff`), `border-color` transparent.
6. primary survol : `background-color` = `--mr-accent-hover` (`#08686c`) ; pression : `--mr-accent-active` (`#005c60`).
7. secondary repos : `background-color` = `--mr-bg-raised` (`#ffffff`), `border-color` = `--mr-border-default` (`#ccd4d7`).
8. ghost survol : `background-color` = `--mr-bg-hover` (`#e8eef0`), `color` = `--mr-text-primary` (`#131c1f`).
9. désactivé : `color` = `--mr-text-disabled` (`#80888a`), `background-color` = `--mr-bg-hover`, `border-color` = `--mr-border-subtle`, `cursor` = `not-allowed`, `opacity` = 1.
10. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` (light `#068187`), `outline-offset` = `--mr-focus-offset`.
11. chargement : `aria-busy="true"`, `block-size` identique au repos, largeur identique au repos.
12. transition : propriétés = `background-color`, `border-color`, `color` ; durée = `--mr-duration-fast` (120ms), courbe = `--mr-ease-standard`.

## Interdits
- Ni prop `as`, ni `copyValue`, ni `iconOnly`, ni variantes `muted` / `subtle` / `warning`.
- Jamais d'opacité pour l'état désactivé.
- Jamais `transition: all`, jamais d'animation de dimension ou de position, jamais de `box-shadow` pour le focus.
- Pas de rebond, pas d'échelle au clic.
- Jamais d'aplat d'accent en fond de grande surface ; un seul `primary` visible par zone.
- Jamais de `outline: none` sans remplacement.
