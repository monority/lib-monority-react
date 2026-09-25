# Textarea
Statut : spec v4 — à valider
Source : prompt maître §7.5

## Rôle
Champ de saisie textuelle multiligne. Choisir `Input` pour du texte court sur une seule ligne.

## Anatomie
Champ de texte `<textarea>` multiligne avec redimensionnement vertical contrôlé.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | min-block-size | `--mr-textarea-min-height` | 80px | 80px |
| sm | padding-inline | `--mr-control-padding-inline-sm` | 12px | 8px |
| md | padding-inline | `--mr-control-padding-inline-md` | 16px | 12px |
| lg | padding-inline | `--mr-control-padding-inline-lg` | 20px | 16px |
| toutes | padding-block | `--mr-spacing-2` | 8px | 8px |
| sm | font-size / line-height | `--mr-control-font-size-sm` | 13px / 20px | 12px / 20px |
| md | font-size / line-height | `--mr-control-font-size-md` | 14px / 20px | 13px / 20px |
| lg | font-size / line-height | `--mr-control-font-size-lg` | 16px / 24px | 14px / 24px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |
| toutes | redimensionnement | `resize: vertical` | vertical uniquement | vertical uniquement |

Padding vertical obligatoire de `--mr-spacing-2` (8px), jamais de padding natif arbitraire du navigateur.

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
- Saisie multiligne standard ; `Enter` insère un retour à la ligne, `Tab` passe au champ suivant (pas d'indentation par défaut).
- Redimensionnement : `vertical` ou `none` (le redimensionnement horizontal est proscrit pour ne pas briser la grille de mise en page).
- Transitions : `border-color`, `background-color`, `outline-color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Prévisualisation : supporte `data-mr-preview="hover | active | focus"`.

## Accessibilité
- Élément `<textarea>` natif relié à son `<label>` via `id` / `htmlFor`.
- En cas d'erreur : `aria-invalid="true"`, message relié par `aria-describedby`.
- Cible interactive largement supérieure à `--mr-min-target` (min-block-size 80px).
- Contraste de bordure garanti ≥ 3:1 (7:1 en high-contrast).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille de police et padding inline |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | champ désactivé |
| `readOnly` | `boolean` | `false` | lecture seule |
| `required` | `boolean` | `false` | champ obligatoire |
| `rows` | `number` | `3` | nombre de lignes initiales |
| `resize` | `'none' \| 'vertical'` | `'vertical'` | contrainte de redimensionnement |
| `name` | `string` | — | nom pour formulaire (P4) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `placeholder` | `string` | — | texte indicatif |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks :
- `onChange` : `(event: ChangeEvent<HTMLTextAreaElement>) => void` (natif, P6)
- `onValueChange` : `(value: string) => void` (futur événement DOM `value-change`, P6)

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` (`TextareaTone`) | retirée au profit de `invalid` seul (7.5, P1, P8) | oui | ligne Textarea |
| absence de `onValueChange` | `onValueChange(value)` ajouté en complément de `onChange` (P6) | non | ligne Textarea |
| `resize: 'both'` possible dans les types | restreint à `'none' \| 'vertical'` (7.5) | oui | ligne Textarea |
| `--mr-textarea-min-height-md` dans le code | `--mr-textarea-min-height` (exactement mappé, 5.16) | non | migration-table §2 |

## Critères de vérification
1. Textarea : `min-block-size` = 80px (`--mr-textarea-min-height`).
2. `padding-block` = 8px (`--mr-spacing-2`).
3. Textarea md : `padding-inline` = 16px (compact 12px) ; sm : 12px (compact 8px).
4. `resize` n'autorise que `vertical` ou `none` (jamais `horizontal` ni `both`).
5. repos : `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `border-color` = `--mr-border-control` (`#7c878a` light).
6. focus-visible : `border-color` = `--mr-focus-color`, `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
7. invalide : `border-color` = `--mr-danger-text` (`#ba2b2e` light), `aria-invalid="true"`.
8. désactivé : `background-color` = `--mr-bg-hover`, `border-color` = `--mr-border-subtle`, `cursor` = `not-allowed`, `opacity` = 1.
9. `border-radius` = 6px (`--mr-radius-control`).

## Interdits
- Jamais de redimensionnement horizontal (`resize: horizontal` et `resize: both` interdits).
- Jamais d'opacité au désactivé.
- Jamais de prop `tone` pour colorer la bordure.
- Pas de padding natif non réinitialisé.
