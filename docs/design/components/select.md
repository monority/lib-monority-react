# Select
Statut : spec v4 — à valider
Source : prompt maître §7.6

## Rôle
Menu déroulant de sélection unique parmi une liste fermée d'options. Choisir `Combobox` si la liste nécessite un filtrage par saisie textuelle, `RadioGroup` si toutes les options doivent être visibles immédiatement.

## Anatomie
`Déclencheur (texte sélectionné ou placeholder + chevron rotatif) → Popover natif (liste d'options avec coche et rail de sélection)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | block-size déclencheur | `--mr-control-size-sm` | 32px | 28px |
| md | block-size déclencheur | `--mr-control-size-md` | 40px | 32px |
| lg | block-size déclencheur | `--mr-control-size-lg` | 48px | 40px |
| sm | padding-inline-start | `--mr-control-padding-inline-sm` | 12px | 8px |
| md | padding-inline-start | `--mr-control-padding-inline-md` | 16px | 12px |
| lg | padding-inline-start | `--mr-control-padding-inline-lg` | 20px | 16px |
| sm/md/lg | padding-inline-end | padding inline + chevron + `--mr-spacing-2` | 36 / 40 / 48px | 32 / 36 / 44px |
| sm/md | chevron | `--mr-icon-size-sm` / `--mr-icon-size-md` | 16px | 16px |
| lg | chevron | `--mr-icon-size-lg` | 20px | 20px |
| toutes | border-radius déclencheur | `--mr-radius-control` | 6px | 6px |
| toutes | border-radius popover | `--mr-radius-overlay` | 12px | 12px |
| toutes | border-radius élément | `--mr-radius-control` | 6px | 6px |
| toutes | hauteur élément liste | `--mr-menu-item-height` | 32px | 28px |
| toutes | max-block-size liste | `--mr-listbox-max-height` | 280px | 280px |
| toutes | min-inline-size liste | largeur du déclencheur | 100 % min | 100 % min |
| toutes | rail élément sélectionné | `--mr-rail-width` | 2px | 2px |

## États
Déclencheur :

| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | repos | `--mr-bg-sunken` | `--mr-text-primary` (placeholder `--mr-text-tertiary`) | `--mr-border-control` | chevron `--mr-text-secondary` |
| standard | survol | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-text-tertiary` | chevron `--mr-text-primary` |
| standard | focus / ouvert | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-focus-color` | chevron tourné de 180°, `outline: var(--mr-focus-width) solid var(--mr-focus-color)` |
| standard | invalide | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-danger-text` | `aria-invalid="true"`, anneau `--mr-danger-text` |
| standard | désactivé | `--mr-bg-hover` | `--mr-text-disabled` | `--mr-border-subtle` | `cursor: not-allowed`, pas de survol |

Éléments de liste (popover) :
- repos : fond transparent, texte `--mr-text-primary`
- actif au clavier / survol : fond `--mr-bg-hover`, texte `--mr-text-primary`
- sélectionné : rail gauche 2px `--mr-accent` (retrait vertical 4px) + coche en fin de ligne en `--mr-accent-text`
- désactivé : texte `--mr-text-disabled`, fond transparent, `cursor: not-allowed`

## Comportement et clavier
- Déclencheur : clic ou `Espace`/`Enter`/`Flèche Bas` ouvre la liste popover.
- Rotation du chevron : 180° en `--mr-duration-fast` / `--mr-ease-standard`.
- Clavier dans la liste : `Flèche Bas`/`Haut` déplace l'élément actif, `Home`/`End` premier/dernier élément, saisie prédictive au clavier.
- `Enter` ou `Espace` valide la sélection, met à jour la valeur et referme le popover.
- `Escape` ferme la liste et rend immédiatement le focus au déclencheur.
- Positionnement : utilitaire interne `packages/ui/src/internal/position` (décision phase 1b, `docs/design/language.md`) — 12 placements, écart `--mr-popover-offset` (4px), retournement et décalage dans la fenêtre, mise à jour au défilement et au redimensionnement tant qu'ouvert, limitée à une fois par image. Pas d'anchor positioning CSS (note X6).

## Accessibilité
- Déclencheur : `role="combobox"` ou `<button aria-haspopup="listbox" aria-expanded="...">`.
- Conteneur liste : `role="listbox"`, `aria-activedescendant` pointant vers l'élément surligné.
- Options : `role="option"`, `aria-selected="true | false"`.
- Focus : `:focus-visible`, anneau `--mr-focus-color`.
- En cas d'erreur : `aria-invalid="true"`, relié par `aria-describedby`.
- Cible déclencheur et éléments ≥ `--mr-min-target` (24px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, description?: ReactNode, disabled?: boolean, group?: string }>` | requis | liste de données (P2) |
| `value` | `string` | — | valeur contrôlée (P5) |
| `defaultValue` | `string` | — | valeur initiale non contrôlée (P5) |
| `onValueChange` | `(value: string) => void` | — | futur événement DOM `value-change` (P6) |
| `open` | `boolean` | — | ouverture contrôlée (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale non contrôlée (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille du déclencheur |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | contrôle désactivé |
| `required` | `boolean` | `false` | champ obligatoire |
| `name` | `string` | — | participation au formulaire natif (P4) |
| `placeholder` | `string` | — | texte quand aucune valeur n'est sélectionnée |
| `renderItem` | `(item: SelectItem) => ReactNode` | — | fonction de rendu optionnelle (P2, X6) |
| `className` | `string` | — | fusion de classe (P9) |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` dans certains styles | retirée au profit de `invalid` (7.6, P1) | oui | ligne Select |
| chevron fixe sans animation de rotation | rotation 180° en `--mr-duration-fast` (7.6) | non (visuel) | ligne Select |
| option sélectionnée sur fond complet | rail gauche 2px `--mr-accent` + coche en fin (signature, section 4, 7.6) | non (visuel) | ligne Select |
| overlay via portail custom | attribut `popover` natif (décision structurante 3, C6) | non | section 3 |

## Critères de vérification
1. déclencheur md : `block-size` = 40px en comfortable, 32px en compact.
2. déclencheur sm : 32px / 28px ; lg : 48px / 40px.
3. chevron : rotation 180° à l'ouverture, durée `--mr-duration-fast` (120ms), courbe `--mr-ease-standard`.
4. padding-inline-end déclencheur md : 40px en comfortable (16 + 16 + 8).
5. popover : fond `--mr-bg-overlay`, bordure `--mr-border-default`, `border-radius` = 12px (`--mr-radius-overlay`).
6. option sélectionnée : pseudo-élément rail gauche `width` = 2px, `background-color` = `--mr-accent`.
7. liste : `max-block-size` = 280px (`--mr-listbox-max-height`), `min-inline-size` = largeur déclencheur.
8. clavier : touche `Flèche Bas` ouvre le popover, `Enter` sélectionne et referme, `Escape` ferme et replace le focus.
9. repos déclencheur : fond `--mr-bg-sunken` (`#f1f5f6` light), bordure `--mr-border-control` (`#7c878a` light).

## Interdits
- Jamais d'aplat d'accent en fond de ligne sélectionnée (rail gauche uniquement).
- Jamais d'opacité au désactivé.
- Pas de `createPortal` pour la liste (couche `popover` native obligatoire, C6).
- Pas de fermeture sans restitution du focus au déclencheur.
