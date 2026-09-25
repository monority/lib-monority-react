# Stack
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Empile des blocs dans une direction avec un écart régulier (piles de champs, listes d'actions) quand aucune grille n'est requise. Retenir le Grid pour des colonnes et la Section pour un bloc titré.

## Anatomie
Conteneur en `display: flex` : direction par `direction`, écart uniforme entre enfants, alignement par `align`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart | `--mr-stack-gap` | 12px | 8px |
| toutes | direction | — | prop `direction` (`column` par défaut) | prop `direction` |

Écart piloté par la densité (5.13) : 12px en comfortable, 8px en compact.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | hérité du parent | hérité du parent | aucune | écart uniforme, sans marge sur les enfants |

Pas d'état interactif : conteneur de mise en page uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. L'écart passe par `gap`, jamais par des marges sur les enfants (espacement prévisible au premier et dernier enfant).

## Accessibilité
- Conteneur neutre : aucun rôle, jamais focusable pour lui-même.
- Ordre visuel = ordre du DOM : aucune inversion qui contredirait la tabulation.
- Liste d'actions : `as="ul"` avec enfants `li` quand la sémantique de liste s'applique.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `direction` | `'column' \| 'row'` | `'column'` | axe d'empilement |
| `align` | `'start' \| 'center' \| 'end' \| 'stretch'` | `'stretch'` | alignement transversal |
| `as` | `'div' \| 'section' \| 'ul'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | blocs empilés |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| écarts par marges éventuels dans les usages | `gap` = `--mr-stack-gap`, aucune marge sur les enfants | non | prompt §7.18 |
| recette stack : 0 valeur en dur (inventory §2.1) | aucun changement visuel requis | non | inventory §2.1 |
| `as` ouvert éventuel | union fermée `div \| section \| ul` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Écart : 12px en comfortable, 8px en compact, par `gap` uniquement.
2. Aucune marge verticale appliquée aux enfants par le conteneur.
3. Direction : `column` par défaut, `row` sur demande, sans JavaScript.
4. Alignement : `stretch` par défaut, valeurs fermées sinon.
5. Ordre visuel = ordre du DOM, aucun `order` appliqué.
6. `as` : seules `div`, `section`, `ul` acceptées.
7. Conteneur : aucun rôle, aucun `tabindex`.
8. Aucune bordure, aucun fond, aucune ombre sur le conteneur.

## Interdits
- Jamais d'écart hors `--mr-stack-gap`, jamais de marges sur les enfants pour espacer.
- Jamais d'inversion visuelle qui contredit l'ordre du DOM.
- Jamais de `as` hors union fermée.
- Jamais de Stack pour titrer un bloc : la Section porte le label instrument.
