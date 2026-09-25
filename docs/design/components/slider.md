# Slider
Statut : spec v4 — à valider
Source : prompt maître §7.8

## Rôle
Curseur de réglage d'une valeur numérique continue ou par pas dans un intervalle délimité. Choisir `NumberInput` si la valeur doit être saisie au clavier avec exactitude textuelle.

## Anatomie
`Piste horizontale (rail de fond) → Portion remplie (jauge active) → Pouce circulaire manipulable → [Affichage de valeur]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | épaisseur de piste | `--mr-slider-track-h` | 4px | 4px |
| toutes | diamètre du pouce | `--mr-slider-thumb-size` | 16px | 16px |
| toutes | border-width pouce | `--mr-border-width` | 1px | 1px |
| toutes | border-radius piste et pouce | `--mr-radius-full` | 9999px | 9999px |
| toutes | affichage valeur | `--mr-type-code` (13/20, 400, mono) | 13px / 20px | 13px / 20px |
| toutes | hauteur minimale de zone cible | `--mr-min-target` | 24px | 24px |

## États
| Variante | État | Piste fond | Portion remplie | Pouce fond | Pouce bordure |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-active` | `--mr-accent` | `--mr-bg-raised` | `--mr-border-control` |
| standard | survol pouce | `--mr-bg-active` | `--mr-accent-hover` | `--mr-bg-raised` | `--mr-text-tertiary` |
| standard | glissement / actif | `--mr-bg-active` | `--mr-accent-active` | `--mr-bg-active` | `--mr-accent` |
| standard | focus | état repos | portion active | fond repos | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | désactivé | `--mr-bg-active` | `--mr-text-disabled` | `--mr-bg-hover` | `--mr-border-subtle` |

## Comportement et clavier
- Glissement à la souris ou au doigt le long de la piste avec déplacement instantané du pouce.
- Clic n'importe où sur la piste déplace directement le pouce à cette position.
- Clavier :
  - `Flèche Droite` / `Flèche Haut` : incrémente de `step` (défaut 1).
  - `Flèche Gauche` / `Flèche Bas` : décrémente de `step`.
  - `Page Up` / `Page Down` : incrémente / décrémente de `step * 10`.
  - `Home` / `End` : saute au minimum / maximum.
- Valeur affichée : formatée avec `font-variant-numeric: tabular-nums` en voix système mono.

## Accessibilité
- Pouce : `role="slider"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-orientation="horizontal"`.
- Focus `:focus-visible` positionné sur le pouce (pas sur la piste).
- En cas de contrôle étiqueté : `aria-label` ou `aria-labelledby`.
- Hauteur de cible tactile ≥ `--mr-min-target` (24px) via une zone invisible autour de la piste.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `number` | — | valeur contrôlée (P5) |
| `defaultValue` | `number` | — | valeur initiale non contrôlée (P5) |
| `onValueChange` | `(value: number) => void` | — | futur événement DOM `value-change` (P6) |
| `min` | `number` | `0` | valeur minimale |
| `max` | `number` | `100` | valeur maximale |
| `step` | `number` | `1` | pas d'incrément |
| `disabled` | `boolean` | `false` | contrôle désactivé |
| `name` | `string` | — | participation au formulaire (P4) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : `onValueChange` pour la valeur fonctionnelle ; `onChange` réservé à l'événement DOM natif sous-jacent si applicable (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| présence conjointe `onChange` et `onValueChange` | `onValueChange` devient le canal canonique (P6), `onChange` réservé au natif | non | ligne Slider |
| recette slider : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-slider-track-h`, `--mr-slider-thumb-size` (T2) | non | inventory §2.1 |
| affichage de valeur parfois non mono | style `--mr-type-code` + `tabular-nums` obligatoire (7.8, section 4) | non (visuel) | section 7.8 |

## Critères de vérification
1. épaisseur de la piste : `block-size` = 4px (`--mr-slider-track-h`).
2. diamètre du pouce : `inline-size` = `block-size` = 16px (`--mr-slider-thumb-size`).
3. rayon piste et pouce = 9999px (`--mr-radius-full`).
4. repos : piste fond `--mr-bg-active` (`#e1e8e9` light), portion remplie fond `--mr-accent` (`#07787d` light).
5. pouce repos : fond `--mr-bg-raised` (`#ffffff`), bordure `--mr-border-control` (`#7c878a` light).
6. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` centré sur le pouce.
7. désactivé : pouce fond `--mr-bg-hover`, bordure `--mr-border-subtle`, `cursor` = `not-allowed`.
8. clavier : `Flèche Droite` incrémente de `step` et met à jour `aria-valuenow`.
9. `role="slider"` présent avec `aria-valuemin`, `aria-valuemax` et `aria-valuenow`.

## Interdits
- Jamais d'opacité au désactivé.
- Jamais de saut de valeur sans émission de `onValueChange`.
- Jamais de focus sur la piste elle-même (le focus appartient au pouce manipulable).
- Pas de chiffres en police sans empattement variable pour la valeur du slider (mono `tabular-nums` requis).
