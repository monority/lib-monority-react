# HoverCard
Statut : spec v4 — à valider
Source : prompt maître §7.10

## Rôle
Panneau flottant d'aperçu enrichi déclenché au survol ou au focus d'un lien ou d'un nom d'utilisateur (carte de profil, prévisualisation de ressource). Choisir `Tooltip` pour un libellé d'aide textuel court non interactif, `Popover` pour une interaction directe au clic.

## Anatomie
`Déclencheur (lien ou bouton) → Panneau flottant sans flèche avec fond overlay, bordure et ombre douce → Contenu enrichi arbitraire`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond panneau | `--mr-bg-overlay` | `#ffffff` (light) | `#ffffff` (light) |
| toutes | bordure panneau | `--mr-border-default` | 1px solid | 1px solid |
| toutes | rayon panneau | `--mr-radius-overlay` | 12px | 12px |
| toutes | padding panneau | `--mr-spacing-4` | 16px | 12px |
| toutes | ombre panneau | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | largeur minimale | `--mr-menu-min-width` | 180px | 180px |
| toutes | largeur maximale | `--mr-menu-max-width` | 320px | 320px |
| toutes | écart déclencheur/panneau | `--mr-popover-offset` | 6px | 6px |
| toutes | délai d'ouverture | `--mr-hover-card-delay` | 200ms | 200ms |

Décision issue de l'audit (phase 0 bis) : la HoverCard est sans flèche, sans remplacement (S8).

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | fermé | — | — | — | panneau masqué |
| standard | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | ombre `--mr-shadow-overlay`, couche `popover` |

## Comportement et clavier
- Déclencheur survolé : ouverture automatique après un délai de `--mr-hover-card-delay` (200ms).
- Déclencheur focusé : ouverture immédiate au focus clavier.
- Le panneau reste ouvert tant que le pointeur survole le déclencheur ou pénètre à l'intérieur de la carte elle-même.
- Déplacement du pointeur hors de la zone combinée : fermeture après un court délai de grâce (150ms).
- Touche `Escape` : referme immédiatement la carte et conserve le focus sur le déclencheur.
- Apparition : `opacity` + `scale(0.98 -> 1)` en `--mr-duration-base` (180ms) / `--mr-ease-enter` ; disparition en `--mr-duration-fast` (120ms) / `--mr-ease-exit`.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Le déclencheur reste interactif et actionnable (ex. lien `<a>` vers le profil complet).
- Conteneur de carte : relié par `aria-describedby` si descriptif, ou consultative sans obstruction.
- Focus : l'ouverture au focus clavier permet aux utilisateurs sans souris d'accéder à l'information sans cliquer.
- `Escape` referme la carte et restitue le focus si nécessaire.
- Couche native `popover` (zéro `createPortal`).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `children` | `ReactNode` | requis | déclencheur |
| `content` | `ReactNode` | requis | contenu riche de la carte |
| `open` | `boolean` | — | ouverture contrôlée (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale non contrôlée (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `delay` | `number` | `200` | délai avant ouverture au survol (ms) |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'top-start' \| 'top-end' \| 'bottom-start' \| 'bottom-end'` | `'bottom-start'` | ancrage |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| tokens non définis `--mr-hovercard-arrow-left` et `--mr-hovercard-arrow-top` (inventory §2.1) | supprimés : HoverCard sans flèche (décision audit phase 0 bis, S8) | non | inventory §2.1 / S8 |
| portail JavaScript custom | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |
| ouverture survol seul dans certains cas | ouverture aussi au focus clavier (7.10) | non (accessibilité) | section 7.10 |
| recette hover-card : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-radius-overlay`, `--mr-hover-card-delay` (T2) | non | inventory §2.1 |

## Critères de vérification
1. panneau : fond = `--mr-bg-overlay` (`#ffffff` light), bordure = `--mr-border-default` (`#ccd4d7` light).
2. `border-radius` du panneau = 12px (`--mr-radius-overlay`).
3. ombre = `--mr-shadow-overlay`.
4. absence totale de flèche géométrique ou de pseudo-élément flèche (décision audit S8).
5. ouverture au survol après un délai de 200ms (`--mr-hover-card-delay`).
6. ouverture immédiate dès la prise de focus clavier sur le déclencheur.
7. le panneau reste affiché lorsque la souris quitte le déclencheur pour entrer dans la carte.
8. touche `Escape` referme immédiatement la carte.
9. décalage d'ancrage = 6px (`--mr-popover-offset`).

## Interdits
- Jamais de flèche décorative sur la HoverCard (S8).
- Jamais d'ouverture uniquement au survol de la souris (le focus clavier doit ouvrir la carte).
- Jamais de `createPortal` (couche `popover` native obligatoire).
- Jamais de contenu indispensable qui ne serait pas présent sur la page cible du lien déclencheur.
