# NumberInput
Statut : spec v4 — à valider
Source : prompt maître §7.5

## Rôle
Champ de saisie numérique avec boutons de pas intégrés et alignement tabulaire des chiffres. Choisir `Input` pour du texte général, `Slider` pour un réglage continu dans une plage bornée.

## Anatomie
`champ <input type="text" inputmode="numeric"> → boutons intégrés [−] [+] (IconButton ghost sm)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size | `--mr-control-size-lg` | 48px | 40px |
| sm | padding-inline-start | `--mr-control-padding-inline-sm` | 12px | 8px |
| md | padding-inline-start | `--mr-control-padding-inline-md` | 16px | 12px |
| lg | padding-inline-start | `--mr-control-padding-inline-lg` | 20px | 16px |
| toutes | padding-inline-end | calculé (boutons intégrés) | 68px | 60px |
| sm | font-size / line-height | `--mr-control-font-size-sm` | 13px / 20px | 12px / 20px |
| md | font-size / line-height | `--mr-control-font-size-md` | 14px / 20px | 13px / 20px |
| lg | font-size / line-height | `--mr-control-font-size-lg` | 16px / 24px | 14px / 24px |
| toutes | chiffres tabulaires | `font-variant-numeric: tabular-nums` | tabular-nums | tabular-nums |
| toutes | boutons pas | `--mr-control-size-sm` (IconButton sm) | 28px ou 32px | 24px ou 28px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-control` | boutons pas visibles à droite |
| standard | survol | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-text-tertiary` | boutons pas survolables |
| standard | focus | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-focus-color` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | invalide | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-danger-text` | `aria-invalid="true"`, anneau `--mr-danger-text` au focus |
| standard | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | boutons pas désactivés, `cursor: not-allowed` |
| standard | lecture seule | transparent | `--mr-text-primary` | `--mr-border-subtle` | boutons pas masqués ou inactifs |

## Comportement et clavier
- Touches `Flèche Haut` / `Flèche Bas` : incrémente / décrémente de `step` (défaut 1).
- `Page Up` / `Page Down` : incrémente / décrémente de `step * 10`.
- Boutons intégrés : clic incrémente/décrémente, sans perdre le focus du champ.
- Respect strict des bornes `min` et `max` : bouton désactivé à la borne.
- Chiffres toujours formatés avec `font-variant-numeric: tabular-nums`.
- Saisie manuelle validée à la perte de focus (`blur`) pour contraindre les bornes et le pas.

## Accessibilité
- `role="spinbutton"` avec `aria-valuenow`, `aria-valuemin`, `aria-valuemax`.
- Boutons − et + dotés de `aria-label` (« Diminuer », « Augmenter ») et `tabindex="-1"` pour ne pas surcharger la tabulation.
- En cas d'erreur : `aria-invalid="true"`, message relié par `aria-describedby`.
- Cible interactive globale ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille du champ |
| `min` | `number` | — | valeur minimale |
| `max` | `number` | — | valeur maximale |
| `step` | `number` | `1` | pas d'incrément |
| `value` | `number \| null` | — | valeur contrôlée (P5) |
| `defaultValue` | `number \| null` | — | valeur initiale non contrôlée (P5) |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | champ désactivé |
| `readOnly` | `boolean` | `false` | lecture seule |
| `required` | `boolean` | `false` | obligatoire |
| `placeholder` | `string` | — | texte indicatif |
| `name` | `string` | — | nom pour formulaire (P4) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks :
- `onChange` : `(event: ChangeEvent<HTMLInputElement>) => void` (natif préservé, P6)
- `onValueChange` : `(value: number | null) => void` (futur événement DOM `value-change`, P6)

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onChange` seul sur NumberInput (types:18) | `onChange` natif conservé + `onValueChange(value)` ajouté (7.5, P6) | non | ligne NumberInput |
| boutons de pas avec style ad hoc | deux IconButton ghost sm intégrés (7.5) | non (visuel) | ligne NumberInput |
| absence de page dédiée dans le registre docs | documenté dans la famille Input (audit inventory §1) | non | inventory §1 |

## Critères de vérification
1. NumberInput md : `block-size` = 40px en comfortable, 32px en compact.
2. boutons − et + intégrés en IconButton ghost sm à droite du conteneur.
3. chiffres affichés avec `font-variant-numeric` = `tabular-nums`.
4. `Flèche Haut` augmente la valeur de `step` et émet `onValueChange`.
5. `Flèche Bas` diminue la valeur de `step` et émet `onValueChange`.
6. atteignant `max`, le bouton + devient désactivé (`disabled` ou `aria-disabled="true"`).
7. repos : fond `--mr-bg-sunken` (`#f1f5f6` light), bordure `--mr-border-control` (`#7c878a` light).
8. focus-visible : anneau `outline: var(--mr-focus-width) solid var(--mr-focus-color)`.
9. `role="spinbutton"` présent avec `aria-valuenow` synchronisé.

## Interdits
- Jamais de flèches natives du navigateur (steppers natifs masqués via `::-webkit-inner-spin-button`).
- Jamais de chiffres en police mono (voix humaine avec `tabular-nums` obligatoire, section 4).
- Jamais d'opacité au désactivé.
- Pas de valeur hors des bornes `min`/`max` après validation.
