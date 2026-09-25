# Text
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5.9)

## Rôle
Affiche un texte avec un style typographique du système quand aucun composant sémantique ne s'applique. Retenir le Title pour un titre de niveau et les styles de composants pour les libellés.

## Anatomie
Élément unique : style par `variant` (un style de 5.9), couleur par `tone`, balise par `as` dans une union fermée.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| display | police | `--mr-type-display` | 32px / 40px, 600, sans | 32px / 40px, 600, sans |
| h1 | police | `--mr-type-h1` | 24px / 32px, 600, sans | 24px / 32px, 600, sans |
| h2 | police | `--mr-type-h2` | 18px / 24px, 600, sans | 18px / 24px, 600, sans |
| h3 | police | `--mr-type-h3` | 16px / 24px, 600, sans | 16px / 24px, 600, sans |
| body-lg | police | `--mr-type-body-lg` | 16px / 24px, sans | 16px / 24px, sans |
| body | police | `--mr-type-body` | 14px / 20px, sans | 14px / 20px, sans |
| small | police | `--mr-type-small` | 13px / 20px, sans | 13px / 20px, sans |
| caption | police | `--mr-type-caption` | 12px / 16px, sans | 12px / 16px, sans |
| label | police | `--mr-type-label` | 11px / 16px, mono, majuscules | 11px / 16px, mono, majuscules |
| code | police | `--mr-type-code` | 13px / 20px, mono | 13px / 20px, mono |
| code-sm | police | `--mr-type-code-sm` | 12px / 16px, mono | 12px / 16px, mono |
| data-lg | police | `--mr-type-data-lg` | 32px / 40px, 600, `tabular-nums` | 32px / 40px, 600, `tabular-nums` |

Tailles en `rem`, aucune taille hors 11 / 12 / 13 / 14 / 16 / 18 / 24 / 32 (5.9). `tabular-nums` et `letter-spacing` posés après `font`.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| neutral | unique | transparent | `--mr-text-primary` | aucune | voix selon `variant` |
| accent | unique | transparent | `--mr-accent-text` | aucune | jamais de fond teinté |
| success | unique | transparent | `--mr-success-text` | aucune | toujours doublé d'un texte explicite |
| warning | unique | transparent | `--mr-warning-text` | aucune | toujours doublé d'un texte explicite |
| danger | unique | transparent | `--mr-danger-text` | aucune | toujours doublé d'un texte explicite |
| info | unique | transparent | `--mr-info-text` | aucune | toujours doublé d'un texte explicite |

Pas d'état interactif : primitive de texte uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. `variant` ne change que la police (taille, graisse, voix) ; `tone` ne change que la couleur ; `as` ne change que la balise. Les trois props sont orthogonales.

## Accessibilité
- Balise portée par `as` : `p | span | div | label | strong | em | small` (P3), hiérarchie de titres préservée (pas de `as` titre de niveau incohérent).
- Contraste selon le ton : `neutral` ≥ 7:1, tons de statut ≥ 4.5:1, vérifiés en CI (X2).
- Chiffres de données : `variant="data-lg"` avec `tabular-nums`, jamais en mono (5.9).
- La couleur n'est jamais le seul porteur de sens : un statut a toujours un texte (section 4).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `variant` | `'display' \| 'h1' \| 'h2' \| 'h3' \| 'body-lg' \| 'body' \| 'body-strong' \| 'small' \| 'small-strong' \| 'caption' \| 'label' \| 'code' \| 'code-sm' \| 'data-lg'` | `'body'` | style de 5.9 |
| `tone` | `'neutral' \| 'accent' \| 'success' \| 'warning' \| 'danger' \| 'info'` | `'neutral'` | couleur (P1) |
| `as` | `'p' \| 'span' \| 'div' \| 'label' \| 'strong' \| 'em' \| 'small'` | `'p'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | texte |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `size` actuelle (migration §1 Text) | absorbée par `variant` (un style de 5.9 porte sa taille) | oui | migration-table §1 |
| tons et tailles exprimés en valeurs locales éventuels | `tone` vers `{ton}-text`, tailles par `--mr-type-*` (5.9) | non (visuel) | migration-table §2 (`--mr-text-*` → déprécié) |
| `as` ouvert (migration §1 Text) | union fermée `p \| span \| div \| label \| strong \| em \| small` (P3) | oui (type) | migration-table §1 |
| recette text : 0 valeur en dur (inventory §2.1) | aucun changement visuel requis | non | inventory §2.1 |

## Critères de vérification
1. `variant` : 14 styles admis, chacun égale son token `--mr-type-*` (taille, graisse, voix).
2. Tailles : aucune hors 11 / 12 / 13 / 14 / 16 / 18 / 24 / 32 ; graisses hors 400 / 500 / 600 refusées.
3. Tons : neutral `--mr-text-primary`, accent `--mr-accent-text`, statuts `{ton}-text`.
4. `as` : seules `p`, `span`, `div`, `label`, `strong`, `em`, `small` acceptées.
5. `font` + `tabular-nums` / `letter-spacing` posés après `font` (ordre vérifié).
6. `data-lg` : 32px/40px, 600, voix humaine + `tabular-nums`, jamais mono.
7. Label : 11px/16px, mono 500, majuscules, `--mr-tracking-label`.
8. Aucune ombre, aucun fond, aucune bordure sur l'élément.

## Interdits
- Jamais de taille, de graisse ou de police hors section 5.9.
- Jamais de `as` hors union fermée, jamais de titre de niveau via Text (réservé à Title).
- Jamais la couleur comme seul porteur de sens.
- Jamais de chiffres de données en voix mono.
