# CopyButton
Statut : spec v4 — à valider
Source : prompt maître §7.1

## Rôle
Copie une valeur dans le presse-papiers avec retour visuel et annonce. Seule API autorisée pour l'action « copier » (la prop `copyValue` de Button est retirée, 7.19).

## Anatomie
`IconButton` ou `Button ghost` : icône copie → icône coche pendant `duration`, spinner possible pendant l'écriture.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size et inline-size (mode IconButton) | `--mr-control-size-sm` | 32px | 28px |
| md | block-size et inline-size (mode IconButton) | `--mr-control-size-md` | 40px | 32px |
| lg | block-size et inline-size (mode IconButton) | `--mr-control-size-lg` | 48px | 40px |
| sm/md | icône | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | icône | `--mr-icon-size-lg` | 20px | 20px |
| toutes | border-radius | `--mr-radius-control` | 6px | 6px |
| mode Button ghost | padding-inline | `--mr-control-padding-inline-*` | 12 / 16 / 20px | 8 / 12 / 16px |
| mode Button ghost | écart icône/texte | `--mr-control-gap` | 8px | 6px |

## États
| Variante | État | Fond | Texte / glyphes | Bordure | Autre |
|---|---|---|---|---|---|
| ghost (défaut) | repos | transparent | `--mr-text-secondary` | transparent | icône copie |
| ghost | survol | `--mr-bg-hover` | `--mr-text-primary` | transparent | — |
| ghost | pression | `--mr-bg-active` | `--mr-text-primary` | transparent | — |
| ghost | focus | transparent | `--mr-text-secondary` | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| ghost | désactivé | transparent | `--mr-text-disabled` | transparent | `cursor: not-allowed` |
| ghost | chargement | transparent | icône en `opacity: 0` | transparent | spinner `currentColor`, `aria-busy` |
| succès | copié | `--mr-bg-hover` | `--mr-accent-text` (icône coche) | transparent | rétabli après `duration` |

Variantes `secondary` / `primary` / `danger` héritées de Button (7.1) si `variant` spécifié.

## Comportement et clavier
- Clic → écriture dans `navigator.clipboard` → icône coche pendant `duration` (ms, défaut du composant) → retour à l'icône copie.
- Annonce « Copié » (libellé `copiedLabel`) dans une région `aria-live="polite"`.
- Transitions `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard` ; changement d'icône sans animation de dimension.
- Clavier : `<button>` natif, `Enter` / `Espace`, `type` défaut `button`.

## Accessibilité
- `label` (nom accessible : « Copier ») conservé pendant la copie ; `copiedLabel` annoncé via `aria-live="polite"` (région dédiée, pas de remplacement du libellé du bouton).
- `aria-disabled` + `aria-busy` pendant l'écriture ; focus `:focus-visible`.
- Cible ≥ `--mr-min-target` (24px).
- Icônes `aria-hidden="true"`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `value` | `string` | requis | valeur à copier |
| `label` | `string` | défaut composant (« Copier ») | nom accessible |
| `copiedLabel` | `string` | défaut composant (« Copié ») | annonce de confirmation |
| `duration` | `number` | défaut composant | durée d'affichage de la coche (ms) |
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'danger'` | `'ghost'` | forme (IconButton ou Button ghost) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille |
| `disabled` | `boolean` | `false` | désactivé |
| `className` | `string` | — | fusion (P9) |

Callbacks : aucun callback maison — l'événement est `click` (natif). Prochain événement DOM : `click` → `click`.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `Button copyValue` | retiré → `CopyButton` (7.19) | oui | ligne Button |
| Copier via Button sans API d'annonce | région `aria-live="polite"` + `copiedLabel` (7.1) | non | ligne CopyButton |
| variantes/size actuels | conservés (P1) ; défaut `ghost` | non | ligne CopyButton |

## Critères de vérification
1. IconButton md : `block-size` = `inline-size` = 40px (compact 32px) ; mode Button : mêmes dimensions que Button md.
2. `border-radius` = 6px ; icône md = 16px.
3. repos : fond transparent, `color` = `--mr-text-secondary` (`#4a5558` light).
4. survol : fond = `--mr-bg-hover` (`#e8eef0`).
5. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
6. après activation : `aria-live` contient `copiedLabel` ; icône = coche ; retour icône copie après `duration`.
7. désactivé : `aria-disabled="true"`, `cursor` `not-allowed`, `color` = `--mr-text-disabled`.
8. clic n'envoie pas de requête réseau ; `value` copié identique (test `navigator.clipboard.readText`).

## Interdits
- Ni prop `copyValue` sur Button ni logique de copie dans Button (P8).
- Jamais d'annonce exclusive visuelle : la confirmation est toujours annoncée (`aria-live`).
- Jamais d'opacité au désactivé, jamais `transition: all`, jamais de `box-shadow` de focus.
- Pas de `as` (P3).
