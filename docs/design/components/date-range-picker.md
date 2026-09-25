# DateRangePicker
Statut : spec v4 — à valider
Source : prompt maître §7.18 (déclencheur §7.6, surface §7.10)

## Rôle
Saisit ou choisit une période (début / fin) quand deux dates liées doivent rester cohérentes. Retenir le DatePicker pour une date unique.

## Anatomie
Déclencheur comme un champ (deux segments de date séparés par un tiret, icône calendrier 16px) ; surface flottante : un ou deux Calendar côte à côte, boutons « Appliquer » (`secondary`) et « Effacer » (`ghost`).

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur déclencheur | `--mr-control-size-md` | 40px | 32px |
| toutes | rayon déclencheur | `--mr-radius-control` | 6px | 6px |
| toutes | bordure déclencheur | `--mr-border-control` | 1px | 1px |
| toutes | surface | `--mr-bg-overlay` | `#ffffff` light | `#ffffff` light |
| toutes | rayon surface | `--mr-radius-overlay` | 12px | 12px |
| toutes | ombre surface | `--mr-shadow-overlay` | double ombre douce | double ombre forte / aucune (oled, HC) |
| toutes | écart déclencheur/surface | `--mr-popover-offset` | 4px | 4px |
| toutes | écart entre calendriers | `--mr-grid-gap` | 16px | 12px |
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
| borne | début / fin | `--mr-accent` | `--mr-on-accent` | aucune | rayon `control` |
| intervalle | jours entre bornes | `--mr-accent-subtle` | `--mr-text-primary` | aucune | continu entre les bornes |

## Comportement et clavier
- Premier choix pose le début, second choix pose la fin ; un troisième choix redémarre la période. Inversion automatique si fin antérieure au début.
- « Appliquer » valide et referme (émet `onValueChange`), « Effacer » vide la période.
- `Escape` referme sans valider et rend le focus au champ ; `Enter` sur un jour complète la borne active.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image.
- Participe au formulaire natif : soumission, validation, reset (P4).

## Accessibilité
- Champ : `role="combobox"`, `aria-expanded`, `aria-controls`, `aria-describedby` pour l'aide et l'erreur.
- Surface : `role="dialog"`, `aria-label` « Choisir une période » ; chaque grille suit la spec Calendar.
- Bornes annoncées (« date de début », « date de fin ») en `aria-label`, jamais la couleur seule.
- Période invalide : `aria-invalid="true"` + message en texte.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `{ start, end }` (ISO) | — | période contrôlée (P5) |
| `defaultValue` | `{ start, end }` (ISO) | — | période initiale |
| `disabled` | `boolean` | `false` | champ inactif (P1) |
| `invalid` | `boolean` | `false` | état d'erreur (P1) |
| `required` | `boolean` | `false` | validation native (P4) |
| `name` | `string` | — | nom de soumission (P4) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange({ start, end })` et futur événement DOM `value-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| recette date-range-picker : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| bornes et intervalle locaux éventuels | bornes `accent` / `on-accent`, intervalle `accent-subtle` | non (visuel) | prompt §7.18 |
| positionnement local éventuel | utilitaire `packages/ui/src/internal/position` (décision phase 1b) | non | language.md (phase 1b) |
| callbacks actuels sans cible nommée | `onValueChange` + événement `value-change` (P6) | non | migration-table §1 |

## Critères de vérification
1. Déclencheur : 40px en comfortable, 32px en compact ; rayon 6px ; bordure 1px `--mr-border-control`.
2. Surface : `--mr-bg-overlay`, rayon 12px, ombre `--mr-shadow-overlay`, écart 4px ; calendriers espacés de 16px (12px compact).
3. Bornes : fond `--mr-accent`, texte `--mr-on-accent` ; intervalle : fond `--mr-accent-subtle`.
4. Troisième choix : redémarre la période ; fin antérieure : inversion automatique.
5. « Appliquer » émet `onValueChange({ start, end })` et referme ; « Effacer » vide la période.
6. `Escape` referme sans valider avec restitution du focus.
7. Champ : `role="combobox"`, `aria-expanded` ; surface : `role="dialog"` « Choisir une période ».
8. Invalide : bordure `--mr-danger-text`, `aria-invalid="true"`, message lié par `aria-describedby`.

## Interdits
- Jamais de période incohérente conservée (fin antérieure au début sans inversion).
- Jamais de bornes signalées par la couleur seule : `aria-label` début / fin.
- Jamais de validation sans action explicite « Appliquer ».
- Jamais de surface sans positionnement par l'utilitaire interne.
