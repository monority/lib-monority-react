# EmptyState
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §7.13)

## Rôle
Explique une absence de contenu (vide, chargement, erreur) au centre d'une zone et propose une sortie. Absorbe l'ancien AsyncStateNotice via la prop `state` (7.19). Retenir le Callout pour un message lié au contenu affiché.

## Anatomie
Bloc centré : label instrument (contexte), illustration ou icône neutre facultative, titre `h3`, description `small` en `text-secondary`, action en Button `secondary`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | écart vertical interne | `--mr-stack-gap` | 12px | 8px |
| toutes | padding bloc | `--mr-spacing-6` | 24px | 24px |
| toutes | label | `--mr-type-label` | 11px / 16px, mono, majuscules | 11px / 16px, mono, majuscules |
| toutes | titre | `--mr-type-h3` | 16px / 24px, 600 | 16px / 24px, 600 |
| toutes | description | `--mr-type-small` | 13px / 20px | 13px / 20px |
| toutes | icône | `--mr-icon-size-lg` | 20px | 20px |
| toutes | hauteur minimale de zone | `--mr-table-empty-height` | 120px | 120px |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| empty | unique | transparent | titre `--mr-text-primary`, description `--mr-text-secondary` | aucune | icône `--mr-text-tertiary` |
| loading | unique | transparent | titre `--mr-text-primary`, description `--mr-text-secondary` | aucune | spinner à la place de l'icône, `aria-busy="true"` |
| error | unique | transparent | titre `--mr-text-primary`, description `--mr-text-secondary` | aucune | icône `--mr-danger-text`, action « Réessayer » |

## Comportement et clavier
- Aucune animation d'apparition ; l'état `loading` remplace l'icône par un Spinner sans changer la géométrie.
- Une seule action : Button `secondary`, `Enter` / `Espace`, émet `onSelect`.
- Passage `loading` → `empty` / `error` sans déplacement du focus sauf activation explicite de l'action.
- `state="error"` : l'action « Réessayer » est obligatoire.

## Accessibilité
- Zone : `role="status"` ; erreur : `role="alert"`.
- Chargement : `aria-busy="true"` sur la zone parente, annoncé une seule fois.
- Icône décorative en `aria-hidden="true"` ; l'état est porté par le titre, jamais par l'icône seule.
- Contraste : titre ≥ 7:1, description `--mr-text-secondary` ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `state` | `'empty' \| 'loading' \| 'error'` | `'empty'` | état (absorbe AsyncStateNotice) |
| `title` | `string` | requis | titre `h3` |
| `description` | `string` | — | description `small` |
| `action` | `{ label, onSelect }` | — | action unique Button `secondary` |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onSelect` pour l'action (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| composant AsyncStateNotice maintenu à part | fusion 7.19 : EmptyState `state`, alias déprécié + avertissement en dev | oui | migration-table §1 et §7.19 |
| recette empty-state : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| action locale éventuelle hors Button | Button `secondary` unique (7.1) | non | prompt §7.18 |
| état de chargement sans `aria-busy` éventuel | `aria-busy="true"`, `role="status"` | non | prompt §7.18 |

## Critères de vérification
1. Label : 11px/16px, mono 500, majuscules, `letter-spacing` = `--mr-tracking-label`, `color` = `--mr-text-tertiary`.
2. Titre : 16px/24px, 600, `color` = `--mr-text-primary` ; description 13px/20px `--mr-text-secondary`.
3. Écart vertical interne : 12px en comfortable, 8px en compact ; padding 24px.
4. Hauteur minimale de zone : 120px.
5. `state="loading"` : Spinner visible, `aria-busy="true"`, géométrie inchangée.
6. `state="error"` : icône `--mr-danger-text`, `role="alert"`, action « Réessayer » présente.
7. Action : Button `secondary` unique, émet `onSelect`.
8. Icône : 20px × 20px, `aria-hidden="true"`, `--mr-text-tertiary` en état vide.

## Interdits
- Jamais plus d'une action, jamais d'action `primary`.
- Jamais d'état sans titre explicite : l'icône ne suffit pas.
- Jamais de rôle `alert` pour les états vide et chargement : `status` uniquement.
- Jamais de changement de géométrie entre les trois états.
