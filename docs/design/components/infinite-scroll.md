# InfiniteScroll
Statut : spec v4 — à valider (expérimental, hors grille de qualité)
Source : prompt maître §7.18 (tokens uniquement)

## Rôle
Charge la page suivante d'une collection quand la sentinelle entre dans la zone visible. Composant expérimental : tokens uniquement, sans style propre.

## Anatomie
Sentinelle invisible en fin de liste (`IntersectionObserver`) + indicateur de chargement (Spinner) + bouton « Réessayer » en cas d'échec.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | sentinelle | — | hauteur 1px, invisible | hauteur 1px, invisible |
| toutes | indicateur | `--mr-spacing-8` | 32px de zone | 32px de zone |
| toutes | écart liste/sentinelle | `--mr-stack-gap` | 12px | 8px |
| toutes | police d'annonce | `--mr-type-caption` | 12px / 16px | 12px / 16px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos (tout chargé) | transparent | `--mr-text-tertiary` | aucune | mention « Fin de liste » |
| unique | chargement | transparent | `--mr-text-secondary` | aucune | Spinner, `aria-busy="true"` |
| unique | erreur | transparent | `--mr-danger-text` | aucune | bouton « Réessayer » Button `secondary` sm |

## Comportement et clavier
- Sentinelle observée par `IntersectionObserver` : entrée visible → `onLoadMore`, une seule requête à la fois.
- Erreur : la sentinelle se désactive, le bouton « Réessayer » émet `onRetry`.
- Fin de collection (`hasMore=false`) : observation arrêtée, mention « Fin de liste ».
- Aucune animation, aucun style propre : seuls les tokens de la liste parente s'appliquent.

## Accessibilité
- Chargements annoncés en `aria-live="polite"` (« 20 éléments chargés, 60 au total »).
- Erreur : `role="alert"` + bouton « Réessayer » focusable.
- `aria-busy="true"` sur la collection pendant le chargement.
- Focus conservé : jamais déplacé par un chargement, jamais volé par la sentinelle.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `hasMore` | `boolean` | requis | page suivante disponible |
| `loading` | `boolean` | `false` | requête en cours (P1) |
| `children` | `ReactNode` | requis | éléments de la collection |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onLoadMore()` et `onRetry()` (API expérimentale, P1–P9 à vérifier en phase famille).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callbacks `onLoadMore`, `onRetry` actuels (migration §1 InfiniteScroll) | conservés (expérimental, P1–P9 à vérifier en phase famille) | non | migration-table §1 |
| recette infinite-scroll : 0 valeur en dur (inventory §2.1) | aucun style propre, tokens de la liste parente | non | inventory §2.1 |

## Critères de vérification
1. Sentinelle : 1px, invisible, en fin de liste, observée une seule fois.
2. Entrée visible : un seul `onLoadMore`, aucune requête doublée.
3. `hasMore=false` : observation arrêtée, mention « Fin de liste » `--mr-text-tertiary`.
4. Chargement : Spinner + `aria-busy="true"` sur la collection.
5. Erreur : `role="alert"`, bouton « Réessayer » Button `secondary` sm, émet `onRetry`.
6. Annonce : `aria-live="polite"` (« n éléments chargés, total m »).
7. Focus : jamais déplacé par un chargement.
8. Aucun style propre : aucun fond, aucune bordure, aucune ombre.

## Interdits
- Jamais de requête doublée : une seule à la fois, sentinelle désactivée en erreur.
- Jamais de déplacement du focus par un chargement.
- Jamais de style propre : tokens de la liste parente uniquement.
- Jamais de chargement infini sans fin annoncée : « Fin de liste » obligatoire.
