# AspectRatio
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Maintient un rapport largeur/hauteur constant pour un média (image, vidéo, aperçu) quand le conteneur est fluide. Retenir width/height natifs pour un média à taille fixe.

## Anatomie
Conteneur unique : ratio imposé par `aspect-ratio`, enfant en remplissage total (`width` / `height` 100%, média en `cover`).

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | rapport | — | prop `ratio` (ex. 16/9, 4/3, 1/1) | prop `ratio` |
| toutes | rayon | `--mr-radius-card` | 10px | 10px |
| toutes | fond d'attente | `--mr-bg-sunken` | `#f1f5f6` light | `#f1f5f6` light |

Aucun écart de densité : le ratio est indépendant de `data-density`.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | chargement | `--mr-bg-sunken` | — | aucune | enfant masqué, géométrie maintenue |
| unique | chargé | transparent | — | aucune | média `cover`, centré |
| unique | vide | `--mr-bg-sunken` | `--mr-text-tertiary` | aucune | icône 20px `--mr-text-tertiary` |

Pas d'état interactif : conteneur de mise en page uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. Le ratio s'applique dès le premier rendu pour éviter tout saut de mise en page (pas de recalcul en JavaScript).

## Accessibilité
- Conteneur neutre : aucun rôle, jamais focusable pour lui-même.
- Média porteur de sens : `alt` ou `aria-label` sur l'enfant ; média décoratif : `aria-hidden="true"`.
- Contraste : état vide `--mr-text-tertiary` ≥ 4.5:1 sur `--mr-bg-sunken`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `ratio` | `number` | `16 / 9` | rapport largeur / hauteur |
| `as` | `'div' \| 'figure' \| 'section'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | média en remplissage |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| ratios dédiés `--mr-aspect-landscape`, `--mr-aspect-portrait`, `--mr-aspect-square`, `--mr-aspect-video`, `--mr-aspect-wide` | prop `ratio` numérique, aucun token de ratio | non (visuel) | migration-table §2 |
| recette aspect-ratio : 0 valeur en dur (inventory §2.1) | aucun changement visuel requis | non | inventory §2.1 |
| `as` ouvert éventuel | union fermée `div \| figure \| section` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Ratio : `aspect-ratio` calculé égale la prop `ratio` (16/9 par défaut).
2. Enfant : `width` = 100%, `height` = 100% ; média en `object-fit: cover`.
3. Rayon : 10px ; fond d'attente `--mr-bg-sunken`, inchangé en compact.
4. Chargement : géométrie maintenue, aucun saut de mise en page, aucun calcul en JavaScript.
5. État vide : icône 20px `--mr-text-tertiary`, `aria-hidden="true"`.
6. `as` : seules `div`, `figure`, `section` acceptées (refus de type hors union).
7. Conteneur : aucun rôle, aucun `tabindex`, aucun gestionnaire d'événement.
8. Aucune valeur en dur hors `0`, pourcentages et `aspect-ratio` calculé.

## Interdits
- Jamais de ratio imposé par un token dédié : prop `ratio` uniquement.
- Jamais de recalcul du ratio en JavaScript au redimensionnement.
- Jamais de `as` hors union fermée, jamais de composant interactif enveloppé sans rôle propre.
- Jamais de hauteur fixe en pixels sur le conteneur.
