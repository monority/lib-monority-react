# Progress
Statut : spec v4 — à valider
Source : prompt maître §7.17

## Rôle
Barre de progression linéaire visualisant l'avancement déterminé d'une tâche (téléchargement, étape) ou une activité indéterminée. Choisir `Spinner` pour un chargement ponctuel compact sans indication de durée, `Slider` pour un contrôle ajustable par l'utilisateur.

## Anatomie
`Piste de fond oblongue arrondie → Portion remplie (jauge colorée) → [Libellé textuel + valeur numérique en tabular-nums]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | épaisseur de la piste | `--mr-progress-h` | 4px | 4px |
| toutes | border-radius piste et portion | `--mr-radius-full` | 9999px | 9999px |
| toutes | police de valeur | `--mr-type-code` | 13px / 20px, 400, mono | 13px / 20px, 400, mono |
| toutes | chiffres tabulaires | `font-variant-numeric: tabular-nums` | tabular-nums | tabular-nums |
| toutes | écart piste → libellé | `--mr-spacing-2` | 8px | 8px |

## États
| Variante | État | Fond piste | Fond portion | Texte | Autre |
|---|---|---|---|---|---|
| standard | déterminé (valeur N) | `--mr-bg-active` | `--mr-accent` | `--mr-text-primary` | jauge remplie à N % |
| tone accent | déterminé | `--mr-bg-active` | `--mr-accent` | `--mr-text-primary` | jauge `--mr-accent` |
| tone success | déterminé | `--mr-bg-active` | `--mr-success-text` | `--mr-text-primary` | jauge `--mr-success-text` |
| tone warning | déterminé | `--mr-bg-active` | `--mr-warning-text` | `--mr-text-primary` | jauge `--mr-warning-text` |
| tone danger | déterminé | `--mr-bg-active` | `--mr-danger-text` | `--mr-text-primary` | jauge `--mr-danger-text` |
| tone info | déterminé | `--mr-bg-active` | `--mr-info-text` | `--mr-text-primary` | jauge `--mr-info-text` |
| standard | indéterminé | `--mr-bg-active` | `--mr-accent` | `--mr-text-primary` | translation continue de la portion ; statique sous mouvement réduit |

## Comportement et clavier
- Déterminé : la largeur de la portion active est calculée par le ratio `(value / max) * 100%`, avec transition fluide sur `--mr-duration-fast` / `--mr-ease-standard`.
- Indéterminé (quand `value === undefined` ou `null`) : une portion d'un tiers de la largeur glisse d'un bout à l'autre en boucle par `@keyframes mr-progress-indeterminate`.
- En mouvement réduit (`@media (prefers-reduced-motion: reduce)`) : l'animation indéterminée est figée, la barre affiche une portion centrale statique pour éviter toute distraction.
- Aucun focus clavier : composant d'affichage passif.

## Accessibilité
- `role="progressbar"`.
- Déterminé : `aria-valuenow`, `aria-valuemin="0"`, `aria-valuemax`.
- Indéterminé : aucun attribut `aria-valuenow` (indique un état non mesurable au lecteur d'écran).
- Libellé accessible : `aria-label` ou `aria-labelledby` obligatoire pour expliquer ce qui progresse.
- Affichage textuel de la valeur : formaté avec `tabular-nums`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `number` | — | valeur courante (si absent, mode indéterminé) |
| `max` | `number` | `100` | valeur maximale |
| `tone` | `'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'accent'` | couleur sémantique de la jauge (P1) |
| `label` | `ReactNode` | — | texte d'accompagnement |
| `showValue` | `boolean` | `false` | affichage textuel de la valeur en pourcentage |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `mode` dans certains prototypes | supprimée : le mode découle de la présence de `value` (P8 : un composant, une responsabilité) | oui | ligne Progress |
| couleurs de jauge ad hoc | normalisées sur `--mr-accent` et `{ton}-text` (7.17) | non (visuel) | section 7.17 |
| animation indéterminée active en mouvement réduit | statique obligatoire sous `prefers-reduced-motion: reduce` (5.11, 7.17) | non (accessibilité) | section 5.11 |
| recette progress : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-progress-h`, `--mr-radius-full` (T2) | non | inventory §2.1 |

## Critères de vérification
1. épaisseur de la piste : `block-size` = 4px (`--mr-progress-h`).
2. rayon piste et portion = 9999px (`--mr-radius-full`).
3. fond de piste = `--mr-bg-active` (`#e1e8e9` light, `#2e393b` dark).
4. portion par défaut = `--mr-accent` (`#07787d` light).
5. portion avec `tone="success"` = `--mr-success-text` (`#016d3c` light).
6. mode déterminé : `role="progressbar"`, `aria-valuenow` et `aria-valuemax` synchronisés.
7. mode indéterminé : absence de `aria-valuenow`, animation continue de translation.
8. mouvement réduit : animation indéterminée figée (`animation: none`).
9. affichage numérique : police avec `font-variant-numeric: tabular-nums`.

## Interdits
- Jamais de prop `mode` qui bascule vers un comportement divergent (P8).
- Jamais d'animation indéterminée active sous `prefers-reduced-motion: reduce`.
- Jamais de progressbar sans nom accessible (`aria-label` ou `aria-labelledby` obligatoire).
- Jamais d'opacité globale pour simuler un état inactif.
