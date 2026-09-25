# Collapsible
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.9 typographie)

## Rôle
Replie une section isolée de contenu secondaire sous un déclencheur quand la page doit rester courte. Retenir l'Accordion pour un empilement de sections.

## Anatomie
Déclencheur unique (titre en `small-strong`, chevron comme le Select en fin de ligne), contenu repliable sous le déclencheur.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| md | hauteur déclencheur | `--mr-control-size-md` | 40px | 32px |
| toutes | chevron | `--mr-icon-size-md` | 16px | 16px |
| toutes | écart titre/chevron | `--mr-control-gap` | 8px | 6px |
| toutes | padding contenu (bloc) | `--mr-spacing-3` | 12px | 12px |
| toutes | padding contenu (inline) | `--mr-spacing-4` | 16px | 16px |
| toutes | titre | `--mr-type-small-strong` | 13px / 20px, 500 | 13px / 20px, 500 |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | transparent | `--mr-text-primary` | aucune | chevron `currentColor` |
| unique | survol | `--mr-bg-hover` | `--mr-text-primary` | aucune | aucun soulignement |
| unique | pression | `--mr-bg-active` | `--mr-text-primary` | aucune | aucune transformation |
| unique | focus | selon état | `--mr-text-primary` | aucune | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset `--mr-focus-offset` |
| unique | désactivé | transparent | `--mr-text-disabled` | aucune | `cursor: not-allowed` |
| unique | ouvert | transparent | `--mr-text-primary` | aucune | chevron tourné à 180°, contenu visible |

## Comportement et clavier
- Clic ou `Enter` / `Espace` bascule l'ouverture et émet `onOpenChange`.
- Rotation du chevron : 180° en `--mr-duration-fast` / `--mr-ease-standard`, comme le Select.
- Contenu animé en opacité uniquement (`opacity`, `--mr-duration-base` / `--mr-ease-standard`) ; jamais d'animation de dimension ou de position.
- États contrôlé (`open`) et non contrôlé (`defaultOpen`) selon P5.

## Accessibilité
- Déclencheur : `<button aria-expanded="true | false" aria-controls="contenu-id">`.
- Contenu : `role="region"`, `aria-labelledby` vers le déclencheur, masqué par `hidden` quand replié.
- Contraste : titre `--mr-text-primary` ≥ 7:1 ; chevron décoratif en `aria-hidden="true"`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `open` | `boolean` | — | ouverture contrôlée (P5) |
| `defaultOpen` | `boolean` | `false` | ouverture initiale |
| `title` | `ReactNode` | requis | libellé du déclencheur |
| `children` | `ReactNode` | requis | contenu repliable |
| `disabled` | `boolean` | `false` | déclencheur inactif (P1) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onOpenChange(open)` et futur événement DOM `open-change` (P6). Callbacks P6 déjà conformes.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| paddings dédiés `--mr-collapsible-content-padding-block`, `--mr-collapsible-content-padding-inline`, `--mr-collapsible-trigger-padding-block`, `--mr-collapsible-trigger-padding-inline` | `--mr-spacing-3` / `--mr-spacing-4` et `--mr-control-size-md` | non (visuel) | migration-table §2 |
| recette collapsible : 5 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| durées et courbes locales éventuelles | `--mr-duration-fast` / `--mr-duration-base`, `--mr-ease-standard`, opacité seule | non | migration-table §2 (5.16 approx) |
| callbacks `onOpenChange` déjà conformes | conservés, événement `open-change` (P6) | non | migration-table §1 |

## Critères de vérification
1. Déclencheur : `block-size` = 40px en comfortable, 32px en compact.
2. Titre : 13px/20px, `font-weight` 500 ; chevron 16px × 16px en `currentColor`.
3. Survol : `background-color` = `--mr-bg-hover` ; pression : `--mr-bg-active` ; aucune transformation.
4. Focus : `outline` 2px `--mr-focus-color`, offset 2px, uniquement sur `:focus-visible`.
5. Ouvert : `aria-expanded="true"`, chevron `rotate(180deg)` ; fermé : `aria-expanded="false"`, contenu `hidden`.
6. Contenu : `transition-property` = `opacity` seule, 180ms, `--mr-ease-standard`.
7. Padding contenu : 12px bloc, 16px inline.
8. Désactivé : `color` = `--mr-text-disabled`, `cursor` = `not-allowed`, aucun changement au survol.

## Interdits
- Jamais d'animation de hauteur, de marge ou de position du contenu : opacité uniquement.
- Jamais de contenu replié accessible au clavier ou annoncé sans `hidden`.
- Jamais de chevron hors 16px ni hors `currentColor`.
