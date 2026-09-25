# Field
Statut : spec v4 — à valider
Source : prompt maître §7.4

## Rôle
Étiquette + aide + erreur d'un contrôle de formulaire, avec identifiants reliés automatiquement. Utiliser `Field` pour tout contrôle non couvert par `FormSection` (groupe de champs).

## Anatomie
`label (libellé) → contrôle → aide | erreur`. Requis : astérisque après le libellé. Disposition horizontale : `[contrôle] libellé / description`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | libellé | `--mr-type-small-strong` (13/20, 500, sans) | 13px / 20px | 13px / 20px |
| toutes | écart libellé → contrôle | `--mr-spacing-2` | 8px | 8px |
| toutes | écart contrôle → aide | `--mr-spacing-1-5` | 6px | 6px |
| toutes | écart entre champs | `--mr-section-gap` | 16px | 12px |
| toutes | aide / erreur | `--mr-type-caption` (12/16, 400, sans) | 12px / 16px | 12px / 16px |
| horizontale | libellé | `--mr-type-body` (14/20, 400, sans) | 14px / 20px | 14px / 20px |
| horizontale | description | `--mr-type-caption` | 12px / 16px | 12px / 16px |
| horizontale | écart contrôle ↔ libellé | `--mr-spacing-2` | 8px | 8px |
| horizontale | hauteur de rangée | — (min) | `--mr-min-target` 24px | 24px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| libellé | repos | transparent | `--mr-text-primary` | — | astérisque requis en `--mr-text-tertiary`, `aria-hidden="true"` |
| aide | repos | transparent | `--mr-text-secondary` | — | liée par `aria-describedby` |
| erreur | invalid | transparent | `--mr-danger-text` | — | remplace l'aide ; contrôle `aria-invalid="true"`, bordure contrôle = `--mr-danger-text` |
| rangée horizontale | survol | `--mr-bg-hover` (rangée) | `--mr-text-primary` | — | rangée entière cliquable |

## Comportement et clavier
- Aucune interaction propre : le contrôle dedans gère le clavier.
- Rangée horizontale (Checkbox, Radio, Switch) : clic/tap n'importe où dans la rangée active le contrôle ; `Espace`/`Enter` transitent par le contrôle focusé.
- Identifiants générés et reliés automatiquement (pattern Provider existant : FieldLabel, FieldContent, FieldError).
- Aucune animation requise.

## Accessibilité
- `<label>` relié au contrôle (`htmlFor` / `id` générés).
- Aide et erreur reliées par `aria-describedby` (erreur en priorité, remplace l'aide).
- Requis : `required` sur le contrôle, astérisque `aria-hidden="true"` ; `aria-invalid="true"` en erreur.
- Rangée horizontale : cible ≥ `--mr-min-target` (24px), rangée entière cliquable.

## API cible
Pattern Provider conservé (inventory §1) : un conteneur `Field` et des sous-composants reliés automatiquement.

| Prop (`Field`) | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `ReactNode` | — | libellé `<label>` relié au contrôle |
| `hint` | `ReactNode` | — | texte d'aide (`--mr-type-caption`, `--mr-text-secondary`) |
| `error` | `ReactNode` | — | message d'erreur (remplace l'aide, `--mr-danger-text`) |
| `required` | `boolean` | `false` | mention requis + `required` sur le contrôle |
| `htmlFor` | `string` | — | cible du label (sinon générée) |
| `className` | `string` | — | fusion (P9) |
| `children` | `ReactNode` | requis | contrôle |

Sous-composants disponibles : `FieldLabel` (`required`), `FieldContent`, `FieldDescription`, `FieldError`, `FieldGroup`, `FieldLegend` (`required`), `FieldSeparator`, `FieldSet`, `FieldTitle` (+ attributs HTML natifs de leur élément).

Callbacks : aucun — `onChange` reste l'événement natif du contrôle (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| pattern Provider conservé (FieldLabel, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldTitle) | conservé (inventory §1, conventions) | non | — |
| prop `hint` | conservée (règle de conservation) ; style `--mr-type-caption` en `--mr-text-secondary` (7.4) | non | ligne Field |
| recette field : 4 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle : espacements 5.6, typographie 5.9 (T2) | non | inventory §2.1 |
| gap libellé/aide éventuels hors échelle | `--mr-spacing-2` / `--mr-spacing-1-5` / `--mr-section-gap` (5.6) | non | migration-table §2 |

## Critères de vérification
1. libellé : `font-size` 13px, `line-height` 20px, `font-weight` 500, `color` = `--mr-text-primary`.
2. écart libellé → contrôle = 8px ; contrôle → aide = 6px ; entre champs = 16px (compact 12px).
3. aide : `font-size` 12px, `color` = `--mr-text-secondary` (`#4a5558` light).
4. erreur : `color` = `--mr-danger-text` (`#ba2b2e` light) ; contrôle associé `aria-invalid="true"` et `border-color` = `--mr-danger-text`.
5. `aria-describedby` du contrôle pointe vers l'id de l'aide (ou de l'erreur si présente).
6. requis : `required` présent sur le contrôle, astérisque `aria-hidden="true"`, `color` = `--mr-text-tertiary`.
7. horizontale : `min-block-size` rangée ≥ 24px, écart contrôle/libellé = 8px.
8. ids uniques : label `for` = id du contrôle (aucun orphan).

## Interdits
- Jamais d'astérisque accessible (toujours `aria-hidden="true"`).
- Jamais d'aide et d'erreur visibles en même temps (l'erreur remplace l'aide).
- Jamais d'opacité pour un champ désactivé ; jamais d'animation de dimension.
- Pas d'identifiant dupliqué entre champs.
