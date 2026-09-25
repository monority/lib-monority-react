# FilterBar
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base Toolbar + §7.5 / §7.6)

## Rôle
Combine recherche, sélections et actions pour filtrer une collection quand les contrôles isolés ne suffisent pas. Composition uniquement : aucune logique propre, aucun style propre hors écarts.

## Anatomie
Toolbar nommée : champ de recherche (7.5), un ou plusieurs Select (7.6), boutons d'action (`secondary`, `ghost`), compteur de résultats en `caption`, réinitialisation explicite.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart entre contrôles | `--mr-control-gap` | 8px | 6px |
| toutes | écart entre groupes | `--mr-stack-gap` | 12px | 8px |
| toutes | hauteur des contrôles | `--mr-control-size-md` | 40px | 32px |
| toutes | compteur | `--mr-type-caption` | 12px / 16px, `--mr-text-secondary` | 12px / 16px, `--mr-text-secondary` |

Chaque contrôle suit sa spec (7.5, 7.6, 7.1) ; la barre suit la spec Toolbar.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | sans filtre | transparent | compteur `--mr-text-secondary` | aucune | réinitialisation masquée |
| unique | filtré | transparent | compteur `--mr-text-primary` | aucune | réinitialisation visible (« Réinitialiser (n) ») |
| unique | chargement | transparent | compteur `--mr-text-secondary` | aucune | contrôles non désactivés, `aria-busy="true"` sur la collection |

## Comportement et clavier
- Composition uniquement : chaque contrôle émet son propre callback (7.5, 7.6) ; la barre agrège en une valeur `{ search, filtres, tri }` via `onValueChange`.
- Réinitialisation : restaure les défauts de chaque contrôle et émet la valeur vide.
- Navigation clavier : Toolbar (`role="toolbar"`, flèches entre contrôles, `Tab` pour sortir).
- Filtrage : appliqué par le parent (données locales ou requête) ; la barre ne filtre jamais elle-même (P8).

## Accessibilité
- Conteneur : `role="toolbar"`, `aria-label` (« Filtrer … ») ; contrôles étiquetés selon leurs specs.
- Compteur : `aria-live="polite"` (« 12 résultats », « aucun résultat »).
- Aucun résultat : la collection affiche son EmptyState, la barre conserve le focus.
- `aria-busy="true"` sur la collection pendant le chargement, jamais sur la barre.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `{ search?: string, filters?: Record<string, string>, sort?: string }` | — | état agrégé contrôlé (P5) |
| `defaultValue` | `object` | `{}` | état initial |
| `aria-label` | `string` | `'Filtrer'` | nom de la barre |
| `children` | `ReactNode` | requis | contrôles 7.5 / 7.6 / 7.1 |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(état)` et futur événement DOM `value-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| recette filter-bar : 3 valeurs en dur signalées (inventory §2.1) | écarts `--mr-control-gap` / `--mr-stack-gap`, contrôles selon leurs specs (T2) | non | inventory §2.1 |
| logique de filtrage interne éventuelle | composition uniquement, filtrage par le parent (P8) | oui (comportement) | prompt §7.18 |
| compteur sans annonce éventuel | compteur `caption` + `aria-live="polite"` | non | prompt §7.18 |
| callbacks actuels sans cible nommée | `onValueChange` + événement `value-change` (P6) | non | migration-table §1 |

## Critères de vérification
1. Écarts : 8px entre contrôles (6px compact), 12px entre groupes (8px compact).
2. Contrôles : hauteurs 40px (32px compact), chacun conforme à sa spec (7.5, 7.6, 7.1).
3. Valeur agrégée : `{ search, filters, sort }`, émise par `onValueChange` à chaque changement.
4. Réinitialisation : visible uniquement si filtré, libellée « Réinitialiser (n) », restaure les défauts.
5. Conteneur : `role="toolbar"` + `aria-label` ; flèches internes, `Tab` sortant.
6. Compteur : 12px/16px `--mr-text-secondary`, `aria-live="polite"`, synchronisé avec la collection.
7. Aucun résultat : EmptyState de la collection, focus conservé dans la barre.
8. Chargement : `aria-busy="true"` sur la collection, contrôles utilisables.

## Interdits
- Jamais de logique de filtrage interne : composition et agrégation uniquement (P8).
- Jamais de contrôle hors specs 7.5 / 7.6 / 7.1 dans la barre.
- Jamais de compteur sans `aria-live`, jamais de réinitialisation sans compteur.
- Jamais de style propre hors écarts : Toolbar + specs des contrôles.
