# Accordion
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.9 typographie)

## Rôle
Regroupe plusieurs sections repliables empilées quand l'espace vertical est contraint et qu'une seule section mérite l'attention à la fois. Retenir le Collapsible pour une section isolée.

## Anatomie
Liste verticale : déclencheur par section (titre en `small-strong`, chevron comme le Select en fin de ligne), séparateur `border-subtle` entre sections, contenu repliable sous son déclencheur.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | hauteur déclencheur | `--mr-control-size-sm` | 32px | 28px |
| md | hauteur déclencheur | `--mr-control-size-md` | 40px | 32px |
| lg | hauteur déclencheur | `--mr-control-size-lg` | 48px | 40px |
| toutes | chevron | `--mr-icon-size-md` | 16px | 16px |
| toutes | écart titre/chevron | `--mr-control-gap` | 8px | 6px |
| toutes | padding contenu (bloc) | `--mr-spacing-3` | 12px | 12px |
| toutes | padding contenu (inline) | `--mr-spacing-4` | 16px | 16px |
| toutes | séparateur | `--mr-border-width` | 1px | 1px |
| toutes | titre | `--mr-type-small-strong` | 13px / 20px, 500 | 13px / 20px, 500 |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | transparent | `--mr-text-primary` | séparateur `--mr-border-subtle` | chevron `currentColor` |
| unique | survol | `--mr-bg-hover` | `--mr-text-primary` | séparateur `--mr-border-subtle` | aucun soulignement |
| unique | pression | `--mr-bg-active` | `--mr-text-primary` | séparateur `--mr-border-subtle` | aucune transformation |
| unique | focus | selon état | `--mr-text-primary` | séparateur `--mr-border-subtle` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `--mr-focus-offset` |
| unique | désactivé | transparent | `--mr-text-disabled` | séparateur `--mr-border-subtle` | `cursor: not-allowed`, chevron `--mr-text-disabled` |
| unique | section ouverte | transparent | `--mr-text-primary` | séparateur `--mr-border-subtle` | chevron tourné à 180°, contenu visible |

## Comportement et clavier
- Clic ou `Enter` / `Espace` sur un déclencheur bascule sa section et émet `onValueChange`.
- Rotation du chevron : 180° en `--mr-duration-fast` / `--mr-ease-standard`, comme le Select.
- Contenu animé en opacité uniquement (`opacity`, `--mr-duration-base` / `--mr-ease-standard`) ; jamais d'animation de dimension ou de position.
- `type="single"` : une seule section ouverte ; `type="multiple"` : cumul autorisé.
- Déclencheurs atteignables par `Tab`, dans l'ordre visuel.

## Accessibilité
- Déclencheur : `<button aria-expanded="true | false" aria-controls="contenu-id">`.
- Contenu : `role="region"`, `aria-labelledby` vers son déclencheur, masqué par `hidden` quand replié.
- Section désactivée : `disabled` natif sur le déclencheur.
- Contraste : titre `--mr-text-primary` ≥ 7:1, chevron décoratif en `aria-hidden="true"`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `type` | `'single' \| 'multiple'` | `'single'` | cumul des sections ouvertes |
| `value` | `string \| string[]` | — | section(s) ouverte(s) (contrôlé, P5) |
| `defaultValue` | `string \| string[]` | — | section(s) ouverte(s) initiale(s) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | hauteur des déclencheurs (P1) |
| `items` | `{ value, title, content, disabled? }[]` | requis | sections pilotées par données (P2) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(value)` et futur événement DOM `value-change` (P6). `onChange` réservé au natif.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| callback `onChange` (migration §1 Accordion) | `onValueChange` + événement `value-change` (P6) | oui | migration-table §1 |
| paddings dédiés `--mr-collapsible-content-padding-block`, `--mr-collapsible-content-padding-inline`, `--mr-collapsible-trigger-padding-block`, `--mr-collapsible-trigger-padding-inline` | `--mr-spacing-3` / `--mr-spacing-4` et `--mr-control-size-*` | non (visuel) | migration-table §2 |
| recette accordion : 4 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| durées et courbes locales éventuelles | `--mr-duration-fast` / `--mr-duration-base`, `--mr-ease-standard`, opacité seule | non | migration-table §2 (5.16 approx) |

## Critères de vérification
1. Déclencheur md : `block-size` = 40px en comfortable, 32px en compact ; sm 32px / 28px ; lg 48px / 40px.
2. Titre : `font` 13px/20px `font-weight` 500 ; chevron 16px × 16px, `vector-effect: non-scaling-stroke`.
3. Séparateur : `border-bottom-width` = 1px, `border-color` = `--mr-border-subtle` (`#dde4e6` light).
4. Survol : `background-color` = `--mr-bg-hover` ; pression : `--mr-bg-active` ; aucune transformation.
5. Focus : `outline-width` = 2px, `outline-color` = `--mr-focus-color`, `outline-offset` = 2px, uniquement sur `:focus-visible`.
6. Section ouverte : `aria-expanded="true"`, chevron `rotate(180deg)` ; fermée : `aria-expanded="false"`, contenu `hidden`.
7. Contenu : `transition-property` = `opacity` seule, durée 180ms, courbe `--mr-ease-standard`.
8. Désactivé : `color` = `--mr-text-disabled`, `cursor` = `not-allowed`, aucun changement au survol.

## Interdits
- Jamais d'animation de hauteur, de marge ou de position du contenu : opacité uniquement.
- Jamais de chevron dessiné hors `currentColor` ni de taille hors 16px.
- Jamais de section ouverte sans `aria-expanded` ni de contenu replié sans `hidden`.
- Jamais de prop « mode » qui bascule vers un autre composant (P8).
