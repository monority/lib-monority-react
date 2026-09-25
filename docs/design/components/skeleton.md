# Skeleton
Statut : spec v4 — à valider
Source : prompt maître §7.17

## Rôle
Bloc de substitution animé préfigurant la disposition visuelle d'un composant ou d'un paragraphe en cours de chargement asynchrone. Choisir `Spinner` pour un indicateur local ponctuel, `Progress` pour un avancement chiffrable.

## Anatomie
`Pavé rectangulaire ou circulaire en pulsation d'opacité → [Lignes multiples avec dernière ligne écourtée à 60 %]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond | `--mr-bg-hover` | `#e8eef0` (light) | `#263032` (dark) |
| toutes | border-radius pavé | `--mr-radius-inline` | 4px | 4px |
| toutes | border-radius cercle | `--mr-radius-full` | 9999px | 9999px |
| toutes | hauteur de ligne de texte | `--mr-skeleton-line-height` | 12px | 12px |
| toutes | écart entre lignes | `--mr-spacing-2` | 8px | 8px |
| toutes | dernière ligne d'un bloc | — | 60 % de la largeur | 60 % de la largeur |
| standard | durée de pulsation | `--mr-duration-pulse` | 1200ms | 1200ms |
| mouvement réduit | durée de pulsation | — | 0ms (statique) | 0ms (statique) |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| standard | pulsation continue | `--mr-bg-hover` | — | transparent | `@keyframes` d'opacité 1 -> 0.55 -> 1 |
| mouvement réduit | statique | `--mr-bg-hover` | — | transparent | opacité fixe à 1 |

## Comportement et clavier
- Animation par `@keyframes mr-skeleton-pulse` : oscillation d'opacité entre 1 et 0.55 avec une durée de `--mr-duration-pulse` (1200ms) et une temporisation douce.
- `@media (prefers-reduced-motion: reduce)` : l'animation est désactivée, le squelette reste statique avec un fond fixe `--mr-bg-hover`.
- Aucun comportement interactif ni focus clavier.

## Accessibilité
- Élément de substitution décoratif : `aria-hidden="true"`.
- Le conteneur parent qui englobe la zone en chargement doit porter l'attribut `aria-busy="true"`.
- Ne pas insérer de texte invisible ou redondant dans le Skeleton lui-même.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `lines` | `number` | `1` | nombre de lignes de texte simulées |
| `width` | `string \| number` | `'100%'` | largeur du bloc |
| `height` | `string \| number` | — | hauteur explicite |
| `circle` | `boolean` | `false` | forme circulaire (avatar) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| shimmer horizontal ou gradient mobile | pulsation d'opacité douce 1 -> 0.55 (7.17, section 5.11) | non (visuel) | section 7.17 |
| durée de pulsation variable | normalisée sur `--mr-duration-pulse` (1200ms, statique en mouvement réduit) | non (animation) | section 5.11 |
| dernière ligne de paragraphe pleine largeur | dernière ligne automatiquement calibrée à 60 % (7.17) | non (visuel) | section 7.17 |

## Critères de vérification
1. fond = `--mr-bg-hover` (`#e8eef0` light, `#263032` dark).
2. `border-radius` = 4px (`--mr-radius-inline`), ou 9999px (`--mr-radius-full`) si `circle={true}`.
3. hauteur d'une ligne de texte = 12px (`--mr-skeleton-line-height`).
4. écart entre lignes multiples = 8px (`--mr-spacing-2`).
5. si `lines > 1` : la dernière ligne a une largeur de 60 %.
6. durée de pulsation = 1200ms (`--mr-duration-pulse`), amplitude d'opacité de 1 à 0.55.
7. en mouvement réduit (`prefers-reduced-motion: reduce`) : animation stoppée, opacité statique.
8. élément doté de `aria-hidden="true"`.

## Interdits
- Jamais de gradient de brillance (shimmer) agressif ou mouvant.
- Jamais d'animation en mouvement réduit (`animation: none` obligatoire sous `prefers-reduced-motion: reduce`).
- Jamais de focusable sur un Skeleton.
- Pas de texte lisible par lecteur d'écran à l'intérieur du Skeleton (`aria-hidden="true"` obligatoire).
