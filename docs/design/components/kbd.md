# Kbd
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5.9)

## Rôle
Affiche une touche ou un raccourci clavier en ligne quand l'utilisateur doit le reconnaître et le rejouer. Retenir le PreCode pour un bloc de code et le Text `code` pour un identifiant.

## Anatomie
Pastille unique : glyphes en `code-sm` (ex. « ⌘ », « K » ou « Ctrl + K » avec séparateur fin), fond `sunken`, bordure `default`, rayon `inline`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | hauteur | `--mr-kbd-height` | 20px | 20px |
| toutes | padding inline | `--mr-spacing-1-5` | 6px | 6px |
| toutes | police | `--mr-type-code-sm` | 12px / 16px, mono | 12px / 16px, mono |
| toutes | fond | `--mr-bg-sunken` | `#f1f5f6` light | `#f1f5f6` light |
| toutes | bordure | `--mr-border-default` | 1px | 1px |
| toutes | rayon | `--mr-radius-inline` | 4px | 4px |
| toutes | écart glyphe/texte | `--mr-spacing-1-5` | 6px | 6px |

Le Kbd ne dépend pas de la densité (5.13) : mêmes valeurs en compact.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | `--mr-bg-sunken` | `--mr-text-secondary` | `--mr-border-default` | glyphes `currentColor`, `aria-hidden` si libellé adjacent |

Pas d'état interactif : indicateur uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. Le Kbd décrit un raccourci, il ne le déclenche jamais ; le déclenchement appartient au composant qui l'affiche (Tooltip, menu, dialog).

## Accessibilité
- Élément `<kbd>`, contenu en texte réel (glyphe Unicode ou libellé, jamais une image).
- Contexte : le raccourci est annoncé avec son action (« Enregistrer, Ctrl + S »), le Kbd seul ne porte pas l'action.
- Contraste : `--mr-text-secondary` sur `--mr-bg-sunken` ≥ 4.5:1.
- Séquence multi-touches : séparateur textuel (« + »), chaque touche dans son `<kbd>`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `keys` | `string \| string[]` | requis | touches (`'Ctrl+K'`, `['Ctrl', 'K']`) |
| `as` | `'kbd' \| 'span'` | `'kbd'` | balise fermée (P3) |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| prop `size` actuelle (migration §1 Kbd) | taille unique `--mr-kbd-height` (20px), prop supprimée | oui | migration-table §1 |
| recette kbd : 2 valeurs en dur signalées (inventory §2.1) | `--mr-type-code-sm`, `--mr-kbd-height`, `--mr-radius-inline` (T2) | non | inventory §2.1 |
| fond et bordure locaux éventuels | `--mr-bg-sunken`, `--mr-border-default` | non (visuel) | migration-table §2 |

## Critères de vérification
1. Hauteur : 20px, inchangée en compact ; padding inline 6px.
2. Police : 12px/16px, mono, `--mr-text-secondary` sur `--mr-bg-sunken`.
3. Bordure : 1px `--mr-border-default` ; rayon 4px ; aucune ombre.
4. Élément `<kbd>` par touche, séparateur « + » textuel entre touches.
5. Glyphes : `currentColor`, jamais d'image de touche.
6. Contraste : ≥ 4.5:1 sur `--mr-bg-sunken` dans les 4 thèmes.
7. Aucun `tabindex`, aucun rôle interactif, aucun gestionnaire.
8. Prop `size` refusée : taille unique.

## Interdits
- Jamais de Kbd cliquable qui déclenche le raccourci : indicateur uniquement.
- Jamais de taille hors 20px, jamais de police hors `code-sm`.
- Jamais d'image de touche : texte réel uniquement.
- Jamais de prop `size` : taille unique.
