# PageHeader
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Ouvre une page (fil d'Ariane, titre, description, actions) quand le contexte et les actes doivent être visibles d'emblée. Retenir la Topbar pour la navigation applicative.

## Anatomie
Bloc : label instrument (fil d'Ariane), titre `h1`, description `body` en `text-secondary`, actions alignées à droite (Button `primary` + Button `ghost` au plus).

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | label | `--mr-type-label` | 11px / 16px, mono, majuscules | 11px / 16px, mono, majuscules |
| toutes | titre | `--mr-type-h1` | 24px / 32px, 600 | 24px / 32px, 600 |
| toutes | description | `--mr-type-body` | 14px / 20px | 14px / 20px |
| toutes | écart label/titre/actions | `--mr-stack-gap` | 12px | 8px |
| toutes | écart titre/description | `--mr-spacing-2` | 8px | 8px |
| toutes | écart entre actions | `--mr-control-gap` | 8px | 6px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | hérité du parent | label `--mr-text-tertiary`, titre `--mr-text-primary`, description `--mr-text-secondary` | aucune | une seule action `primary` par zone (section 4) |

Pas d'état interactif sur le bloc ; seules les actions sont interactives (spec Button 7.1).

## Comportement et clavier
Aucune animation. Les actions suivent la spec Button (une seule `primary` visible par zone) ; le fil d'Ariane suit la spec Breadcrumb.

## Accessibilité
- Titre : un seul `h1` par page, porté par le PageHeader.
- Fil d'Ariane : `nav aria-label="Fil d'Ariane"`, page courante en `aria-current="page"`.
- Actions : libellés explicites, jamais d'icône seule sans `aria-label`.
- Contraste : titre ≥ 7:1, description ≥ 4.5:1, label ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `string` | — | fil d'Ariane en label instrument |
| `title` | `string` | requis | titre `h1` |
| `description` | `string` | — | description `body` |
| `actions` | `{ label, variant, onSelect }[]` | — | actes (une seule `primary`) |
| `as` | `'header' \| 'div'` | `'header'` | balise fermée (P3) |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onSelect` par action (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| padding dédié `--mr-page-header-padding` | écarts `--mr-stack-gap` / `--mr-spacing-2` / `--mr-control-gap` | non (visuel) | migration-table §2 |
| recette page-header : 4 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| actes locaux éventuels hors Button | Button `primary` + `ghost` (7.1), une seule `primary` | non | prompt §7.18 |
| `as` ouvert éventuel | union fermée `header \| div` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Label : 11px/16px, mono 500, majuscules, `--mr-tracking-label`, `--mr-text-tertiary`.
2. Titre : 24px/32px, 600, `letter-spacing` = `--mr-tracking-h1`, `--mr-text-primary` ; un seul `h1` par page.
3. Description : 14px/20px, `--mr-text-secondary`.
4. Écarts : label/titre/actions 12px (8px compact), titre/description 8px, entre actions 8px (6px compact).
5. Actions : au plus une `primary`, seconde en `ghost`, libellés explicites.
6. Fil d'Ariane : `nav` + `aria-label`, page courante `aria-current="page"`.
7. Aucune bordure, aucun fond, aucune ombre sur le bloc.
8. `as` : seules `header`, `div` acceptées.

## Interdits
- Jamais deux actions `primary` dans le même en-tête (section 4).
- Jamais deux `h1` sur la même page.
- Jamais d'action en icône seule sans `aria-label`.
- Jamais de fond, de bordure ou d'ombre sur le bloc.
