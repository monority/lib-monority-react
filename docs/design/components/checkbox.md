# Checkbox
Statut : spec v4 — à valider
Source : prompt maître §7.7

## Rôle
Contrôle de sélection binaire (coché / non coché) ou indéterminée (sélection partielle d'un groupe). Choisir `Switch` pour l'activation immédiate d'un paramètre système, `RadioGroup` pour un choix exclusif parmi plusieurs options.

## Anatomie
`Boîte carrée avec glyphe (coche ou tiret) → Libellé textuel associé`. Cible cliquable sur toute la rangée.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm / md | taille de la boîte | `--mr-checkbox-size-md` | 16px | 16px |
| lg | taille de la boîte | `--mr-checkbox-size-lg` | 20px | 20px |
| sm / md | taille du glyphe | `--mr-checkbox-glyph-md` | 12px | 12px |
| lg | taille du glyphe | `--mr-checkbox-glyph-lg` | 14px | 14px |
| toutes | épaisseur du glyphe | `--mr-glyph-stroke` | 2px | 2px |
| toutes | border-radius | `--mr-radius-inline` | 4px | 4px |
| toutes | border-width | `--mr-border-width` | 1px | 1px |
| toutes | écart boîte → libellé | `--mr-spacing-2` | 8px | 8px |
| toutes | hauteur minimale de rangée | `--mr-min-target` | 24px | 24px |

## États
| Variante | État | Fond | Bordure | Glyphe | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | non coché repos | `--mr-bg-raised` | `--mr-border-control` | — | bordure visible garantie ≥ 3:1 |
| standard | non coché survol | `--mr-bg-raised` | `--mr-text-tertiary` | — | survol sur toute la rangée |
| standard | coché repos | `--mr-accent` | `--mr-accent` | `--mr-on-accent` | glyphe de coche |
| standard | coché survol | `--mr-accent-hover` | `--mr-accent-hover` | `--mr-on-accent` | glyphe de coche |
| standard | indéterminé repos | `--mr-accent` | `--mr-accent` | `--mr-on-accent` | glyphe tiret horizontal |
| standard | invalide (non coché) | `--mr-bg-raised` | `--mr-danger-text` | — | `aria-invalid="true"` |
| standard | focus | état de sélection courant | bordure courante | glyphe courant | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)` |
| standard | désactivé | `--mr-bg-hover` | `--mr-border-subtle` | `--mr-text-disabled` | `cursor: not-allowed`, libellé `--mr-text-disabled` |

## Comportement et clavier
- Clic ou frappe de la touche `Espace` bascule l'état coché / non coché et émet `onCheckedChange`.
- Indéterminé : fixé via la prop `indeterminate` ; un clic passe à l'état coché (ou non coché selon le gestionnaire applicatif).
- Cible : toute la rangée (boîte + texte) est cliquable et déclenche la bascule.
- Transitions : `background-color`, `border-color`, `color` en `--mr-duration-fast` / `--mr-ease-standard`.

## Accessibilité
- Élément `<input type="checkbox">` natif ou `role="checkbox"` avec `aria-checked="true | false | mixed"`.
- Focus `:focus-visible` entourant la boîte carrée.
- En cas d'erreur : `aria-invalid="true"`, message relié par `aria-describedby`.
- Cible interactive de la rangée ≥ `--mr-min-target` (24px).
- Libellé requis (explicite ou via `aria-label`).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `checked` | `boolean` | — | état contrôlé (P5) |
| `defaultChecked` | `boolean` | `false` | état initial non contrôlé (P5) |
| `indeterminate` | `boolean` | `false` | état partiel / indéterminé |
| `onCheckedChange` | `(checked: boolean) => void` | — | futur événement DOM `checked-change` (P6) |
| `invalid` | `boolean` | `false` | état d'erreur |
| `disabled` | `boolean` | `false` | contrôle désactivé |
| `required` | `boolean` | `false` | obligatoire |
| `name` | `string` | — | participation au formulaire (P4) |
| `value` | `string` | — | valeur transmise |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | taille de la boîte |
| `className` | `string` | — | fusion de classe (P9) |
| `children` | `ReactNode` | — | libellé de la rangée |

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `tone` dans les types (Checkbox.types.ts) | retirée : l'accent est fixé par le système (7.7, P1) | oui | ligne Checkbox |
| recette : 3 valeurs en dur signalées (inventory §2.1) | tokens `--mr-checkbox-size-*`, `--mr-glyph-stroke` (T2) | non | inventory §2.1 |
| focus sur la rangée entière dans certains cas | anneau de focus centré sur la boîte (7.7) | non (visuel) | section 7.7 |

## Critères de vérification
1. Checkbox md / sm : boîte `inline-size` = `block-size` = 16px (`--mr-checkbox-size-md`).
2. Checkbox lg : boîte = 20px (`--mr-checkbox-size-lg`).
3. `border-radius` de la boîte = 4px (`--mr-radius-inline`).
4. non coché repos : fond `--mr-bg-raised` (`#ffffff`), bordure `--mr-border-control` (`#7c878a` light).
5. coché repos : fond `--mr-accent` (`#07787d` light), bordure `--mr-accent`, glyphe `--mr-on-accent` (`#ffffff`).
6. survol non coché : bordure `--mr-text-tertiary` (`#5d686b` light).
7. focus-visible : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)`, offset `var(--mr-focus-offset)`.
8. désactivé : fond `--mr-bg-hover`, bordure `--mr-border-subtle`, libellé `--mr-text-disabled`, `cursor` = `not-allowed`.
9. clavier : touche `Espace` bascule `aria-checked` et émet `onCheckedChange`.
10. rangée cliquable avec `min-block-size` ≥ 24px (`--mr-min-target`).

## Interdits
- Jamais d'opacité sur l'état désactivé.
- Jamais de prop `tone` pour modifier la couleur d'accent d'une case à cocher.
- Jamais de boîte sans bordure de 1px (la bordure garantit la visibilité en contraste forcé).
- Pas de clic réservé à la seule boîte quand un libellé est fourni (la rangée entière est cible).
