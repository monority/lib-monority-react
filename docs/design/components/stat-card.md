# StatCard
Statut : spec v4 — à valider
Source : prompt maître §7.14

## Rôle
Carte spécialisée pour l'affichage synthétique d'une métrique clé avec valeur numérique mise en avant, unité, indicateur d'évolution et mini-graphique d'historique. Choisir `Card` pour du contenu libre.

## Anatomie
`[Rangée supérieure : label instrument + Badge sm d'évolution] → [Rangée métrique : valeur numérique display + unité sur la ligne de base] → [Mini-graphique en barres] → [Description / légende small]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond | `--mr-bg-surface` | `#f8fbfb` (light) | `#151d20` (dark) |
| toutes | bordure | `--mr-border-subtle` | 1px solid | 1px solid |
| toutes | border-radius | `--mr-radius-card` | 10px | 10px |
| toutes | padding carte | `--mr-card-padding` | 20px | 16px |
| toutes | label instrument | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| toutes | valeur métrique | `--mr-type-data-lg` | 32px / 40px, 600, sans | 32px / 40px, 600, sans |
| toutes | unité | `--mr-type-code` | 13px / 20px, 400, mono | 13px / 20px, 400, mono |
| toutes | écart valeur ↔ unité | `--mr-spacing-1` | 4px | 4px |
| toutes | hauteur mini-graphique | `--mr-metric-chart-height` | 32px | 32px |
| toutes | écart entre barres graphique | `--mr-spacing-1` | 4px | 4px |
| toutes | description | `--mr-type-small` | 13px / 20px, 400, sans | 13px / 20px, 400, sans |

## États
Composant d'affichage non interactif (ou variante interactive héritée de Card si cliquable).

| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-surface` | valeur `--mr-text-primary`, unité `--mr-text-secondary` | `--mr-border-subtle` | aucune ombre |
| squelette | chargement | `--mr-bg-surface` | pavés Skeleton en pulsation | `--mr-border-subtle` | `aria-busy="true"` |

Mini-graphique : barres neutres en `--mr-chart-muted`, dernière barre ou barre mise en avant en `--mr-accent`.

## Comportement et clavier
- Affichage passif : aucun comportement clavier direct (sauf si intégrée comme carte interactive).
- Mini-graphique : purement illustratif, sans interaction souris, doté de `aria-hidden="true"`.
- Calcul du badge de variation : si `trend="up"` et `favorable="up"`, Badge `tone="success"` ; si `trend="down"` et `favorable="up"`, Badge `tone="danger"` ; si `flat`, Badge `tone="neutral"`.

## Accessibilité
- Valeur numérique : voix humaine Geist sans avec `tabular-nums` et interlettrage `--mr-tracking-display`.
- Unité sur la ligne de base en voix système mono.
- Mini-graphique décoratif : `aria-hidden="true"`.
- L'évolution (`delta`) est toujours accompagnée d'un texte clair (« +4.8 % ») dans le badge, jamais de couleur seule.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `ReactNode` | requis | label instrument supérieur |
| `value` | `string \| number` | requis | valeur principale de la métrique |
| `unit` | `string` | — | unité (%, ms, req/s) sur la ligne de base |
| `delta` | `string` | — | texte de variation affiché dans le badge |
| `trend` | `'up' \| 'down' \| 'flat'` | — | orientation de la variation |
| `favorable` | `'up' \| 'down'` | `'up'` | sens favorable pour la couleur du badge |
| `chart` | `number[]` | — | série de valeurs pour le mini-graphique |
| `description` | `ReactNode` | — | légende explicative sous la métrique |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `trendTone` dans les types (StatCard.types.ts) | déduite automatiquement de `trend` et `favorable` (P8, 7.14) | oui | ligne StatCard |
| chiffres parfois formatés en police mono | voix humaine sans empattement obligatoire avec `tabular-nums` (section 4, 7.14) | non (visuel) | section 4 |
| recette stat-card : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-metric-chart-height`, `--mr-chart-muted` (T2) | non | inventory §2.1 |

## Critères de vérification
1. valeur métrique : police sans empattement, taille = 32px, interligne = 40px, graisse = 600 (`--mr-type-data-lg`), `tabular-nums`.
2. unité : police mono, taille = 13px, graisse = 400 (`--mr-type-code`), alignée sur la ligne de base de la valeur.
3. label supérieur : police mono, taille = 11px, graisse = 500, majuscules (`--mr-type-label`).
4. variation : Badge sm `success` ou `danger` ou `neutral` positionné à droite du label.
5. mini-graphique : hauteur fixe de 32px (`--mr-metric-chart-height`), écart de 4px entre barres (`--mr-spacing-1`).
6. barres du graphique : fond `--mr-chart-muted` (`#ccd4d7` light), barre mise en avant `--mr-accent` (`#07787d` light), sans aucun arrondi.
7. fond de carte = `--mr-bg-surface` (`#f8fbfb` light), bordure = 1px solid `--mr-border-subtle`.
8. absence totale d'ombre (`box-shadow: none`).

## Interdits
- Jamais de chiffres de métrique en police mono (le point décimal mono crée un trou visuel, section 4).
- Jamais de Badge `accent` pour une variation chiffrée (favorable = `success`, défavorable = `danger`).
- Jamais d'ombre sur la StatCard.
- Jamais de mini-graphique accessible sans `aria-hidden="true"`.
