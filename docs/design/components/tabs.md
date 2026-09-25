# Tabs
Statut : spec v4 — à valider
Source : prompt maître §7.9

## Rôle
Organisation du contenu en panneaux alternatifs accessibles via une rangée d'onglets horizontaux. Choisir `Accordion` pour des sections empilées verticalement dont plusieurs peuvent être ouvertes en même temps.

## Anatomie
`Conteneur d'onglets (bordure inférieure) → Rangée d'onglets avec rail actif inférieur → Panneau de contenu actif`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur onglet | `--mr-tabs-height` | 40px | 32px |
| toutes | padding-inline onglet | `--mr-spacing-3` | 12px | 12px |
| comfortable | police onglet | `--mr-type-body-strong` | 14px / 20px, 500, sans | — |
| compact | police onglet | `--mr-type-small-strong` | — | 13px / 20px, 500, sans |
| toutes | rail d'accent | `--mr-rail-width` | 2px | 2px |
| toutes | retrait du rail | `--mr-spacing-3` | 12px de chaque côté | 12px de chaque côté |
| toutes | bordure inférieure de rangée | `--mr-border-width` | 1px | 1px |
| toutes | padding supérieur panneau | `--mr-section-gap` | 16px | 12px |

Les onglets sont alignés à gauche sans écartement (`gap: 0`). Avec `fullWidth`, l'espace est réparti équitablement.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| onglet | inactif repos | transparent | `--mr-text-secondary` | transparent | aucun rail |
| onglet | inactif survol | transparent | `--mr-text-primary` | transparent | aucun rail |
| onglet | actif repos | transparent | `--mr-text-primary` | transparent | rail inférieur 2px `--mr-accent`, retrait 12px, superposé à la bordure |
| onglet | actif survol | transparent | `--mr-text-primary` | transparent | rail inférieur `--mr-accent` |
| onglet | focus | transparent | état courant | transparent | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, `outline-offset: -2px` |
| onglet | désactivé | transparent | `--mr-text-disabled` | transparent | aucun rail, `cursor: not-allowed` |
| conteneur | repos | transparent | — | bordure inférieure `--mr-border-subtle` | — |

## Comportement et clavier
- `role="tablist"` avec roving tabindex ; onglets `role="tab"`, panneaux `role="tabpanel"`.
- Clavier : `Flèche Droite` / `Flèche Gauche` déplace le focus et sélectionne immédiatement l'onglet suivant / précédent (activation automatique).
- `Home` / `End` : premier / dernier onglet.
- Le rail d'accent se déplace sous l'onglet actif par `transform: translateX(...)` avec une durée de `--mr-duration-base` (180ms) et la courbe `--mr-ease-standard`.
- Seul le panneau sélectionné est rendu visible dans le DOM (changement réel de contenu).

## Accessibilité
- Pattern WAI-ARIA Tabs complet : `role="tablist"`, `role="tab"`, `role="tabpanel"`.
- Chaque onglet a `aria-selected="true | false"`, `aria-controls="panel-id"`.
- Chaque panneau a `aria-labelledby="tab-id"`.
- Focus : `outline-offset: -2px` pour rester à l'intérieur de l'onglet sans mordre sur le rail.
- Cible interactive de chaque onglet ≥ `--mr-min-target` (hauteurs 40px / compact 32px).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ value: string, label: ReactNode, content: ReactNode, disabled?: boolean }>` | requis | onglets et panneaux associés (P2) |
| `value` | `string` | — | onglet actif contrôlé (P5) |
| `defaultValue` | `string` | — | onglet actif initial non contrôlé (P5) |
| `onValueChange` | `(value: string) => void` | — | futur événement DOM `value-change` (P6) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | densité/hauteur des onglets |
| `fullWidth` | `boolean` | `false` | répartition égale de la largeur |
| `className` | `string` | — | fusion de classe (P9) |

La prop `tone` est retirée : l'accent de sélection est fixé de manière unique par le système visuel (7.9).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onChange` sur Tabs (types / inventory) | `onChange` → `onValueChange` (P6) | oui | ligne Tabs |
| prop `tone` sur Tabs | retirée : l'accent est fixé par le système (7.9) | oui | ligne Tabs |
| recette tabs : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-tabs-height`, `--mr-rail-width` (T2) | non | inventory §2.1 |
| rail d'onglet en aplat ou sans retrait | rail inférieur de 2px en `--mr-accent` avec retrait `--mr-spacing-3` (signature, section 4) | non (visuel) | section 4 |

## Critères de vérification
1. hauteur de l'onglet : `block-size` = 40px en comfortable, 32px en compact (`--mr-tabs-height`).
2. bordure inférieure du conteneur : 1px solid `--mr-border-subtle` (`#dde4e6` light).
3. rail actif : pseudo-élément `block-size` = 2px, fond `--mr-accent` (`#07787d` light), retrait horizontal = 12px (`--mr-spacing-3`).
4. onglet inactif : `color` = `--mr-text-secondary` (`#4a5558` light), survol = `--mr-text-primary`.
5. onglet actif : `color` = `--mr-text-primary`, `aria-selected="true"`.
6. focus : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` avec `outline-offset: -2px`.
7. panneau : `padding-block-start` = 16px en comfortable, 12px en compact (`--mr-section-gap`).
8. clavier : `Flèche Droite` active l'onglet suivant, met à jour le panneau et émet `onValueChange`.
9. déplacement du rail : transition par `transform`, durée `--mr-duration-base` (180ms), courbe `--mr-ease-standard`.

## Interdits
- Jamais de prop `tone` pour colorer le rail ou les onglets.
- Jamais d'aplat d'accent en fond d'onglet actif (rail d'accent inférieur obligatoire, section 4).
- Jamais d'écartement (`gap > 0`) entre les onglets de la rangée.
- Jamais de masquage de panneau sans désactivation de son accessibilité (seul le panneau actif est visible).
