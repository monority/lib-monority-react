# Spinner
Statut : spec v4 — à valider
Source : prompt maître §7.17

## Rôle
Indicateur rotatif d'attente indéterminée pour des opérations asynchrones en cours. Choisir `Progress` pour une progression quantifiable ou déterminée, `Skeleton` pour la charge initiale d'une mise en page.

## Anatomie
`Cercle SVG avec arc ouvert de 270° en rotation continue (trait 2px, currentColor)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | diamètre | `--mr-icon-size-sm` | 16px (ou 12px intégré inline) | 16px (ou 12px inline) |
| md | diamètre | `--mr-icon-size-md` | 16px | 16px |
| lg | diamètre | `--mr-icon-size-lg` | 20px | 20px |
| toutes | épaisseur du trait | `--mr-border-width` × 2 | 2px | 2px |
| toutes | angle d'ouverture de l'arc | constante géométrique | 270° | 270° |
| standard | durée de rotation | `--mr-duration-spin` | 800ms linéaire | 800ms linéaire |
| mouvement réduit | durée de rotation ralentie | double de `--mr-duration-spin` | 1600ms linéaire | 1600ms linéaire |

## États
| Variante | État | Fond | Couleur du trait | Bordure | Autre |
|---|---|---|---|---|---|
| standard | rotation continue | transparent | `currentColor` | — | animation `@keyframes mr-spin` linéaire infinie |
| mouvement réduit | rotation ralentie | transparent | `currentColor` | — | 1600ms au lieu de 800ms |

## Comportement et clavier
- Rotation continue infinie par `transform: rotate(0deg) -> rotate(360deg)`.
- En cas de `@media (prefers-reduced-motion: reduce)`, la rotation n'est pas stoppée mais ralentie à 1600ms (5.11) pour préserver la perception d'activité sans inconfort vestibulaire.
- Aucun focus clavier propre ; composant non interactif.

## Accessibilité
- Utilisé seul : `role="status"` avec libellé accessible obligatoire (ex. `aria-label="Chargement en cours"`).
- Utilisé à l'intérieur d'un bouton ou champ en état `loading` : `aria-hidden="true"`, le parent portant `aria-busy="true"`.
- Couleur par défaut `currentColor` pour hériter du contraste du texte environnant.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | diamètre du spinner |
| `label` | `string` | `'Chargement'` | nom accessible si utilisé seul |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| durée de rotation arbitraire (ex. 1000ms ou 600ms) | normalisée sur `--mr-duration-spin` (800ms, 1600ms en mouvement réduit, 5.11, 7.17) | non (animation) | section 5.11 |
| arc parfois à 360° avec tirets | arc fixe ouvert de 270° avec trait 2px (7.17) | non (visuel) | section 7.17 |
| token `--mr-duration-loop` dans les alias | `--mr-duration-spin` (5.16 approx) | non | migration-table §2 |

## Critères de vérification
1. dimensions : sm = 12 ou 16px, md = 16px, lg = 20px.
2. épaisseur du trait SVG : `stroke-width` = 2px.
3. arc de cercle : longueur d'arc égale à 270° (trois quarts de cercle).
4. couleur du trait : `currentColor` (hérite de la couleur de texte courante).
5. durée de rotation normale : `--mr-duration-spin` = 800ms avec fonction de temporisation linéaire.
6. durée en mouvement réduit : 1600ms (`@media (prefers-reduced-motion: reduce)`).
7. utilisé seul : présence de `role="status"` et nom accessible non vide.
8. utilisé dans Button en chargement : `aria-hidden="true"`.

## Interdits
- Jamais de spinner seul sans nom accessible (`role="status"` sans libellé interdit).
- Jamais d'animation saccadée ou non linéaire.
- Jamais de couleur en dur (l'héritage par `currentColor` est obligatoire).
- Pas de blocage total de l'animation en mouvement réduit (ralentissement à 1600ms obligatoire, 5.11).
