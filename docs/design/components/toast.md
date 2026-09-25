# Toast
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.10 surface)

## Rôle
Confirme une action ou signale un événement éphémère en bas à droite, sans interrompre la tâche. Retenir le Banner pour une annonce persistante et le Callout pour un message dans le flux.

## Anatomie
Carte flottante : rail gauche 2px du ton, icône 16px, titre `small-strong` + message `small` (ou message seul), fermeture IconButton `ghost` sm.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond et surface | `--mr-bg-overlay` | `#ffffff` light | `#ffffff` light |
| toutes | rayon | `--mr-radius-overlay` | 12px | 12px |
| toutes | ombre | `--mr-shadow-overlay` | double ombre douce | double ombre forte / aucune (oled, HC) |
| toutes | rail gauche | `--mr-rail-width` | 2px, `{ton}-text` | 2px, `{ton}-text` |
| toutes | icône | `--mr-icon-size-sm` | 16px | 16px |
| toutes | écart icône/texte | `--mr-control-gap` | 8px | 6px |
| toutes | padding | `--mr-spacing-4` | 16px | 16px |
| toutes | fermeture | `--mr-control-size-sm` | 32px | 28px |
| toutes | titre / message | `--mr-type-small-strong` / `--mr-type-small` | 13px / 20px | 13px / 20px |
| toutes | niveau | `--mr-z-toast` | 1300 | 1300 |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| neutral | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-text-secondary`, ombre `--mr-shadow-overlay` |
| accent | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-accent-text`, ombre `--mr-shadow-overlay` |
| success | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-success-text`, ombre `--mr-shadow-overlay` |
| warning | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-warning-text`, ombre `--mr-shadow-overlay` |
| danger | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-danger-text`, ombre `--mr-shadow-overlay` |
| info | unique | `--mr-bg-overlay` | `--mr-text-primary` | aucune | rail `--mr-info-text`, ombre `--mr-shadow-overlay` |
| toutes | survol / focus | `--mr-bg-overlay` | `--mr-text-primary` | aucune | minuterie en pause, aucune transformation |

## Comportement et clavier
- Position fixe en bas à droite, empilement vertical, un seul conteneur `aria-live`.
- Durée d'affichage par défaut 5 secondes ; pause de la minuterie au survol et au focus.
- Fermeture : IconButton `ghost` sm, `Escape` quand le focus est dans le toast, émet `onOpenChange(false)`.
- Apparition : `opacity` + `translateY(8px -> 0)` en `--mr-duration-base` / `--mr-ease-enter` ; disparition en `--mr-duration-fast` / `--mr-ease-exit`.
- Jamais de `transition: all`, jamais d'animation de dimension.

## Accessibilité
- Conteneur : `role="status"` (`aria-live="polite"`) ; erreur : `role="alert"`.
- Icône décorative en `aria-hidden="true"` ; le ton est doublé par le titre, jamais seul.
- Fermeture avec `aria-label` explicite ; le focus n'est jamais volé à l'apparition.
- Contraste : texte `--mr-text-primary` ≥ 7:1 sur `--mr-bg-overlay`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | ton (P1) |
| `title` | `string` | — | titre `small-strong` |
| `duration` | `number` | `5000` | durée en millisecondes |
| `children` | `ReactNode` | requis | message `small` |
| `open` | `boolean` | — | visibilité contrôlée (P5) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onOpenChange(open)` et `onClose` conservé comme alias (migration §1), futur événement `open-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callback `onClose` seul | `onOpenChange(false)` cible, `onClose` conservé en alias | non | migration-table §1 |
| recette toast : 4 valeurs en dur signalées (inventory §2.1) | `--mr-bg-overlay`, `--mr-radius-overlay`, `--mr-shadow-overlay`, `--mr-z-toast` (T2) | non | inventory §2.1 |
| position et durée locales éventuelles | bas à droite, 5 s, pause au survol et au focus | non (comportement) | prompt §7.18 |
| rail ou bordure colorée éventuelle | rail gauche 2px `{ton}-text` (section 4) | non (visuel) | prompt §7.18 |

## Critères de vérification
1. Fond : `--mr-bg-overlay` ; rayon 12px ; ombre `--mr-shadow-overlay` ; `z-index` = 1300.
2. Rail : 2px, `{ton}-text` du ton actif, côté gauche, rendu par pseudo-élément.
3. Icône : 16px × 16px `{ton}-text`, `aria-hidden="true"` ; écart icône/texte 8px (6px compact).
4. Titre 13px/20px 500, message 13px/20px `--mr-text-primary` ; padding 16px.
5. Position : bas à droite, empilement vertical dans un conteneur `aria-live` unique.
6. Durée : 5000ms par défaut, pause au survol et au focus, reprise au départ du pointeur.
7. Fermeture : IconButton `ghost` 32px (28px compact), `Escape` local, émet `onOpenChange(false)`.
8. Apparition : `opacity` + `translateY`, 180ms `--mr-ease-enter` ; disparition 120ms `--mr-ease-exit`.

## Interdits
- Jamais de vol de focus à l'apparition, jamais d'annonce sans conteneur live.
- Jamais de durée sans pause au survol et au focus.
- Jamais de bordure colorée : seul le rail porte le ton.
- Jamais d'ombre hors `--mr-shadow-overlay`, jamais de toast sans fermeture.
