# Topbar
Statut : spec v4 — à valider
Source : prompt maître §7.16

## Rôle
Barre supérieure de navigation et d'état persistante collée en haut d'écran. Choisir `SidebarLayout` pour une navigation arborescente profonde, `Menubar` pour une barre de menus d'application de bureau.

## Anatomie
`[Marque : carré brand-mark + nom] → Navigation horizontale avec rail actif → [Indicateur d'état dot + code] → Actions d'en-tête (profil, thème)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | block-size | `--mr-topbar-height` | 48px | 48px |
| toutes | padding-inline | `--mr-spacing-4` | 16px | 16px |
| toutes | fond | `--mr-bg-surface` | `#f8fbfb` (light) | `#151d20` (dark) |
| toutes | bordure inférieure | `--mr-border-subtle` | 1px solid | 1px solid |
| toutes | carré de marque | `--mr-brand-mark-size` | 24px × 24px | 24px × 24px |
| toutes | rayon marque | `--mr-radius-inline` | 4px | 4px |
| toutes | bordure marque | `--mr-border-default` | 1px solid | 1px solid |
| toutes | nom de marque | style label adapté | 11px / 16px, 600, mono, `--mr-text-primary` | 11px / 16px, 600, mono |
| toutes | hauteur élément nav | `--mr-nav-item-height` | 32px | 32px |
| toutes | padding-inline élément nav | `--mr-spacing-3` | 12px | 12px |
| toutes | police élément nav | `--mr-type-small-strong` | 13px / 20px, 500, sans | 13px / 20px, 500, sans |
| toutes | rayon élément nav | `--mr-radius-control` | 6px | 6px |
| toutes | rail élément actif | `--mr-rail-width` | 2px | 2px |
| toutes | point de statut | `--mr-status-dot-size` | 8px | 8px |
| toutes | texte de statut | `--mr-type-code-sm` | 12px / 16px, 400, mono | 12px / 16px, 400, mono |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| barre | fixe / sticky | `--mr-bg-surface` | — | bordure inférieure `--mr-border-subtle` | `position: sticky; top: 0; z-index: var(--mr-z-sticky)` |
| élément nav | repos | transparent | `--mr-text-secondary` | transparent | pas de rail |
| élément nav | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | rayon 6px, pas de rail |
| élément nav | actif | transparent | `--mr-text-primary` | transparent | rail inférieur 2px `--mr-accent` aligné sur la bordure inférieure de la barre |
| élément nav | focus | repos | `--mr-text-primary` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px |
| statut | selon ton | transparent | texte `{ton}-text` | — | point fond `{ton}-text`, rayon 9999px |

## Comportement et clavier
- Barre collante en haut d'écran (`position: sticky`, `top: 0`, `z-index: var(--mr-z-sticky)` = 100).
- Éléments de navigation : liens `<a href="..." aria-current="page">` ; un élément sans destination n'est pas un lien.
- Survol avec transition `color` et `background-color` en `--mr-duration-fast` / `--mr-ease-standard`.
- Clavier : tabulation standard entre liens et contrôles d'action.

## Accessibilité
- Élément `<header>` ou `<nav aria-label="Navigation principale">`.
- Élément de page active : `aria-current="page"`.
- Indicateur de statut : rôle d'état consultatif avec libellé textuel associé (la couleur du point n'est jamais seule).
- Cible interactive de chaque lien ≥ `--mr-min-target` (hauteur nav-item 32px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `brandMark` | `ReactNode` | — | glyphe ou logo dans le carré de marque |
| `brandName` | `string` | — | nom du produit en Geist Mono 600 |
| `navigation` | `Array<{ label: ReactNode, href: string, active?: boolean }>` | — | liens de navigation principale |
| `status` | `{ tone: 'success' \| 'warning' \| 'danger' \| 'info', label: string }` | — | indicateur d'état système |
| `actions` | `ReactNode` | — | contrôles à droite (bouton de thème, profil) |
| `className` | `string` | — | fusion de classe (P9) |
| `children` | `ReactNode` | — | contenu personnalisé libre |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| élément actif sans rail aligné | rail inférieur de 2px en `--mr-accent` calé sur la bordure inférieure (signature, 7.16) | non (visuel) | section 4 |
| nom de marque en police variable standard | style label en Geist Mono 600 majuscules `--mr-text-primary` (7.16) | non (visuel) | section 7.16 |
| recette topbar : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-topbar-height`, `--mr-brand-mark-size`, `--mr-status-dot-size` (T2) | non | inventory §2.1 |

## Critères de vérification
1. hauteur de la barre : `block-size` = 48px (`--mr-topbar-height`).
2. padding horizontal = 16px (`--mr-spacing-4`).
3. fond = `--mr-bg-surface` (`#f8fbfb` light), bordure inférieure = 1px solid `--mr-border-subtle` (`#dde4e6` light).
4. carré de marque : 24px × 24px (`--mr-brand-mark-size`), rayon 4px (`--mr-radius-inline`), bordure `--mr-border-default`.
5. nom de marque : police mono, taille = 11px, graisse = 600, couleur `--mr-text-primary`.
6. lien de navigation actif : pseudo-élément rail inférieur de 2px en `--mr-accent` aligné sur le bas de barre, `aria-current="page"`.
7. lien survolé : fond `--mr-bg-hover` (`#e8eef0` light), couleur `--mr-text-primary`, rayon 6px (`--mr-radius-control`).
8. point de statut : diamètre 8px (`--mr-status-dot-size`), rayon 9999px, couleur assortie au texte `{ton}-text`.
9. `position` = `sticky`, `top` = 0px, `z-index` = 100 (`--mr-z-sticky`).

## Interdits
- Jamais de lien de navigation sans destination `href` (un élément statique n'est pas un lien).
- Jamais de statut reposant uniquement sur le point coloré sans libellé textuel.
- Jamais d'aplat d'accent en fond de lien de navigation actif (rail d'accent inférieur obligatoire).
- Pas de masquage de la bordure inférieure séparatrice.
