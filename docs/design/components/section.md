# Section
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Rythme une page en blocs titrés (label instrument + titre + contenu) quand le découpage doit être annoncé. Retenir le Container pour la contrainte de largeur et le Stack pour un empilement sans titre.

## Anatomie
Bloc : label instrument (style `label`), titre `h2`, description `small` facultative, contenu en flux, écart vertical interne uniforme.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart entre sections | `--mr-section-gap` | 16px | 12px |
| toutes | écart interne titre/contenu | `--mr-stack-gap` | 12px | 8px |
| toutes | label | `--mr-type-label` | 11px / 16px, mono, majuscules | 11px / 16px, mono, majuscules |
| toutes | titre | `--mr-type-h2` | 18px / 24px, 600 | 18px / 24px, 600 |
| toutes | description | `--mr-type-small` | 13px / 20px | 13px / 20px |

Écarts pilotés par la densité (5.13).

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | hérité du parent | label `--mr-text-tertiary`, titre `--mr-text-primary`, description `--mr-text-secondary` | aucune | hiérarchie de titres respectée |

Pas d'état interactif : conteneur de mise en page uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. Le titre participe à la hiérarchie des titres de la page (un seul `h1` par page, sections en `h2` sauf imbrication justifiée).

## Accessibilité
- Région titrée : `aria-labelledby` vers le titre quand la section structure la page.
- Hiérarchie : pas de saut de niveau (`h1` puis `h3` sans `h2`) dans le même flux.
- Label instrument : texte réel (pas d'image de texte), `--mr-text-tertiary` ≥ 4.5:1.
- Contraste : titre ≥ 7:1, description ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `string` | — | label instrument |
| `title` | `string` | requis | titre `h2` |
| `description` | `string` | — | description `small` |
| `as` | `'section' \| 'div'` | `'section'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | contenu |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| padding dédié `--mr-section-padding-x` | écarts `--mr-section-gap` / `--mr-stack-gap`, largeur portée par Container | non (visuel) | migration-table §2 |
| variante `variant` et `as` ouvert (migration §1 Section) | variante supprimée, `as` union fermée `section \| div` (P3) | oui (type) | migration-table §1 |
| recette section : 3 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |

## Critères de vérification
1. Label : 11px/16px, mono 500, majuscules, `--mr-tracking-label`, `--mr-text-tertiary`.
2. Titre : 18px/24px, 600, `--mr-text-primary` ; description 13px/20px `--mr-text-secondary`.
3. Écart entre sections : 16px en comfortable, 12px en compact ; écart interne 12px / 8px.
4. Région titrée : `aria-labelledby` vers le titre quand la section structure la page.
5. Hiérarchie : aucun saut de niveau de titre dans le flux.
6. `as` : seules `section`, `div` acceptées ; `variant` refusée.
7. Aucune bordure, aucun fond, aucune ombre sur le bloc.
8. Conteneur : jamais focusable pour lui-même, aucun `tabindex`.

## Interdits
- Jamais de section sans titre : le label seul ne suffit pas.
- Jamais de saut de niveau de titre dans le même flux.
- Jamais de `variant` ni de `as` hors union fermée.
- Jamais de fond, de bordure ou d'ombre sur le bloc.
