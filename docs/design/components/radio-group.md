# RadioGroup
Statut : spec v4 — à valider
Source : prompt maître §7.7

## Rôle
Groupe d'options circulaires à sélection mutuellement exclusive. Choisir `Checkbox` pour une sélection multiple ou indépendante, `Select` si l'espace est restreint.

## Anatomie
`Conteneur de groupe (role="radiogroup") → N rangées d'options (cercle radio avec point central + libellé textuel + description facultative)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm / md | taille du cercle extérieur | `--mr-checkbox-size-md` | 16px | 16px |
| lg | taille du cercle extérieur | `--mr-checkbox-size-lg` | 20px | 20px |
| sm / md | point central | `--mr-radio-dot-md` | 6px | 6px |
| lg | point central | `--mr-radio-dot-lg` | 8px | 8px |
| toutes | border-radius cercle | `--mr-radius-full` | 9999px | 9999px |
| toutes | border-radius point | `--mr-radius-full` | 9999px | 9999px |
| toutes | border-width cercle | `--mr-border-width` | 1px | 1px |
| toutes | écart cercle → libellé | `--mr-spacing-2` | 8px | 8px |
| toutes | hauteur minimale de rangée | `--mr-min-target` | 24px | 24px |
| toutes | écart entre options | `--mr-stack-gap` | 12px | 8px |

## États
| Variante | État | Fond | Bordure cercle | Point central | Autre |
|---|---|---|---|---|---|
| standard | non sélectionné repos | `--mr-bg-raised` | `--mr-border-control` | transparent | bordure garantie ≥ 3:1 |
| standard | non sélectionné survol | `--mr-bg-raised` | `--mr-text-tertiary` | transparent | survol sur toute la rangée |
| standard | sélectionné repos | `--mr-bg-raised` | `--mr-accent` | `--mr-accent` | point central centré |
| standard | sélectionné survol | `--mr-bg-raised` | `--mr-accent-hover` | `--mr-accent-hover` | — |
| standard | invalide (non sélectionné) | `--mr-bg-raised` | `--mr-danger-text` | transparent | `aria-invalid="true"` |
| standard | focus | état courant | bordure courante | point courant | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | désactivé | `--mr-bg-hover` | `--mr-border-subtle` | `--mr-text-disabled` (si coché) | `cursor: not-allowed`, libellé `--mr-text-disabled` |

## Comportement et clavier
- Clic sur une rangée sélectionne l'option et émet `onValueChange`.
- Clavier : `Flèche Bas` / `Flèche Droite` sélectionne l'option suivante ; `Flèche Haut` / `Flèche Gauche` sélectionne l'option précédente.
- Navigation cyclique (du dernier au premier).
- Cible : toute la rangée (cercle + texte) est cliquable.
- Transitions : `border-color`, `background-color`, `transform` du point en `--mr-duration-fast` / `--mr-ease-standard`.

## Accessibilité
- Conteneur : `role="radiogroup"`, `aria-label` ou `aria-labelledby` obligatoire.
- Options : `<input type="radio">` ou `role="radio"`, `aria-checked="true | false"`.
- Roving tabindex (seul le bouton sélectionné ou le premier est dans le flux de tabulation).
- Cible interactive de chaque rangée ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, description?: ReactNode, disabled?: boolean }>` | requis | liste de données (P2) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `onValueChange` | `(value: string) => void` | — | futur événement DOM `value-change` (P6) |
| `name` | `string` | — | nom du groupe pour formulaire natif (P4) |
| `orientation` | `'vertical' \| 'horizontal'` | `'vertical'` | disposition |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille des cercles radio |
| `disabled` | `boolean` | `false` | groupe entièrement désactivé |
| `required` | `boolean` | `false` | obligatoire |
| `label` | `string` | — | nom accessible du groupe |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onChange` sur RadioGroup (types / inventory) | `onChange` → `onValueChange` (P6) | oui | ligne RadioGroup |
| prop `tone` dans les types actuels | retirée : l'accent est fixé par le système (7.7, P1) | oui | ligne RadioGroup |
| recette : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-radio-dot-*`, `--mr-stack-gap` (T2) | non | inventory §2.1 |

## Critères de vérification
1. RadioGroup md / sm : cercle diamètre = 16px (`--mr-checkbox-size-md`).
2. RadioGroup lg : cercle diamètre = 20px (`--mr-checkbox-size-lg`).
3. point central md : diamètre = 6px (`--mr-radio-dot-md`) ; lg : 8px (`--mr-radio-dot-lg`).
4. non sélectionné repos : fond `--mr-bg-raised`, bordure `--mr-border-control` (`#7c878a` light).
5. sélectionné repos : fond `--mr-bg-raised`, bordure `--mr-accent` (`#07787d` light), point `--mr-accent`.
6. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` autour du cercle.
7. clavier : `Flèche Bas` active l'option suivante et émet `onValueChange`.
8. conteneur `role="radiogroup"`, options `role="radio"` avec `aria-checked` synchronisé.
9. `border-radius` cercle et point = 9999px (`--mr-radius-full`).

## Interdits
- Jamais d'opacité sur l'état désactivé.
- Jamais de prop `tone` pour colorer un bouton radio hors système.
- Pas de sélection multiple (exclusivité stricte du radio group).
- Pas de clic réservé au seul cercle quand un libellé est présent.
