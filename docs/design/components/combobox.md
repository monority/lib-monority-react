# Combobox
Statut : spec v4 — à valider
Source : prompt maître §7.6

## Rôle
Champ de saisie avec complétion dynamique et filtrage d'une liste déroulante d'options. Choisir `Select` si la liste est courte et ne nécessite pas de filtre textuel.

## Anatomie
`Input de recherche textuelle (déclencheur) → Popover natif (liste filtrée d'options avec coche, rail et état vide)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size champ | `--mr-control-size-sm` | 32px | 28px |
| md | block-size champ | `--mr-control-size-md` | 40px | 32px |
| lg | block-size champ | `--mr-control-size-lg` | 48px | 40px |
| sm/md/lg | padding-inline champ | `--mr-control-padding-inline-sm/md/lg` | 12 / 16 / 20px | 8 / 12 / 16px |
| toutes | border-radius champ | `--mr-radius-control` | 6px | 6px |
| toutes | border-radius popover | `--mr-radius-overlay` | 12px | 12px |
| toutes | hauteur élément liste | `--mr-menu-item-height` | 32px | 28px |
| toutes | max-block-size liste | `--mr-listbox-max-height` | 280px | 280px |
| toutes | min-inline-size liste | `--mr-menu-min-width` | 180px | 180px |
| toutes | rail élément sélectionné | `--mr-rail-width` | 2px | 2px |

Décision issue de l'audit (phase 0 bis) : la largeur minimale de liste applique `--mr-menu-min-width` (180px), alignée sur la famille des panneaux et menus (7.10).

## États
Champ de saisie : mêmes états qu'Input (7.5).
- repos : fond `--mr-bg-sunken`, texte `--mr-text-primary`, bordure `--mr-border-control`
- survol : bordure `--mr-text-tertiary`
- focus : bordure `--mr-focus-color`, anneau `outline: var(--mr-focus-width) solid var(--mr-focus-color)`
- invalide : bordure `--mr-danger-text`, anneau `--mr-danger-text`
- désactivé : fond `--mr-bg-hover`, texte `--mr-text-disabled`, bordure `--mr-border-subtle`

Liste popover :
- repos option : fond transparent, texte `--mr-text-primary`
- survol option / élément actif clavier : fond `--mr-bg-hover`, texte `--mr-text-primary`
- sélectionné : rail gauche 2px `--mr-accent` + coche en fin de ligne en `--mr-accent-text`
- état vide (« Aucun résultat ») : padding `--mr-spacing-3`, texte `--mr-text-secondary`, centré ou aligné à gauche

## Comportement et clavier
- La frappe dans l'input filtre la liste en temps réel et ouvre automatiquement le popover si fermé.
- `Flèche Bas` / `Haut` parcourt les options filtrées (`aria-activedescendant`), sans sortir du champ de saisie.
- `Enter` sélectionne l'option active, renseigne le texte du champ, referme la liste et émet `onValueChange`.
- `Escape` referme la liste sans modifier la valeur sélectionnée et replace le focus sur le champ.
- Apparition du popover : `opacity` + `scale(0.98 -> 1)` en `--mr-duration-base` / `--mr-ease-enter` ; disparition en `--mr-duration-fast` / `--mr-ease-exit`.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Champ : `role="combobox"`, `aria-autocomplete="list"`, `aria-expanded="true | false"`, `aria-controls="listbox-id"`.
- Liste : `role="listbox"`, options `role="option"`, `aria-selected="true | false"`.
- Élément actif lié par `aria-activedescendant`.
- État vide : région de statut avec message explicite (« Aucun résultat »).
- Cible interactive ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: string, description?: string, disabled?: boolean, group?: string }>` | requis | liste de données (P2) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `onValueChange` | `(value: string) => void` | — | futur événement DOM `value-change` (P6) |
| `open` | `boolean` | — | ouverture contrôlée (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille du champ |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | désactivé |
| `required` | `boolean` | `false` | obligatoire |
| `placeholder` | `string` | — | texte indicatif |
| `name` | `string` | — | participation formulaire (P4) |
| `filter` | `(item: ComboboxItem, query: string) => boolean` | — | logique de filtrage optionnelle (extension P2 : fonctions de rendu autorisées sur Combobox) |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onChange` sur Combobox (inventory / types) | `onChange` → `onValueChange` (P6) | oui | ligne Combobox |
| token `--mr-combobox-list-min-width` utilisé mais non défini (inventory §2.1) | remplacé par `--mr-menu-min-width` (décision audit phase 0 bis, S8) | non | inventory §2.1 / S8 |
| prop `tone` dans les recettes | retirée au profit de `invalid` seul (P1, 7.6) | oui | ligne Combobox |
| option sélectionnée sur fond complet | rail gauche 2px `--mr-accent` + coche en fin (signature, section 4) | non (visuel) | ligne Combobox |

## Critères de vérification
1. Combobox md : champ `block-size` = 40px en comfortable, 32px en compact.
2. popover : largeur minimale = `--mr-menu-min-width` (180px) ou largeur du champ si supérieure.
3. frappe textuelle filtre les options et affiche « Aucun résultat » si aucune correspondance.
4. option sélectionnée : pseudo-élément rail gauche `width` = 2px, couleur = `--mr-accent`.
5. état vide : `color` = `--mr-text-secondary` (`#4a5558` light), aucun rail.
6. clavier : `Flèche Bas` navigue sans perte de focus de l'input, `Enter` valide et ferme, `Escape` ferme.
7. champ repos : fond `--mr-bg-sunken` (`#f1f5f6` light), bordure `--mr-border-control`.
8. champ focus : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`.
9. popover : `border-radius` = 12px (`--mr-radius-overlay`), ombre `--mr-shadow-overlay`.

## Interdits
- Jamais de largeur minimale propre à la liste : la cible applique `--mr-menu-min-width`.
- Jamais d'aplat d'accent sur l'élément sélectionné (rail gauche uniquement).
- Jamais d'opacité au désactivé.
- Pas de portail JavaScript custom pour la liste (attribut `popover` natif obligatoire, C6).
