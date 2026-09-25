# DatePicker
Statut : spec v4 — à valider
Source : prompt maître §7.18 (déclencheur §7.6, surface §7.10)

## Rôle
Saisit ou choisit une date unique dans un formulaire quand le calendrier seul ne suffit pas. Retenir le DateRangePicker pour une période et le Calendar pour un mois affiché en place.

## Anatomie
Déclencheur comme un champ de saisie (icône calendrier 16px, chevron comme le Select) ; surface flottante : Calendar du mois courant, effacement facultatif.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur déclencheur | `--mr-control-size-md` | 40px | 32px |
| toutes | rayon déclencheur | `--mr-radius-control` | 6px | 6px |
| toutes | bordure déclencheur | `--mr-border-control` | 1px | 1px |
| toutes | icône / chevron | `--mr-icon-size-md` | 16px | 16px |
| toutes | surface | `--mr-bg-overlay` | `#ffffff` light | `#ffffff` light |
| toutes | rayon surface | `--mr-radius-overlay` | 12px | 12px |
| toutes | ombre surface | `--mr-shadow-overlay` | double ombre douce | double ombre forte / aucune (oled, HC) |
| toutes | écart déclencheur/surface | `--mr-popover-offset` | 4px | 4px |
| toutes | cellule jour | `--mr-calendar-cell-size` | 32px | 28px |
| toutes | police déclencheur | `--mr-type-small` | 13px / 20px | 13px / 20px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| déclencheur | repos | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-control` | icône `--mr-text-tertiary` |
| déclencheur | survol | `--mr-bg-hover` | `--mr-text-primary` | `--mr-border-control` | aucune transformation |
| déclencheur | focus | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-control` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)` sur `:focus-visible` |
| déclencheur | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed` |
| déclencheur | invalide | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-danger-text` | message lié par `aria-describedby` |
| déclencheur | lecture seule | transparent | `--mr-text-primary` | `--mr-border-subtle` | pas de survol, focusable |
| surface | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | aucune | ombre `--mr-shadow-overlay` |

## Comportement et clavier
- Saisie manuelle au format local + choix au calendrier ; les deux voies émettent `onValueChange`.
- Clic ou `Flèche Bas` ouvre la surface ; `Enter` valide le jour actif, `Escape` referme et rend le focus au champ.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).
- Apparition : `opacity` + `scale(0.98 -> 1)` en `--mr-duration-base` / `--mr-ease-enter` ; disparition en `--mr-duration-fast` / `--mr-ease-exit`.
- Participe au formulaire natif : soumission, validation, reset (P4).

## Accessibilité
- Champ : `role="combobox"`, `aria-expanded="true | false"`, `aria-controls` vers la surface, `aria-describedby` pour l'aide et l'erreur.
- Surface : `role="dialog"`, `aria-label` « Choisir une date » ; grille du Calendar selon sa spec.
- Date invalide : `aria-invalid="true"`, message d'erreur en texte, jamais la bordure seule.
- `Escape` géré nativement par la couche `popover` ou `dialog`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `string` (ISO) | — | date sélectionnée (contrôlé, P5) |
| `defaultValue` | `string` (ISO) | — | date initiale |
| `placeholder` | `string` | — | exemple de format |
| `disabled` | `boolean` | `false` | champ inactif (P1) |
| `invalid` | `boolean` | `false` | état d'erreur (P1) |
| `readOnly` | `boolean` | `false` | lecture seule (P1) |
| `required` | `boolean` | `false` | validation native (P4) |
| `name` | `string` | — | nom de soumission (P4) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(isoDate)` et futur événement DOM `value-change` (P6). `onChange` réservé au natif.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callback `onChange` (migration §1 DatePicker) | `onValueChange` + événement `value-change` (P6) | oui | migration-table §1 |
| largeurs et écart dédiés `--mr-overlay-width-popover`, `--mr-overlay-offset` | surface calée sur la grille du Calendar, écart `--mr-popover-offset` | non (visuel) | migration-table §2 |
| recette date-picker : 5 valeurs en dur signalées (inventory §2.1) | `--mr-control-size-md`, `--mr-radius-control`, `--mr-calendar-cell-size` (T2) | non | inventory §2.1 |
| positionnement local éventuel | utilitaire `packages/ui/src/internal/position` (décision phase 1b) | non | language.md (phase 1b) |

## Critères de vérification
1. Déclencheur : `block-size` = 40px en comfortable, 32px en compact ; rayon 6px ; bordure 1px `--mr-border-control`.
2. Surface : `--mr-bg-overlay`, rayon 12px, ombre `--mr-shadow-overlay`, écart 4px au déclencheur.
3. Saisie manuelle et choix calendrier : les deux émettent `onValueChange` au format ISO.
4. `Flèche Bas` ouvre, `Enter` valide, `Escape` referme avec restitution du focus.
5. Champ : `role="combobox"`, `aria-expanded`, `aria-controls` ; surface : `role="dialog"`.
6. Invalide : `border-color` = `--mr-danger-text` (`#ba2b2e` light), `aria-invalid="true"`, message lié par `aria-describedby`.
7. Désactivé : fond `--mr-bg-hover`, texte `--mr-text-disabled`, `cursor` = `not-allowed`.
8. Grille interne conforme à la spec Calendar (cellules 32px / 28px, sélection `accent` / `on-accent`).

## Interdits
- Jamais de `onChange` émis pour la valeur : `onValueChange` + natif réservé.
- Jamais de surface sans `role="dialog"` ni sans positionnement par l'utilitaire interne.
- Jamais d'erreur signalée par la bordure seule : message + `aria-invalid`.
- Jamais de date hors `min` / `max` sélectionnable.
