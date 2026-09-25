# Avatar
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5.7)

## Rôle
Identifie une personne ou une entité par image ou initiales dans une liste, un commentaire ou un en-tête. Retenir le Badge pour un statut textuel.

## Anatomie
Pastille circulaire : image cadrée (`object-fit: cover`) ou initiales centrées ; point de statut facultatif en bas à droite, à cheval sur le bord.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | diamètre | `--mr-avatar-size-sm` | 24px | 24px |
| md | diamètre | `--mr-avatar-size-md` | 32px | 32px |
| lg | diamètre | `--mr-avatar-size-lg` | 40px | 40px |
| toutes | rayon | `--mr-radius-full` | 9999px | 9999px |
| toutes | initiales | `--mr-type-small-strong` | 13px / 20px, 500 | 13px / 20px, 500 |
| toutes | point de statut | `--mr-status-dot-size` | 8px | 8px |
| toutes | bordure du point | `--mr-border-width` | 1px | 1px |

Les tokens d'avatar ne dépendent pas de la densité (5.13) : mêmes valeurs en compact.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| image | unique | — | — | aucune | image `cover`, centrée |
| initiales | unique | `--mr-bg-sunken` | `--mr-text-secondary` | aucune | initiales en majuscules, `aria-hidden="true"` si image présente |
| toutes | statut en ligne | — | — | anneau `--mr-bg-surface` 1px | point vert succès : `--mr-success-text` |
| toutes | statut absent | — | — | anneau `--mr-bg-surface` 1px | point gris : `--mr-text-tertiary` |

Pas d'état survol / pression / focus / désactivé : un avatar n'est pas interactif.

## Comportement et clavier
Aucune interaction, aucune animation, aucune transition. Si l'image échoue au chargement, repli automatique sur les initiales sans changement de géométrie.

## Accessibilité
- Image porteuse de sens : `alt` explicite (nom de la personne) ; image décorative : `alt=""`.
- Initiales : `aria-label` avec le nom complet sur le conteneur, `aria-hidden="true"` sur le texte des initiales.
- Point de statut : `aria-hidden="true"` ; le statut réel est porté par un texte adjacent, jamais par la couleur seule.
- Contraste : initiales `--mr-text-secondary` sur `--mr-bg-sunken` ≥ 4.5:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | diamètre (P1) |
| `src` | `string` | — | URL de l'image |
| `alt` | `string` | — | alternative textuelle (requis si `src`) |
| `initials` | `string` | — | initiales de repli (1 à 2 caractères) |
| `status` | `'online' \| 'offline'` | — | point de statut facultatif |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| recette avatar : 2 valeurs en dur signalées (inventory §2.1) | `--mr-avatar-size-*`, `--mr-radius-full`, `--mr-type-small-strong` (T2) | non | inventory §2.1 |
| tailles et rayons locaux éventuels | diamètres 24 / 32 / 40px, rayon `full` (5.7) | non (visuel) | migration-table §1 (aucun changement de nom) |
| fond de repli local éventuel | `--mr-bg-sunken`, texte `--mr-text-secondary` | non | migration-table §2 |

## Critères de vérification
1. Diamètres : sm 24px, md 32px, lg 40px, inchangés en compact ; `border-radius` = 9999px.
2. Image : `object-fit` = `cover`, `width`/`height` = 100% du conteneur.
3. Initiales : `font` 13px/20px, `font-weight` 500, `background-color` = `--mr-bg-sunken` (`#f1f5f6` light), `color` = `--mr-text-secondary` (`#4a5558` light).
4. Point de statut : 8px × 8px, `border-radius` = 9999px, anneau 1px `--mr-bg-surface`.
5. Image en échec : repli sur les initiales, géométrie inchangée.
6. `alt` présent quand `src` est fourni ; initiales en `aria-hidden` avec `aria-label` sur le conteneur.
7. Aucun `tabindex`, aucun rôle interactif, aucun gestionnaire de clic.
8. Aucune ombre, aucune bordure visible hors anneau du point de statut.

## Interdits
- Aucun survol, aucune pression, aucun focus, aucun état désactivé : un avatar n'est pas interactif.
- Jamais d'initiales de plus de 2 caractères ni de texte hors `small-strong`.
- Jamais le point de statut comme seul porteur d'information.
- Jamais de rayon hors `full`, jamais de déformation de l'image.
