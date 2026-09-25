# Tooltip
Statut : spec v4 — à valider
Source : prompt maître §7.11

## Rôle
Bulle d'aide textuelle courte affichée au survol ou au focus d'un contrôle interactif. Choisir `HoverCard` pour du contenu enrichi ou interactif, `Popover` pour un formulaire contextuel.

## Anatomie
`Déclencheur (bouton ou icône) → Bulle d'aide textuelle flottante inversée sans flèche`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond | `--mr-tooltip-bg` | `#192426` (light) | `#e4e9ea` (dark) |
| toutes | texte | `--mr-tooltip-text` | `#f2f6f7` (light) | `#101719` (dark) |
| toutes | police | `--mr-type-caption` | 12px / 16px, 400, sans | 12px / 16px, 400, sans |
| toutes | padding-block | `--mr-spacing-1` | 4px | 4px |
| toutes | padding-inline | `--mr-spacing-2` | 8px | 8px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | max-inline-size | `--mr-tooltip-max-width` | 240px | 240px |
| toutes | décalage | `--mr-tooltip-offset` | 6px | 6px |
| toutes | ombre | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | délai survol | `--mr-tooltip-delay` | 300ms | 300ms |

Thème inversé : fond sombre en thème clair, fond clair en thème sombre (5.3, 5.4).

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| standard | fermé | — | — | — | bulle masquée |
| standard | ouvert | `--mr-tooltip-bg` | `--mr-tooltip-text` | transparent | ombre `--mr-shadow-overlay`, sans flèche |

## Comportement et clavier
- Survol du déclencheur : apparition après un délai de `--mr-tooltip-delay` (300ms).
- Focus clavier du déclencheur : apparition immédiate (aucun délai).
- Fermeture immédiate dès que le pointeur quitte à la fois le déclencheur et la bulle.
- Reste affiché tant que le pointeur survole la surface de la bulle d'aide.
- Touche `Escape` : referme immédiatement la bulle sans perdre le focus du déclencheur.
- Apparition : transition d'opacité et de translation `opacity: 0 -> 1` et `transform: translateY(4px) -> translateY(0)` sur `--mr-duration-fast` (120ms) avec la courbe `--mr-ease-enter`.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-tooltip-offset` (8px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- `role="tooltip"`, `id` relié au déclencheur par `aria-describedby`.
- Si le déclencheur est une icône seule sans libellé textuel, préférer `aria-label` sur le contrôle en complément du tooltip.
- Jamais d'information indispensable ni vitale dans un tooltip.
- Utilise l'attribut `popover="manual"` pour éviter de fermer d'autres popovers ouverts.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `content` | `ReactNode` | requis | texte d'aide de la bulle |
| `children` | `ReactNode` | requis | déclencheur interactif |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'` | `'top'` | position relative |
| `delay` | `number` | `300` | délai avant affichage au survol (ms) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun callback maison nécessaire.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| infobulle gérée en CSS pur (hover/focus-within) | couche native `popover="manual"` avec JS d'ancrage (7.11, conventions) | non | conventions obsolètes |
| fond teinté sur `--mr-bg-inverse` | normalisé sur `--mr-tooltip-bg` et `--mr-tooltip-text` (5.3, 5.16) | non (visuel) | migration-table §2 |
| présence d'une flèche SVG ou CSS | bulle sans flèche (7.11) | non (visuel) | section 7.11 |
| recette tooltip : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-tooltip-*`, `--mr-radius-control` (T2) | non | inventory §2.1 |

## Critères de vérification
1. fond de la bulle en light = `--mr-tooltip-bg` (`#192426` light), texte = `--mr-tooltip-text` (`#f2f6f7` light).
2. police : `font-size` = 12px, `line-height` = 16px, `font-weight` = 400 (`--mr-type-caption`).
3. padding : 4px vertical (`--mr-spacing-1`), 8px horizontal (`--mr-spacing-2`).
4. `border-radius` = 6px (`--mr-radius-control`).
5. `max-inline-size` = 240px (`--mr-tooltip-max-width`).
6. décalage par rapport au déclencheur = 6px (`--mr-tooltip-offset`).
7. absence totale de flèche triangulaire (bulle épurée sans flèche).
8. ouverture après 300ms au survol souris (`--mr-tooltip-delay`).
9. ouverture immédiate au focus clavier sans aucun délai.
10. `Escape` ferme immédiatement la bulle sans déplacer le focus.
11. `role="tooltip"` présent avec id relié au déclencheur via `aria-describedby`.

## Interdits
- Jamais de contenu interactif (lien, bouton) à l'intérieur d'un Tooltip.
- Jamais d'information essentielle ou bloquante (l'interface doit rester compréhensible sans le Tooltip).
- Jamais de flèche géométrique décorative.
- Jamais d'opacité au désactivé du déclencheur qui masquerait la bulle.
