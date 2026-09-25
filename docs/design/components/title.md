# Title
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5.9)

## Rôle
Affiche un titre de niveau dans la hiérarchie de la page quand le niveau structure le document. Retenir le Text pour un texte sans niveau et le PageHeader pour le titre de page complet.

## Anatomie
Élément de titre unique : style par `variant` (display, h1, h2, h3), niveau par `as` (`h1`–`h6`).

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| display | police | `--mr-type-display` | 32px / 40px, 600, `--mr-tracking-display` | 32px / 40px, 600, `--mr-tracking-display` |
| h1 | police | `--mr-type-h1` | 24px / 32px, 600, `--mr-tracking-h1` | 24px / 32px, 600, `--mr-tracking-h1` |
| h2 | police | `--mr-type-h2` | 18px / 24px, 600 | 18px / 24px, 600 |
| h3 | police | `--mr-type-h3` | 16px / 24px, 600, voix humaine | 16px / 24px, 600, voix humaine |
| toutes | couleur | `--mr-text-primary` | `#131c1f` light | `#131c1f` light |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| display / h1 / h2 / h3 | unique | transparent | `--mr-text-primary` | aucune | `letter-spacing` display / h1 selon 5.9, 0 sinon |

Pas d'état interactif : primitive de texte uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. `variant` porte le style, `as` porte le niveau : un `variant="h2"` rendu en `as="h1"` garde le style h2 avec la sémantique h1 (dissociation volontaire, à réserver aux cas justifiés).

## Accessibilité
- `as` limité à `h1`–`h6` (P3) ; un seul `h1` par page.
- Hiérarchie : aucun saut de niveau dans le même flux (`h1` puis `h3` sans `h2` refusé en revue).
- Contraste `--mr-text-primary` ≥ 7:1 sur tous les fonds de contenu (5.5).
- Titre lien ou interactif : rôle et focus portés par l'enfant interactif, jamais par le Title lui-même.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `variant` | `'display' \| 'h1' \| 'h2' \| 'h3'` | `'h2'` | style de 5.9 |
| `as` | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'h5' \| 'h6'` | `'h2'` | niveau fermé (P3) |
| `children` | `ReactNode` | requis | intitulé |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `size` actuelle (migration §1 Title) | absorbée par `variant` (display, h1, h2, h3) | oui | migration-table §1 |
| `as` ouvert (migration §1 Title) | union fermée `h1`–`h6` (P3) | oui (type) | migration-table §1 |
| tailles locales éventuelles | `--mr-type-display` / `--mr-type-h1` / `--mr-type-h2` / `--mr-type-h3` (5.9) | non (visuel) | migration-table §2 (`--mr-text-*` → déprécié) |
| recette title : 2 valeurs en dur signalées (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |

## Critères de vérification
1. Styles : display 32px/40px, h1 24px/32px, h2 18px/24px, h3 16px/24px, tous 600 voix humaine.
2. Interlettrage : display `--mr-tracking-display` (-0.02em), h1 `--mr-tracking-h1` (-0.01em), h2/h3 0.
3. Couleur : `--mr-text-primary` unique, aucun ton, aucune autre couleur.
4. `as` : seuls `h1` à `h6` acceptés ; un seul `h1` par page.
5. Tailles en `rem`, aucune taille hors 18 / 24 / 32 pour les titres.
6. Aucun saut de niveau de titre dans le même flux.
7. Aucune ombre, aucun fond, aucune bordure sur l'élément.
8. Title jamais interactif : ni `tabindex`, ni rôle, ni gestionnaire.

## Interdits
- Jamais de `as` hors `h1`–`h6`, jamais de titre via Text.
- Jamais de style hors display / h1 / h2 / h3.
- Jamais de couleur hors `--mr-text-primary`.
- Jamais de saut de niveau de titre dans le même flux.
