# Grid
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Aligne des blocs en colonnes régulières (cartes, métriques, galeries) quand la grille 12 colonnes est superflue. Retenir le Stack pour un empilement unidirectionnel.

## Anatomie
Conteneur en `display: grid` : colonnes par `columns` (nombre ou taille minimale de piste), écart uniforme, enfants en flux grille.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart | `--mr-grid-gap` | 16px (12px sous 640px) | 12px |
| toutes | colonnes | — | prop `columns` (nombre ou `minmax`) | prop `columns` |

Écart piloté par la densité (5.13) : 16px en comfortable, 12px en compact.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | hérité du parent | hérité du parent | aucune | colonnes conservées à toute largeur |

Pas d'état interactif : conteneur de mise en page uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. Le nombre de colonnes peut répondre aux points de rupture 640px et 1100px (5.14) via la prop `columns` sans JavaScript (requêtes de conteneur ou classes utilitaires, jamais de lecture de la largeur en JS, P7).

## Accessibilité
- Conteneur neutre : aucun rôle, jamais focusable pour lui-même.
- Ordre visuel = ordre du DOM : aucun réordonnancement par `order` qui contredirait la tabulation.
- Aucun contenu masqué par débordement : pas de défilement horizontal de page à 320px.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `columns` | `number \| string` | `3` | colonnes (nombre ou piste `minmax`) |
| `as` | `'div' \| 'section' \| 'ul'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | blocs de grille |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| piste dédiée `--mr-grid-min-column` | prop `columns` (nombre ou `minmax`), écart `--mr-grid-gap` | non (visuel) | migration-table §2 |
| recette grid : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| `as` ouvert éventuel | union fermée `div \| section \| ul` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Écart : 16px en comfortable, 12px en compact ; 12px sous 640px.
2. Colonnes : nombre rendu égale la prop `columns` (3 par défaut).
3. Aucune lecture de largeur en JavaScript (P7) : pur CSS.
4. Ordre visuel = ordre du DOM, aucun `order` appliqué.
5. Page à 320px : aucun défilement horizontal.
6. `as` : seules `div`, `section`, `ul` acceptées.
7. Conteneur : aucun rôle, aucun `tabindex`.
8. Aucune bordure, aucun fond, aucune ombre sur le conteneur.

## Interdits
- Jamais d'écart hors `--mr-grid-gap`, jamais de lecture de la largeur en JavaScript.
- Jamais de réordonnancement visuel qui contredit l'ordre du DOM.
- Jamais de `as` hors union fermée.
- Jamais de grille à colonnes fixes sans réponse aux points de rupture (page 320px sans scroll horizontal).
