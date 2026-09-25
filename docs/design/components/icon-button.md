# IconButton
Statut : spec v4 — à valider
Source : prompt maître §7.1

## Rôle
Action repérée par une icône seule (fermer, menu, suppression). Choisir `Button` si un libellé texte existe, `CopyButton` si l'action copie.

## Anatomie
Icône unique centrée, spinner superposé en chargement. Largeur = hauteur (carré). `label` obligatoire.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size et inline-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size et inline-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size et inline-size | `--mr-control-size-lg` | 48px | 40px |
| sm/md | icône | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | icône | `--mr-icon-size-lg` | 20px | 20px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |
| toutes | trait d'icône | `--mr-icon-stroke` | 1.5px | 1.5px |

## États
Mêmes variantes et mêmes états que Button (7.1) :

| Variante | État | Fond | Texte (glyphes) | Bordure | Autre |
|---|---|---|---|---|---|
| primary | repos / survol / pression | `--mr-accent` / `--mr-accent-hover` / `--mr-accent-active` | `--mr-on-accent` | transparent | — |
| secondary | repos / survol / pression | `--mr-bg-raised` / `--mr-bg-hover` / `--mr-bg-active` | `--mr-text-primary` | `--mr-border-default` | — |
| ghost | repos / survol / pression | transparent / `--mr-bg-hover` / `--mr-bg-active` | `--mr-text-secondary` puis `--mr-text-primary` | transparent | — |
| danger | repos / survol / pression | `--mr-danger-solid` / `--mr-danger-solid-hover` / `--mr-danger-solid-hover` | `--mr-on-danger-solid` | transparent | — |
| toutes | focus | état de repos | texte de repos | bordure de repos | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| toutes | désactivé | `--mr-bg-hover` (ghost : transparent) | `--mr-text-disabled` | `--mr-border-subtle` (ghost : transparent) | `cursor: not-allowed`, aucun survol |
| toutes | chargement | fond de la variante | icône en `opacity: 0` | bordure de la variante | spinner `currentColor`, `aria-busy="true"` |

Survol uniquement avec `@media (hover: hover) and (pointer: fine)`.

## Comportement et clavier
- Transitions `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Aucune transformation au clic ; chargement : clics ignorés, géométrie inchangée.
- Clavier : `<button>` natif, `Enter` / `Espace`, `type` défaut `button`.
- Dans une liste (menu, cellule), focus `outline-offset: -2px`.

## Accessibilité
- `label` obligatoire exposé en `aria-label` (aucun bouton sans nom accessible).
- `<button>` natif ; `aria-disabled` + `aria-busy` selon les états.
- Focus `:focus-visible`, anneau `--mr-focus-color`.
- Cible ≥ `--mr-min-target` (24px) : 32/40/48px conformes.
- Icône portée `aria-hidden="true"`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `string` | requis | nom accessible |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'ghost'` | forme et emphase |
| `tone` | `'neutral' \| 'accent' \| 'danger'` | `'neutral'` | alias déprécié de `variant` (neutral → ghost, accent → primary, danger → danger), avertissement en développement (G2) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `loading` | `boolean` | `false` | chargement |
| `disabled` | `boolean` | `false` | désactivé |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | type natif |
| `children` | `ReactNode` | requis | icône |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onClick` natif (`click`).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` (IconButton.types.ts:10) | conservée en alias déprécié de `variant` : `neutral` → `ghost`, `accent` → `primary`, `danger` → `danger` (table existante `toneVariantMap`, IconButton.tsx:4), avertissement en développement | oui | ligne IconButton |
| prop `iconOnly` sur Button | usage exclusif d'IconButton (7.19) | oui | ligne Button |
| recette partagée avec Button (BEM) | sélecteurs `data-*` + `.mr-icon-button` (section 6) | non | interne |

## Critères de vérification
1. IconButton md : `block-size` = `inline-size` = 40px (compact : 32px).
2. IconButton sm : 32px ; lg : 48px ; carré strict (rapport largeur/hauteur = 1).
3. `border-radius` = 6px ; `border-width` = 1px.
4. icône md : `width`/`height` = 16px ; lg : 20px ; trait = `--mr-icon-stroke` (1.5px).
5. ghost repos : fond transparent, `color` = `--mr-text-secondary` (`#4a5558` light) ; survol : fond `--mr-bg-hover` (`#e8eef0`), `color` `--mr-text-primary`.
6. primary repos : fond `--mr-accent` (`#07787d` light), glyphes `--mr-on-accent` (`#ffffff`).
7. désactivé : `color` `--mr-text-disabled` (`#80888a`), `cursor` `not-allowed`, `opacity` 1.
8. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
9. nom accessible : `aria-label` = valeur de `label` sur l'élément racine.
10. alias `tone` : `tone="accent"` rend les mêmes couleurs calculées que `variant="primary"`, `tone="neutral"` = `variant="ghost"`, `tone="danger"` = `variant="danger"`.
10. chargement : `aria-busy="true"`, dimensions identiques au repos.

## Interdits
- Jamais d'icône sans `label` (nom accessible obligatoire).
- Jamais d'opacité au désactivé, jamais `transition: all`, jamais de `box-shadow` de focus.
- Ni `as`, ni `copyValue` (usages `ButtonLink` / `CopyButton`).
- Pas de survol sur écran tactile (`@media (hover: hover)`).
