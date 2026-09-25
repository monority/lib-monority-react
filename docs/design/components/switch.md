# Switch
Statut : spec v4 — à valider
Source : prompt maître §7.8

## Rôle
Interrupteur à bascule pour l'activation ou la désactivation immédiate d'une fonctionnalité ou d'un paramètre. Choisir `Checkbox` pour une option de formulaire soumise au clic d'un bouton de validation.

## Anatomie
`Piste oblongue arrondie → Pouce circulaire coulissant → Libellé textuel associé`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | largeur × hauteur piste | `--mr-switch-track-w-sm` × `--mr-switch-track-h-sm` | 36px × 20px | 36px × 20px |
| md | largeur × hauteur piste | `--mr-switch-track-w-md` × `--mr-switch-track-h-md` | 44px × 24px | 44px × 24px |
| lg | largeur × hauteur piste | `--mr-switch-track-w-lg` × `--mr-switch-track-h-lg` | 52px × 28px | 52px × 28px |
| sm | diamètre du pouce | hauteur piste − 4px | 16px | 16px |
| md | diamètre du pouce | hauteur piste − 4px | 20px | 20px |
| lg | diamètre du pouce | hauteur piste − 4px | 24px | 24px |
| sm / md / lg | course de déplacement | largeur − hauteur piste | 16 / 20 / 24px | 16 / 20 / 24px |
| toutes | inset du pouce | `--mr-spacing-0-5` | 2px | 2px |
| toutes | border-radius piste et pouce | `--mr-radius-full` | 9999px | 9999px |
| toutes | hauteur minimale de rangée | `--mr-min-target` | 24px | 24px |

Les dimensions du Switch ne varient pas avec la densité (5.13).

## États
| Variante | État | Piste (fond) | Pouce (fond) | Bordure piste | Autre |
|---|---|---|---|---|---|
| standard | off repos | `--mr-bg-sunken` | `--mr-switch-thumb-off` | `--mr-border-control` | pouce aligné à gauche (inset 2px) |
| standard | off survol | `--mr-bg-sunken` | `--mr-switch-thumb-off` | `--mr-text-tertiary` | survol sur toute la rangée |
| standard | on repos | `--mr-accent` | `--mr-on-accent` | `--mr-accent` | pouce translaté à droite |
| standard | on survol | `--mr-accent-hover` | `--mr-on-accent` | `--mr-accent-hover` | — |
| standard | focus | état courant | état courant | bordure courante | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | désactivé | `--mr-bg-active` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed`, libellé `--mr-text-disabled` |

## Comportement et clavier
- Clic ou frappe de la touche `Espace` bascule l'état on / off et émet `onCheckedChange`.
- Déplacement du pouce : par `transform: translateX(...)`, durée `--mr-duration-base` (180ms), courbe `--mr-ease-standard`.
- Transitions de couleur de piste : `--mr-duration-fast` / `--mr-ease-standard`.
- Toute la rangée (piste + texte) est cliquable.

## Accessibilité
- `role="switch"`, `aria-checked="true | false"`.
- Focus `:focus-visible` entourant la piste avec `outline-offset: var(--mr-focus-offset)`.
- Libellé requis (explicite ou via `aria-label`).
- Cible interactive de la rangée ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `checked` | `boolean` | — | état contrôlé (P5) |
| `defaultChecked` | `boolean` | `false` | état initial non contrôlé (P5) |
| `onCheckedChange` | `(checked: boolean) => void` | — | futur événement DOM `checked-change` (P6) |
| `disabled` | `boolean` | `false` | désactivé |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille du switch |
| `name` | `string` | — | participation au formulaire (P4) |
| `value` | `string` | — | valeur transmise |
| `className` | `string` | — | fusion de classe (P9) |
| `children` | `ReactNode` | — | libellé de la rangée |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` dans les types (Switch.types.ts) | retirée : l'accent est fixé par le système (7.8, P1) | oui | ligne Switch |
| recette switch : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-switch-track-w-*`, `--mr-switch-thumb-off` (T2) | non | inventory §2.1 |
| transition ancienne avec durée arbitraire | normalisée sur `--mr-duration-base` / `--mr-ease-standard` (5.11, 7.8) | non (visuel) | migration-table §2 |

## Critères de vérification
1. Switch md : piste `inline-size` = 44px, `block-size` = 24px (`--mr-switch-track-w-md` × `--mr-switch-track-h-md`).
2. Switch sm : 36px × 20px ; lg : 52px × 28px.
3. pouce md : diamètre = 20px ; inset = 2px (`--mr-spacing-0-5`).
4. déplacement pouce md : `translateX(20px)` (largeur − hauteur piste).
5. off repos : piste bordure `--mr-border-control` (`#7c878a` light), pouce `--mr-switch-thumb-off` (`#ffffff`).
6. on repos : piste fond `--mr-accent` (`#07787d` light), pouce fond `--mr-on-accent` (`#ffffff`).
7. désactivé : piste fond `--mr-bg-active`, pouce `--mr-text-disabled`, `cursor` = `not-allowed`.
8. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` autour de la piste.
9. `role="switch"` présent avec `aria-checked` synchronisé.
10. durée de transition déplacement : `--mr-duration-base` (180ms), courbe `--mr-ease-standard`.

## Interdits
- Jamais d'opacité au désactivé.
- Jamais de prop `tone` pour teinter la piste on en une couleur arbitraire.
- Jamais d'animation de largeur du pouce (déplacement strict par `transform: translateX`).
- Pas de `role="checkbox"` (c'est un interrupteur à activation immédiate).
