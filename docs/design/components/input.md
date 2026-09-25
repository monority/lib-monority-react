# Input
Statut : spec v4 — à valider
Source : prompt maître §7.5

## Rôle
Champ de saisie textuelle sur une seule ligne. Choisir `Textarea` pour du texte multiligne, `NumberInput` pour une valeur numérique avec pas, `PasswordInput` pour un mot de passe masquable.

## Anatomie
`[iconLeading] champ <input> [iconTrailing]`.

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
| toutes | font-weight | `--mr-font-weight-regular` | 400 | 400 |
| sm/md | icône | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | icône | `--mr-icon-size-lg` | 20px | 20px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

Padding latéral avec icône : côté concerné = padding horizontal standard + taille de l'icône + `--mr-spacing-2` (8px). Exemple md : 16px + 16px + 8px = 40px (compact : 12 + 16 + 8 = 36px).

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-sunken` | `--mr-text-primary` (placeholder `--mr-text-tertiary`) | `--mr-border-control` | — |
| standard | survol | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-text-tertiary` | — |
| standard | focus | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-focus-color` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | invalide | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-danger-text` | `aria-invalid="true"`, anneau `--mr-danger-text` au focus |
| standard | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed`, pas de survol |
| standard | lecture seule | transparent | `--mr-text-primary` | `--mr-border-subtle` | pas de survol, focusable |

## Comportement et clavier
- Saisie textuelle native standard ; touche `Enter` soumet le formulaire si applicable, `Escape` vide ou annule selon le contexte applicatif.
- Transitions : `border-color`, `background-color`, `outline-color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Prévisualisation d'état : supporte `data-mr-preview="hover | active | focus"`.
- Survol actif uniquement sous `@media (hover: hover) and (pointer: fine)`.

## Accessibilité
- Élément `<input>` natif ; relié à son `<label>` via `id` / `htmlFor`.
- En cas d'erreur : `aria-invalid="true"`, message relié par `aria-describedby`.
- Cible interactive ≥ `--mr-min-target` (24px) : hauteurs 32/40/48px conformes.
- Contraste de bordure de contrôle : `--mr-border-control` garanti ≥ 3:1 (7:1 en high-contrast).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | hauteur et padding |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | champ désactivé |
| `readOnly` | `boolean` | `false` | lecture seule |
| `required` | `boolean` | `false` | champ obligatoire |
| `name` | `string` | — | nom du champ pour formulaire (P4) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `placeholder` | `string` | — | texte indicatif |
| `iconLeading` | `ReactNode` | — | icône en début de champ |
| `iconTrailing` | `ReactNode` | — | icône en fin de champ |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks :
- `onChange` : `(event: ChangeEvent<HTMLInputElement>) => void` (événement natif préservé, P6)
- `onValueChange` : `(value: string) => void` (futur événement DOM `value-change`, P6)

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` (`neutral \| accent \| danger`) | retirée au profit de `invalid` seul (7.5, P1, P8) | oui | ligne Input |
| absence de `onValueChange` | `onValueChange(value)` ajouté en complément de `onChange` (P6) | non | ligne Input |
| classes BEM `.mr-input--*` | sélecteurs par attributs `[data-size]`, `[data-invalid]` (section 6) | non | interne |
| recette input : valeurs en dur relevées lors de l'audit | tokens `--mr-control-size-*`, `--mr-border-control` (T2) | non | inventory §2.1 |

## Critères de vérification
1. Input md : `block-size` = 40px en comfortable, 32px en compact.
2. Input sm : `block-size` = 32px en comfortable, 28px en compact ; lg : 48px / 40px.
3. repos : `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `border-color` = `--mr-border-control` (`#7c878a` light).
4. survol : `border-color` = `--mr-text-tertiary` (`#5d686b` light).
5. focus-visible : `border-color` = `--mr-focus-color` (`#068187` light), `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
6. invalide : `border-color` = `--mr-danger-text` (`#ba2b2e` light), `outline-color` = `--mr-danger-text` au focus.
7. désactivé : `background-color` = `--mr-bg-hover`, `border-color` = `--mr-border-subtle`, `color` = `--mr-text-disabled`, `cursor` = `not-allowed`.
8. lecture seule : `background-color` = transparent, `border-color` = `--mr-border-subtle`.
9. padding avec icône md : côté icône = 40px en comfortable (16 + 16 + 8), 36px en compact (12 + 16 + 8).
10. `border-radius` = 6px (`--mr-radius-control`).

## Interdits
- Jamais d'opacité sur l'état désactivé.
- Jamais de prop `tone` pour styler les bordures d'input (accent interdit sur la bordure de champ, 5.4).
- Jamais d'animation de dimension ou de position ; aucune `transition: all`.
- Pas de `outline: none` sans anneau de focus de remplacement.
