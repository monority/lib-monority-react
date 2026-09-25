# Drawer
Statut : spec v4 — à valider
Source : prompt maître §7.12

## Rôle
Panneau coulissant ancré au bord de l'écran pour des flux longs d'édition, de filtres détaillés ou d'inspection. Choisir `Modal` pour une tâche courte et centrée, `SidebarLayout` pour la navigation principale de l'application.

## Anatomie
`Voile (::backdrop) → Panneau coulissant pleine hauteur (ou pleine largeur si bottom) → En-tête (titre h2 + description + bouton fermeture) → Corps défilant → Pied d'actions`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| md | inline-size (start / end) | `--mr-drawer-width-md` | 400px | 400px |
| lg | inline-size (start / end) | `--mr-drawer-width-lg` | 560px | 560px |
| bottom | max-block-size | `calc(100dvh - 64px)` | 100dvh − 64px | 100dvh − 64px |
| toutes | block-size (start / end) | `100dvh` | pleine hauteur | pleine hauteur |
| toutes | border-radius bord intérieur | `--mr-radius-overlay` | 12px | 12px |
| toutes | border-radius bords d'écran | `0` | 0px | 0px |
| toutes | padding panneau | `--mr-spacing-6` | 24px | 24px |
| toutes | bordure bord intérieur | `--mr-border-default` | 1px solid | 1px solid |
| toutes | ombre panneau | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | voile | `--mr-scrim` | neutre 40 % (light) | noir 60 % (dark) |

Rayon `overlay` (12px) sur le bord intérieur uniquement : côté `end` = arrondi sur le bord gauche (`border-start-start-radius` et `border-end-start-radius`) ; côté `start` = arrondi sur le bord droit ; côté `bottom` = arrondi sur le bord supérieur.

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| panneau | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | bord intérieur `--mr-border-default` | voile `--mr-scrim`, ombre `--mr-shadow-overlay` |
| panneau | fermeture | `--mr-bg-overlay` | `--mr-text-primary` | bord intérieur `--mr-border-default` | translation vers l'extérieur en `--mr-duration-fast` |

## Comportement et clavier
- Ouvert via `.showModal()` sur un élément `<dialog>` natif (sans portail).
- Apparition : translation depuis le bord d'ancrage (`transform: translateX(100% -> 0)` pour `end`) sur `--mr-duration-slow` (240ms) avec la courbe `--mr-ease-enter` (remplace l'ancien délai fixe arbitraire de 200ms du Drawer).
- Disparition : translation inverse sur `--mr-duration-fast` (120ms) avec `--mr-ease-exit`.
- Touche `Escape` : referme le panneau et restitue le focus au déclencheur.
- Clic sur le voile `::backdrop` referme le tiroir.
- Piège de focus natif assuré par le dialogue.

## Accessibilité
- Élément `<dialog>` natif, `aria-labelledby` relié au titre h2, `aria-describedby` à la description.
- Restitution automatique du focus au déclencheur à la fermeture.
- Bouton de fermeture d'en-tête (IconButton ghost sm) avec `aria-label="Fermer"`.
- Défilement interne indépendant du corps de page.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `open` | `boolean` | — | état d'ouverture contrôlé (P5) |
| `defaultOpen` | `boolean` | `false` | état initial non contrôlé (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `side` | `'start' \| 'end' \| 'bottom'` | `'end'` | bord d'ancrage à l'écran |
| `size` | `'md' \| 'lg'` | `'md'` | largeur du panneau latéral |
| `title` | `ReactNode` | requis | titre h2 |
| `description` | `ReactNode` | — | texte d'aide |
| `footer` | `ReactNode` | — | actions en pied de panneau |
| `children` | `ReactNode` | requis | contenu défilant |
| `className` | `string` | — | fusion de classe (P9) |

Le callback `onClose` est déprécié au profit de `onOpenChange(false)` (7.12).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onClose` sur Drawer (types / inventory) | `onOpenChange(false)` (7.12, P6) | oui | ligne Drawer |
| délai fixe JS arbitraire de 200ms | transition CSS fluide `--mr-duration-slow` (240ms) / `--mr-ease-enter` (7.12) | non (animation) | section 7.12 |
| portail JavaScript via `createPortal` | élément `<dialog>` natif avec `.showModal()` (3, C6) | non | section 3 |
| recette drawer : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-drawer-width-*`, `--mr-spacing-6` (T2) | non | inventory §2.1 |

## Critères de vérification
1. Drawer md : `inline-size` = 400px (`--mr-drawer-width-md`) ; lg : 560px (`--mr-drawer-width-lg`).
2. pleine hauteur d'écran (`block-size` = `100dvh`).
3. rayon `overlay` (12px) appliqué uniquement sur le bord intérieur (côté d'écran à 0px).
4. élément racine = `<dialog>` natif sans aucun `createPortal`.
5. apparition : translation depuis le bord sur `--mr-duration-slow` (240ms), courbe `--mr-ease-enter`.
6. disparition : translation inverse sur `--mr-duration-fast` (120ms), courbe `--mr-ease-exit`.
7. voile `::backdrop` avec fond `--mr-scrim`.
8. `Escape` referme le tiroir et redonne le focus au déclencheur.
9. corps interne défilant si le contenu dépasse la hauteur d'écran.

## Interdits
- Jamais de délai fixe en JavaScript (les transitions sont régies par les tokens CSS de durée).
- Jamais de `createPortal`.
- Jamais d'arrondi sur les bords extérieurs plaqués contre l'écran.
- Pas de perte de focus à la fermeture.
