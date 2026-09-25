# Carousel
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.1 contrôles)

## Rôle
Fait défiler une série de panneaux (images, cartes, témoignages) avec précédent / suivant explicites quand la pagination numérotée ne convient pas. Retenir les Tabs pour des vues nommées.

## Anatomie
Piste horizontale de panneaux de largeur égale, un panneau visible à la fois ; boutons précédent / suivant en IconButton `secondary` superposés aux bords ; compteur textuel optionnel (« 2 / 5 ») en `caption`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | bouton précédent/suivant | `--mr-control-size-md` | 40px | 32px |
| toutes | icône flèche | `--mr-icon-size-md` | 16px | 16px |
| toutes | écart boutons/piste | `--mr-spacing-2` | 8px | 8px |
| toutes | compteur | `--mr-type-caption` | 12px / 16px | 12px / 16px |
| toutes | espacement panneaux | `--mr-grid-gap` | 16px | 12px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | `--mr-bg-canvas` | `--mr-text-primary` | aucune | boutons IconButton `secondary` |
| unique | panneau actif | `--mr-bg-canvas` | `--mr-text-primary` | aucune | `aria-hidden="false"`, autres panneaux `aria-hidden="true"` |
| unique | bouton désactivé (bord) | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed` |
| unique | focus bouton | selon état | selon état | selon état | `outline: var(--mr-focus-width) solid var(--mr-focus-color)` sur `:focus-visible` |

## Comportement et clavier
- Clic précédent / suivant : avance d'un panneau, animation de translation de piste en `--mr-duration-base` / `--mr-ease-standard`.
- Pas de défilement automatique sans bouton pause visible ; la pause stoppe toute rotation et reste mémorisée pendant la session.
- Clavier : `Flèche Gauche` / `Flèche Droite` quand le focus est dans la région, `Home` / `End` premier / dernier panneau.
- Le compteur se met à jour à chaque changement et reste synchronisé avec le panneau visible.

## Accessibilité
- Région : `role="region"`, `aria-roledescription="carousel"`, `aria-label` nommant le contenu.
- Panneaux : `role="group"`, `aria-roledescription="slide"`, `aria-label` « n / total ».
- Panneaux masqués : `aria-hidden="true"` et non tabulables.
- Bouton pause : `aria-pressed="true | false"` ; rotation automatique annoncée en `aria-live="off"` (jamais d'annonce intrusive).
- Mouvement réduit : translation remplacée par un bascule sans animation.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `number` | — | index du panneau visible (contrôlé, P5) |
| `defaultValue` | `number` | `0` | panneau initial |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | axe de défilement |
| `autoplay` | `boolean` | `false` | rotation automatique (avec pause obligatoire) |
| `aria-label` | `string` | requis | nom de la région |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(index)` et futur événement DOM `value-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| recette carousel : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| contrôles précédent/suivant locaux éventuels | IconButton `secondary` md (7.1) | non (visuel) | migration-table §1 (aucun changement de nom) |
| rotation automatique sans pause éventuelle | bouton pause obligatoire, état mémorisé | oui (comportement) | prompt §7.18 |
| durées locales éventuelles | `--mr-duration-base` / `--mr-ease-standard` | non | migration-table §2 (5.16 approx) |

## Critères de vérification
1. Boutons précédent/suivant : 40px × 40px en comfortable, 32px en compact, variante IconButton `secondary`.
2. Flèches : 16px × 16px en `currentColor`, `vector-effect: non-scaling-stroke`.
3. Piste : `gap` = 16px en comfortable, 12px en compact ; un seul panneau visible à la fois.
4. Transition de piste : `transform` seul, 180ms, `--mr-ease-standard`.
5. Région : `aria-roledescription` = `carousel` ; panneaux : `aria-roledescription` = `slide`, `aria-label` « n / total ».
6. Panneaux masqués : `aria-hidden="true"`, aucun élément tabulable.
7. `autoplay` sans pause : interdit ; bouton pause avec `aria-pressed`, état mémorisé.
8. Compteur : `font` 12px/16px, `color` = `--mr-text-secondary`, synchronisé avec le panneau visible.

## Interdits
- Jamais de défilement automatique sans bouton pause visible et mémorisé.
- Jamais de points de pagination cliquables sans libellé : le compteur textuel prime.
- Jamais d'annonce `aria-live` intrusive à chaque rotation.
- Jamais de panneau masqué tabulable ou annoncé.
