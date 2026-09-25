# PasswordInput
Statut : spec v4 — à valider
Source : prompt maître §7.5

## Rôle
Champ de saisie sécurisée avec bouton intégré de révélation/masquage du mot de passe. Choisir `Input` pour du texte ordinaire.

## Anatomie
`champ <input type="password|text"> → IconButton ghost sm de révélation/masquage`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size | `--mr-control-size-sm` | 32px | 28px |
| md | block-size | `--mr-control-size-md` | 40px | 32px |
| lg | block-size | `--mr-control-size-lg` | 48px | 40px |
| sm | padding-inline-start | `--mr-control-padding-inline-sm` | 12px | 8px |
| md | padding-inline-start | `--mr-control-padding-inline-md` | 16px | 12px |
| lg | padding-inline-start | `--mr-control-padding-inline-lg` | 20px | 16px |
| toutes | padding-inline-end | calculé (bouton révélation) | 40px | 36px |
| sm | font-size / line-height | `--mr-control-font-size-sm` | 13px / 20px | 12px / 20px |
| md | font-size / line-height | `--mr-control-font-size-md` | 14px / 20px | 13px / 20px |
| lg | font-size / line-height | `--mr-control-font-size-lg` | 16px / 24px | 14px / 24px |
| sm/md | icône révélation | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | icône révélation | `--mr-icon-size-lg` | 20px | 20px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-control` | bouton révélation visible |
| standard | survol | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-text-tertiary` | bouton révélation survolable |
| standard | focus | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-focus-color` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | invalide | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-danger-text` | `aria-invalid="true"`, anneau `--mr-danger-text` au focus |
| standard | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | bouton révélation désactivé, `cursor: not-allowed` |
| standard | lecture seule | transparent | `--mr-text-primary` | `--mr-border-subtle` | pas de survol |

## Comportement et clavier
- Clic sur l'IconButton de révélation bascule le type de l'input entre `"password"` et `"text"`.
- Libellé accessible du bouton bascule dynamiquement entre « Afficher le mot de passe » et « Masquer le mot de passe ».
- Le bouton de révélation ne vole pas le focus du champ au clic.
- Touche `Enter` soumet le formulaire si applicable ; clavier standard de saisie textuelle.

## Accessibilité
- Élément `<input>` natif avec type dynamique `"password"` ou `"text"`.
- Bouton de révélation : IconButton avec `aria-label` explicite mis à jour selon l'état visuel (« Afficher le mot de passe » ou « Masquer le mot de passe ») et `aria-pressed`.
- En cas d'erreur : `aria-invalid="true"`, message relié par `aria-describedby`.
- Cible interactive ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille du champ |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | champ désactivé |
| `readOnly` | `boolean` | `false` | lecture seule |
| `required` | `boolean` | `false` | obligatoire |
| `showToggle` | `boolean` | `true` | présence du bouton de révélation |
| `placeholder` | `string` | — | texte indicatif |
| `name` | `string` | — | nom pour formulaire (P4) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks :
- `onChange` : `(event: ChangeEvent<HTMLInputElement>) => void` (natif préservé, P6)
- `onValueChange` : `(value: string) => void` (futur événement DOM `value-change`, P6)

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| absence de `onValueChange` | `onValueChange(value)` ajouté en complément de `onChange` (P6) | non | ligne PasswordInput |
| bouton révélation avec style ad hoc | IconButton ghost sm intégré conforme 7.1 et 7.5 | non (visuel) | ligne PasswordInput |
| absence de page dédiée dans le registre docs | documenté dans la famille Input (audit inventory §1) | non | inventory §1 |

## Critères de vérification
1. PasswordInput md : `block-size` = 40px en comfortable, 32px en compact.
2. bouton de révélation intégré en IconButton ghost sm à droite.
3. clic sur le bouton bascule l'attribut de `type="password"` à `type="text"`.
4. libellé accessible du bouton bascule de « Afficher le mot de passe » à « Masquer le mot de passe ».
5. repos : `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `border-color` = `--mr-border-control` (`#7c878a` light).
6. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
7. invalide : `border-color` = `--mr-danger-text` (`#ba2b2e` light).
8. désactivé : `background-color` = `--mr-bg-hover`, `border-color` = `--mr-border-subtle`, bouton de révélation inactif.
9. `border-radius` = 6px (`--mr-radius-control`).

## Interdits
- Jamais de bouton de révélation sans libellé accessible dynamique.
- Jamais d'opacité au désactivé.
- Jamais d'animation de dimension ou de transformation au clic.
- Pas de perte de focus lors de l'activation du bouton de révélation.
