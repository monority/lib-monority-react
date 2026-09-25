# Toolbar
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Groupe des contrôles d'action et de sélection (boutons, segments, champs) en barre quand ils s'appliquent à une zone. Retenir la FilterBar pour une composition de filtres et la Topbar pour la navigation applicative.

## Anatomie
Barre horizontale : groupes de contrôles séparés par des Divider verticaux, écart uniforme, débordement en défilement horizontal si nécessaire.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur minimale | `--mr-control-size-md` | 40px | 32px |
| toutes | écart entre contrôles | `--mr-control-gap` | 8px | 6px |
| toutes | écart entre groupes | `--mr-stack-gap` | 12px | 8px |
| toutes | séparateur de groupe | `--mr-border-width` | 1px | 1px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | transparent | hérité des contrôles | aucune | séparateurs `--mr-border-subtle` |
| unique | focus interne | transparent | hérité des contrôles | aucune | anneau de focus sur le contrôle actif uniquement (`:focus-visible`) |
| unique | désactivé | transparent | hérité des contrôles | aucune | groupe entier `aria-disabled`, aucun contrôle actionnable |

## Comportement et clavier
- Conteneur `role="toolbar"`, `aria-label` nommant la zone d'action.
- Navigation : `Flèche Gauche` / `Flèche Droite` déplace le focus entre contrôles, `Tab` sort de la barre.
- Groupes logiques reliés par `aria-labelledby` quand la barre mélange plusieurs fonctions.
- Débordement : défilement horizontal natif, sans bouton de navigation simulé.

## Accessibilité
- `role="toolbar"` + `aria-label` obligatoire ; groupes en `role="group"` + `aria-label`.
- Flèches réservées à la navigation interne, jamais détournées pour activer.
- Contrôles désactivés : `disabled` natif, jamais l'absence de gestionnaire seule.
- Contraste porté par chaque contrôle selon sa spec, jamais abaissé par la barre.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `aria-label` | `string` | requis | nom de la barre |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | axe de la barre |
| `as` | `'div' \| 'section'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | contrôles et groupes |
| `className` | `string` | — | fusion (P9) |

Aucun callback propre (les contrôles portent les leurs, P8).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| padding dédié `--mr-toolbar-padding` | écarts `--mr-control-gap` / `--mr-stack-gap` | non (visuel) | migration-table §2 |
| recette toolbar : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| barre sans `role="toolbar"` éventuelle | `role="toolbar"` + `aria-label`, flèches internes | non | prompt §7.18 |
| `as` ouvert éventuel | union fermée `div \| section` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Hauteur minimale : 40px en comfortable, 32px en compact.
2. Écarts : 8px entre contrôles (6px compact), 12px entre groupes (8px compact).
3. Conteneur : `role="toolbar"` + `aria-label` ; groupes : `role="group"`.
4. `Flèche Gauche` / `Flèche Droite` déplacent le focus, `Tab` sort de la barre.
5. Séparateurs : 1px `--mr-border-subtle`, verticaux, `role="separator"` + `aria-orientation`.
6. Débordement : défilement horizontal natif, aucun contenu inaccessible au clavier.
7. `as` : seules `div`, `section` acceptées.
8. Aucun fond, aucune bordure, aucune ombre sur la barre.

## Interdits
- Jamais de barre d'outils sans `aria-label`.
- Jamais de flèches qui activent au lieu de déplacer le focus.
- Jamais d'écart hors `--mr-control-gap` / `--mr-stack-gap`.
- Jamais de `as` hors union fermée, jamais de callback propre à la barre (P8).
