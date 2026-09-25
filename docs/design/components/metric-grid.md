# MetricGrid
Statut : spec v4 — à valider
Source : prompt maître §7.14

## Rôle
Grille de disposition responsive pour cartes de métriques (`StatCard`). Choisir `Grid` pour une mise en page d'éléments hétérogènes.

## Anatomie
`Conteneur en grille CSS (display: grid) → Cartes StatCard enfants alignées`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart de grille | `--mr-grid-gap` | 16px | 12px |
| toutes | nombre de colonnes | responsive (aucune prop) | 1 à 4 selon la largeur disponible | 1 à 4 selon la largeur disponible |

Points de rupture : 1 colonne sous 640px, 2 colonnes de 640px à 1100px, jusqu'à 4 colonnes au-dessus de 1100px (5.14).

## États
Composant de mise en page structurel non interactif.

| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| standard | repos | transparent | — | — | grille neutre |

## Comportement et clavier
- Disposition purement structurelle en CSS Grid.
- Aucun comportement clavier propre ; la tabulation traverse les cartes enfants selon l'ordre naturel du document.

## Accessibilité
- Rôle sémantique neutre `<div>` ou `<section>` étiquetée.
- Pas de restriction d'accessibilité.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `MetricGridItem[]` (`StatCardProps` + `key`) | — | cartes de métriques (API pilotée par données, P2) |
| `className` | `string` | — | fusion de classe (P9) |

Le composant accepte également les attributs HTML natifs d'un `<div>` (P9). Aucune prop de nombre de colonnes : la répartition est responsive (7.14).

Callbacks : aucun.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| API pilotée par données `items` (MetricGrid.types.ts) | conservée (P2, règle de conservation) | non | ligne MetricGrid |
| recette metric-grid : 2 valeurs en dur signalées (inventory §2.1) | token `--mr-grid-gap` (16px / compact 12px) (T2) | non | inventory §2.1 |
| points de rupture de la grille | alignés sur les breakpoints système 640px et 1100px (5.14) | non (visuel) | section 5.14 |

## Critères de vérification
1. écart de grille : `gap` = 16px en comfortable, 12px en compact (`--mr-grid-gap`).
2. disposition CSS : `display: grid`.
3. au-dessus de 1100px : jusqu'à 4 colonnes égales (`repeat(N, minmax(0, 1fr))`, N ≤ 4) selon la largeur disponible.
4. sous 640px : passage automatique sur 1 colonne pour éviter tout écrasement de contenu.
5. fond transparent sans bordure ni ombre propre.

## Interdits
- Jamais d'éléments hétérogènes d'autres familles brisant l'alignement des StatCard.
- Jamais d'espacement en dur hors token `--mr-grid-gap`.
- Pas de débordement horizontal sous 320px de largeur d'écran.
