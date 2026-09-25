# ToggleGroup
Statut : spec v4 — à valider
Source : prompt maître §7.2

## Rôle
Groupe de Toggle. En mode `single`, sert de segmented control (choix exclusif dans une barre d'options) ; en mode `multiple`, ensemble de bascules indépendantes.

## Anatomie
Conteneur (segmented) contenant les segments. Mode `single` : `role="radiogroup"`, segments `role="radio"` ; mode `multiple` : `role="group"` de Toggle.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size conteneur | `--mr-control-size-sm` | 32px | 28px |
| md | block-size conteneur | `--mr-control-size-md` | 40px | 32px |
| lg | block-size conteneur | `--mr-control-size-lg` | 48px | 40px |
| toutes | block-size segment | conteneur − 4px | 28 / 36 / 44px | 24 / 32 / 36px |
| sm | padding-inline segment | `--mr-spacing-2` | 8px | 8px |
| md | padding-inline segment | `--mr-spacing-3` | 12px | 12px |
| lg | padding-inline segment | `--mr-spacing-4` | 16px | 16px |
| toutes | padding conteneur | `--mr-spacing-0-5` | 2px | 2px |
| toutes | border-radius conteneur | `--mr-radius-control` | 6px | 6px |
| toutes | border-radius segment | `--mr-radius-inline` | 4px | 4px |
| toutes | police segment | `--mr-type-small-strong` | 13/20, 500, sans | 13/20, 500, sans |
| toutes | rail | `--mr-rail-width` | 2px | 2px |
| toutes | retrait rail segment | `--mr-spacing-2` | 8px | 8px |

Segment minimal : 24px de large en sm. Segment = conteneur − 4px (2px de padding de chaque côté).

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| conteneur | repos | `--mr-bg-sunken` | — | `--mr-border-subtle` | aucun rail |
| segment | inactif repos | transparent | `--mr-text-secondary` | transparent | aucun rail |
| segment | inactif survol | transparent | `--mr-text-primary` | transparent | aucun rail |
| segment | actif repos | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-subtle` | rail inférieur 2px `--mr-accent`, retrait 8px |
| segment | actif survol | `--mr-bg-raised` | `--mr-text-primary` | `--mr-border-subtle` | rail inférieur `--mr-accent` |
| segment | pression | `--mr-bg-active` (inactif) | `--mr-text-primary` | — | — |
| segment | focus | état de repos | texte de repos | bordure de repos | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, `outline-offset: -2px` (liste) |
| segment | désactivé | transparent | `--mr-text-disabled` | transparent | rail absent, `cursor: not-allowed` |

## Comportement et clavier
- Mode `single` : `role="radiogroup"` + segments `role="radio"`, navigation aux flèches (déplacement du focus + sélection), `aria-checked`.
- Mode `multiple` : `role="group"` ; chaque segment est un Toggle `aria-pressed`.
- Rail actif déplacé par changement d'état en `--mr-duration-base` / `--mr-ease-standard`.
- Survol seulement `@media (hover: hover) and (pointer: fine)` ; aucune transformation.
- `data-mr-preview` force les états (section 6).

## Accessibilité
- Mode `single` : `role="radiogroup"` (label requis), segments `role="radio"`, `aria-checked`, flèches + `Home`/`End` selon le pattern radio groupe natif ; roving tabindex.
- Mode `multiple` : `role="group"` ; Toggle natifs `aria-pressed`.
- Focus `:focus-visible`, `outline-offset: -2px` dans le conteneur.
- Cible ≥ `--mr-min-target` : segments ≥ 24px (sm minimal 24px).
- Aucun état porté par la seule couleur : `aria-checked` / `aria-pressed`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | mode |
| `items` | `Array<{ value: string, label: ReactNode, icon?: ReactNode, disabled?: boolean }>` | requis | données (P2) |
| `value` | `string \| string[]` | — | contrôlé (P5) |
| `defaultValue` | `string \| string[]` | — | non contrôlé (P5) |
| `onValueChange` | `(value: string \| string[]) => void` | — | futur événement `value-change` (P6) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | disposition |
| `disabled` | `boolean` | `false` | groupe désactivé |
| `name` | `string` | — | participation formulaire (P4) |
| `label` | `string` | requis | nom accessible du groupe |
| `className` | `string` | — | fusion (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| props `variant` / `size` (ToggleGroup.types.ts:19-20) | conservés : `size` (P1), `variant` (règle de conservation — seul 7.19 renomme/supprime) | non | ligne ToggleGroup |
| `onValueChange` déjà présent | conservé (P6) | non | ligne ToggleGroup |
| classes BEM (`.mr-toggle-group--*`) | `[data-type]`, `[data-size]`, `[data-orientation]` + classe `.mr-toggle-group` (section 6) | non | interne |
| segment actif sans rail | rail inférieur 2px `--mr-accent` (signature, section 4) | non (ajout) | — |
| recette : 2 valeurs en dur signalées par l'audit (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |

## Critères de vérification
1. Conteneur md : `block-size` = 40px (compact 32px) ; segment md = 36px (compact : conteneur − 4px).
2. padding conteneur = 2px ; border-radius conteneur = 6px, segment = 4px.
3. conteneur : `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `border-color` = `--mr-border-subtle` (`#dde4e6` light).
4. segment actif : `background-color` = `--mr-bg-raised` (`#ffffff`), `border-color` = `--mr-border-subtle`, `color` = `--mr-text-primary`.
5. segment inactif : `color` = `--mr-text-secondary` (`#4a5558` light) ; survol : `--mr-text-primary`.
6. rail actif : pseudo-élément `height` 2px, `background-color` = `--mr-accent`, retrait 8px, `bottom` aligné sur le bord du segment.
7. focus : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`, `outline-offset` = −2px.
8. mode `single` : conteneur `role="radiogroup"`, segments `role="radio"` ; flèche droite déplace `aria-checked` et émet `onValueChange`.
9. mode `multiple` : segments `aria-pressed`, `role="group"` sur le conteneur.
10. segment sm : largeur ≥ 24px ; transition segment = `--mr-duration-base` / `--mr-ease-standard`.

## Interdits
- Jamais d'aplat d'accent sur un segment (rail uniquement, section 4).
- Jamais d'opacité au désactivé, jamais `transition: all`, jamais de transformation.
- Pas de sélection multiple en mode `single` ; pas de `as` (P3) ; pas de classe modificatrice BEM.
