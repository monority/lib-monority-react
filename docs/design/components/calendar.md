# Calendar
Statut : spec v4 — à valider
Source : prompt maître §7.18 (déclencheur §7.6, surface §7.10)

## Rôle
Affiche un mois navigable pour choisir un jour quand la saisie manuelle ne suffit pas. Retenir le DatePicker pour un champ complet avec saisie.

## Anatomie
En-tête : libellé mois/année en `small-strong`, flèches mois précédent/suivant (chevrons comme le Select) ; grille 7 colonnes : en-têtes de jours en style `label`, cellules de jour carrées centrées.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | cellule jour | `--mr-calendar-cell-size` | 32px | 28px |
| toutes | rayon cellule | `--mr-radius-control` | 6px | 6px |
| toutes | en-tête jour | `--mr-type-label` | 11px / 16px, mono, majuscules | 11px / 16px, mono, majuscules |
| toutes | jour | `--mr-type-small` | 13px / 20px, `tabular-nums` | 13px / 20px, `tabular-nums` |
| toutes | flèche navigation | `--mr-icon-size-md` | 16px | 16px |
| toutes | bouton navigation | `--mr-control-size-sm` | 32px | 28px |
| toutes | écart mois/grille | `--mr-stack-gap` | 12px | 8px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| jour | repos | transparent | `--mr-text-primary` | aucune | chiffres `tabular-nums` |
| jour | survol | `--mr-bg-hover` | `--mr-text-primary` | aucune | rayon `control` |
| jour | sélectionné | `--mr-accent` | `--mr-on-accent` | aucune | rayon `control` |
| jour | jour courant | transparent | `--mr-text-primary` | aucune | rail inférieur 2px `--mr-accent` |
| jour | dans la plage | `--mr-accent-subtle` | `--mr-text-primary` | aucune | extrémités en `accent` / `on-accent` |
| jour | hors mois | transparent | `--mr-text-tertiary` | aucune | non sélectionnable |
| jour | désactivé | transparent | `--mr-text-disabled` | aucune | `cursor: not-allowed` |
| jour | focus | selon état | selon état | aucune | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset -2px (liste) |

## Comportement et clavier
- Flèches précédent/suivant : changent de mois, `aria-label` explicite (« Mois précédent », « Mois suivant »).
- Clavier dans la grille : flèches déplacent le jour, `PageHaut` / `PageBas` changent de mois, `Début` / `Fin` premier / dernier jour de la semaine, `Enter` / `Espace` sélectionne et émet `onValueChange`.
- Sélection : cellule unique (`Calendar`, `DatePicker`) ou plage (`DateRangePicker`, fond `accent-subtle` entre les bornes).
- Changement de mois : contenu mis à jour sans animation de position, `opacity` en `--mr-duration-fast` si transition.

## Accessibilité
- Grille ARIA : `role="grid"`, semaines `role="row"`, jours `button role="gridcell"`, `aria-selected="true | false"`.
- Jour courant : complété par un texte (« aujourd'hui ») en `aria-label`, jamais le rail seul.
- Navigation : `aria-live="polite"` sur le libellé mois/année.
- Cible minimale : cellule 32px (28px compact), conforme à `--mr-min-target` en comfortable.
- Contraste : sélection `--mr-on-accent` sur `--mr-accent` ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `string` (ISO) | — | jour sélectionné (contrôlé, P5) |
| `defaultValue` | `string` (ISO) | — | jour initial |
| `min` | `string` (ISO) | — | borne basse sélectionnable |
| `max` | `string` (ISO) | — | borne haute sélectionnable |
| `locale` | `string` | `'fr-FR'` | langue des libellés |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(isoDate)` et futur événement DOM `value-change` (P6). `onChange` réservé au natif.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callback `onChange` (migration §1 Calendar) | `onValueChange` + événement `value-change` (P6) | oui | migration-table §1 |
| recette calendar : 4 valeurs en dur signalées (inventory §2.1) | `--mr-calendar-cell-size`, `--mr-radius-control`, `--mr-type-label` (T2) | non | inventory §2.1 |
| sélection locale éventuelle hors accent | sélection `accent` / `on-accent`, plage `accent-subtle`, courant rail inférieur | non (visuel) | prompt §7.18 |
| grille sans rôles ARIA éventuelle | `grid` / `row` / `gridcell`, `aria-selected` | non | prompt §7.18 |

## Critères de vérification
1. Cellule : 32px × 32px en comfortable, 28px en compact ; rayon 6px ; chiffres `tabular-nums` 13px/20px.
2. En-têtes de jours : 11px/16px, mono 500, majuscules, `letter-spacing` = `--mr-tracking-label`, `--mr-text-tertiary`.
3. Sélection : `background-color` = `--mr-accent`, `color` = `--mr-on-accent`, `aria-selected="true"`.
4. Jour courant : rail inférieur 2px `--mr-accent` + « aujourd'hui » en `aria-label`.
5. Plage : fond `--mr-accent-subtle` entre bornes `accent` / `on-accent`.
6. Rôles : `grid`, `row`, `gridcell` ; libellé mois/année en `aria-live="polite"`.
7. Focus : `outline` 2px `--mr-focus-color`, offset -2px, uniquement sur `:focus-visible`.
8. Jours hors mois : `--mr-text-tertiary`, non sélectionnables ; jours désactivés : `--mr-text-disabled`, `cursor` = `not-allowed`.

## Interdits
- Jamais de sélection sans `aria-selected`, jamais de jour courant signalé par le rail seul.
- Jamais de taille de cellule hors `--mr-calendar-cell-size`, jamais de rayon hors `control`.
- Jamais de chiffres de jours en voix mono (5.9) : voix humaine + `tabular-nums`.
- Jamais de navigation mensuelle sans `aria-label` explicite.
