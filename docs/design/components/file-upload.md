# FileUpload
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.5 états)

## Rôle
Dépose ou sélectionne des fichiers avec retour visible quand un simple champ de fichier ne suffit pas. Retenir l'Input `file` natif pour un choix sans liste.

## Anatomie
Zone de dépôt (icône 20px, titre `small-strong`, aide `caption`, bouton « Parcourir » en Button `secondary` sm) ; liste des fichiers en DataList sous la zone (nom, taille, état, suppression par fichier).

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | fond zone | `--mr-bg-sunken` | `#f1f5f6` light | `#f1f5f6` light |
| toutes | bordure zone | `--mr-border-control` | 1px, `dashed` | 1px, `dashed` |
| toutes | rayon zone | `--mr-radius-card` | 10px | 10px |
| toutes | padding zone | `--mr-spacing-6` | 24px | 24px |
| toutes | icône zone | `--mr-icon-size-lg` | 20px | 20px |
| toutes | ligne de fichier | `--mr-table-row-height` | 40px | 32px |
| toutes | écart zone/liste | `--mr-stack-gap` | 12px | 8px |
| toutes | titre / aide | `--mr-type-small-strong` / `--mr-type-caption` | 13px / 12px | 13px / 12px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| zone | repos | `--mr-bg-sunken` | titre `--mr-text-primary`, aide `--mr-text-secondary` | 1px `dashed` `--mr-border-control` | icône `--mr-text-tertiary` |
| zone | survol de dépôt | `--mr-bg-hover` | titre `--mr-text-primary` | 1px `dashed` `--mr-focus-color` | icône `--mr-accent-text` |
| zone | focus | `--mr-bg-sunken` | `--mr-text-primary` | 1px `dashed` `--mr-border-control` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)` sur `:focus-visible` |
| zone | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | 1px `dashed` `--mr-border-subtle` | `cursor: not-allowed` |
| zone | invalide | `--mr-bg-sunken` | `--mr-text-primary` | 1px `dashed` `--mr-danger-text` | message lié par `aria-describedby` |
| fichier | erreur | transparent | nom `--mr-text-primary`, erreur `--mr-danger-text` | aucune | suppression conservée |

## Comportement et clavier
- Glisser-déposer sur la zone ou clic sur « Parcourir » (ouvre le sélecteur natif) ; les deux voies émettent `onValueChange`.
- Fichiers refusés (type, taille) : signalés en ligne en erreur, jamais ajoutés silencieusement ni rejetés sans message.
- Suppression par fichier : IconButton `ghost` sm, émet `onSelect` puis `onValueChange` sans le fichier.
- Zone focusable : `Enter` / `Espace` ouvre le sélecteur natif.
- Participe au formulaire natif : soumission, validation, reset (P4).

## Accessibilité
- Zone : `role="button"` ou `<label>` lié à l'input natif masqué, `aria-describedby` vers l'aide (formats, taille maximale).
- État de dépôt annoncé en `aria-live="polite"` (« 3 fichiers ajoutés », « fichier refusé : … »).
- Liste : DataList selon sa spec ; erreurs en texte `--mr-danger-text`, jamais la couleur seule.
- Input natif conservé pour la soumission et la validation (P4).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `File[]` | — | fichiers contrôlés (P5) |
| `defaultValue` | `File[]` | `[]` | fichiers initiaux |
| `accept` | `string` | — | types MIME et extensions |
| `maxSize` | `number` | — | taille maximale en octets |
| `multiple` | `boolean` | `true` | cumul des fichiers |
| `disabled` | `boolean` | `false` | zone inactive (P1) |
| `invalid` | `boolean` | `false` | état d'erreur (P1) |
| `name` | `string` | — | nom de soumission (P4) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(files)` et `onSelect(file)` pour l'action par fichier, futurs événements `value-change` (P6). `onDrop`, `onRemove`, `onFilesChange` actuels repliés sur ce couple.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callbacks `onDrop`, `onRemove`, `onFilesChange` (migration §1 FileUpload) | `onValueChange` + `onSelect`, `onSelect` P6 déjà conforme | non | migration-table §1 |
| zone dédiée `--mr-drop-zone-min-height`, `--mr-drop-zone-padding` | padding `--mr-spacing-6`, lignes `--mr-table-row-height` | non (visuel) | migration-table §2 |
| lignes dédiées `--mr-file-list-item-padding-block`, `--mr-file-list-item-padding-inline` | liste en DataList (7.15) | non | migration-table §2 |
| recette file-upload : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |

## Critères de vérification
1. Zone : fond `--mr-bg-sunken`, bordure 1px `dashed` `--mr-border-control`, rayon 10px, padding 24px.
2. Survol de dépôt : fond `--mr-bg-hover`, bordure `--mr-focus-color`, icône `--mr-accent-text`.
3. Icône : 20px × 20px `--mr-text-tertiary` ; titre 13px/20px 500 ; aide 12px/16px `--mr-text-secondary`.
4. Liste : lignes 40px en comfortable, 32px en compact, selon la spec DataList.
5. Fichier refusé : ligne en erreur `--mr-danger-text` + message, jamais d'ajout silencieux.
6. Suppression : IconButton `ghost` sm par fichier, émet `onValueChange` sans le fichier.
7. Zone focusable : `Enter` / `Espace` ouvre le sélecteur ; `outline` 2px `--mr-focus-color` sur `:focus-visible`.
8. Annonces : `aria-live="polite"` (« n fichiers ajoutés », refus motivés) ; input natif conservé (P4).

## Interdits
- Jamais de fichier refusé sans message, jamais d'ajout silencieux.
- Jamais de bordure pleine pour la zone : `dashed` uniquement (seule exception avec FileUpload, 5.8).
- Jamais d'erreur signalée par la couleur seule.
- Jamais de zone non focusable au clavier.
