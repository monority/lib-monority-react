# SidebarLayout
Statut : spec v4 — à valider
Source : prompt maître §7.16

## Rôle
Structure de page à deux volets avec barre latérale fixe pour la navigation applicative hiérarchique et zone de contenu principale défilante. Choisir `Topbar` pour une disposition à navigation horizontale seule.

## Anatomie
`Conteneur global flex/grid → Barre latérale fixe (240px) avec navigation verticale → Zone de contenu principale (main)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | largeur barre latérale | `--mr-sidebar-width` | 240px | 240px |
| toutes | fond barre latérale | `--mr-bg-surface` | `#f8fbfb` (light) | `#151d20` (dark) |
| toutes | bordure séparatrice latérale | `--mr-border-subtle` | 1px solid | 1px solid |
| toutes | hauteur élément de navigation | `--mr-nav-item-height` | 32px | 32px |
| toutes | padding-inline élément de navigation | `--mr-spacing-3` | 12px | 12px |
| toutes | police élément nav | `--mr-type-small-strong` | 13px / 20px, 500, sans | 13px / 20px, 500, sans |
| toutes | rayon élément nav | `--mr-radius-control` | 6px | 6px |
| toutes | rail élément actif vertical | `--mr-rail-width` | 2px | 2px |
| toutes | retrait vertical du rail | `--mr-spacing-1` | 4px | 4px |
| toutes | padding de page principal | `--mr-page-padding` | 24px (16px sous 640px) | 24px (16px sous 640px) |
| toutes | largeur max contenu | `--mr-page-max-width` | 1440px | 1440px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| barre | permanente | `--mr-bg-surface` | — | bordure droite `--mr-border-subtle` | hauteur `100dvh` |
| élément nav | repos | transparent | `--mr-text-secondary` | transparent | pas de rail |
| élément nav | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | pas de rail, rayon 6px |
| élément nav | actif | transparent | `--mr-text-primary` | transparent | rail gauche 2px `--mr-accent`, retrait vertical 4px, `aria-current="page"` |
| élément nav | focus | repos | `--mr-text-primary` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px |
| élément nav | désactivé | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed` |

## Comportement et clavier
- La barre latérale reste fixe en hauteur complète (`100dvh`), le contenu principal défile indépendamment.
- Éléments de navigation verticaux : liens `<a href="..." aria-current="page">`.
- Sous 640px : la barre latérale bascule en tiroir escamotable (Drawer) ou se replie.
- Tabulation naturelle du haut vers le bas dans la navigation, puis vers le contenu principal.

## Accessibilité
- Structure : `<aside aria-label="Navigation secondaire">` et `<main>`.
- Élément de navigation actif : `aria-current="page"`.
- Cible interactive de chaque lien ≥ `--mr-min-target` (hauteur nav-item 32px).
- Séparateur vertical net via la bordure `--mr-border-subtle` sans ombre parasite.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `sidebar` | `ReactNode` | requis | contenu de la barre latérale |
| `children` | `ReactNode` | requis | contenu principal de page |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun callback propre au conteneur.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| élément actif sans rail gauche | rail gauche 2px `--mr-accent` (signature verticale, section 4, 7.16) | non (visuel) | section 4 |
| largeur barre arbitraire | normalisée sur `--mr-sidebar-width` (240px, 7.16) | non | section 7.16 |
| recette sidebar-layout : 1 valeur en dur signalée (inventory §2.1) | token `--mr-sidebar-width` (T2) | non | inventory §2.1 |

## Critères de vérification
1. largeur de la barre latérale : `inline-size` = 240px (`--mr-sidebar-width`).
2. fond barre latérale = `--mr-bg-surface` (`#f8fbfb` light), bordure séparatrice = 1px solid `--mr-border-subtle`.
3. élément de navigation actif : pseudo-élément rail gauche de 2px en `--mr-accent`, retrait vertical de 4px.
4. élément de navigation survolé : fond `--mr-bg-hover` (`#e8eef0` light), couleur `--mr-text-primary`, rayon 6px (`--mr-radius-control`).
5. lien actif doté de `aria-current="page"`.
6. hauteur d'élément de navigation = 32px (`--mr-nav-item-height`).
7. padding de page dans la zone principale = 24px (`--mr-page-padding`), 16px sous 640px.
8. largeur maximale de la zone de contenu = 1440px (`--mr-page-max-width`).

## Interdits
- Jamais d'aplat d'accent en fond d'élément actif (rail gauche uniquement).
- Jamais d'ombre séparatrice entre la barre et le contenu (bordure `--mr-border-subtle` exclusive).
- Pas de débordement horizontal causé par la disposition.
