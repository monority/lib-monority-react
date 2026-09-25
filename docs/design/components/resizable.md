# Resizable
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Partage l'espace entre deux panneaux par une poignée déplaçable quand l'utilisateur doit ajuster la répartition. Retenir des largeurs fixes pour une répartition imposée.

## Anatomie
Conteneur : premier panneau, poignée (zone de saisie 8px, trait visible 1px), second panneau ; orientation horizontale ou verticale.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | zone de saisie poignée | `--mr-spacing-2` | 8px | 8px |
| toutes | trait poignée | `--mr-border-default` | 1px | 1px |
| toutes | écart panneaux/poignée | — | 0 (poignée mitoyenne) | 0 (poignée mitoyenne) |
| toutes | tailles | — | props `defaultSize`, `minSize`, `maxSize` (fractions) | props `defaultSize`, `minSize`, `maxSize` |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| poignée | repos | transparent | — | trait 1px `--mr-border-default` | zone de saisie 8px, `cursor: col-resize` / `row-resize` |
| poignée | survol | transparent | — | trait 1px `--mr-accent-border` | aucun déplacement sans saisie |
| poignée | focus / saisie | transparent | — | trait 1px `--mr-focus-color` | `outline: var(--mr-focus-width) solid var(--mr-focus-color)` si focus clavier |
| panneau | borne atteinte | hérité du contenu | hérité du contenu | aucune | poignée bloquée, annonce de la borne |

## Comportement et clavier
- Glisser de la poignée : redimensionne en continu, bornes `minSize` / `maxSize` respectées, aucune valeur lue en dehors du conteneur (P7 respecté : géométrie locale uniquement).
- Clavier : focus sur la poignée, `Flèche Gauche` / `Droite` (ou `Haut` / `Bas` en vertical) par pas de 5%, `Début` / `Fin` vers les bornes.
- Taille persistée par le parent via `onValueChange` ; le composant ne lit ni thème ni densité (P7).
- Aucune animation de la répartition : suivi direct de la saisie.

## Accessibilité
- Poignée : `role="separator"`, `aria-orientation`, `aria-valuenow` / `min` / `max` en pourcent, `aria-label` (« Redimensionner … »), focusable (`tabindex="0"`).
- Bornes annoncées en `aria-live="polite"` (« taille minimale atteinte »).
- Panneaux : `role="region"` + `aria-label` quand ils portent des contenus distincts.
- Cible : zone de saisie 8px complétée pour atteindre 24px effectifs (débordement invisible de la zone tactile).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `defaultSize` | `number` | `0.5` | fraction initiale du premier panneau |
| `minSize` | `number` | `0.2` | fraction minimale |
| `maxSize` | `number` | `0.8` | fraction maximale |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | axe de partage |
| `children` | `[ReactNode, ReactNode]` | requis | les deux panneaux |
| `className` | `string` | — | fusion (P9) |

Callbacks : `onValueChange(fraction)` et futur événement DOM `value-change` (P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| tailles `defaultSize`, `minSize`, `maxSize` actuelles (migration §1 Resizable) | conservées, fractions 0–1, événement `value-change` | non | migration-table §1 |
| recette resizable : 3 valeurs en dur signalées (inventory §2.1) | zone 8px `--mr-spacing-2`, trait 1px `--mr-border-default` (T2) | non | inventory §2.1 |
| poignée non focusable éventuelle | `role="separator"` focusable, flèches + bornes (clavier complet) | oui (comportement) | prompt §7.18 |

## Critères de vérification
1. Poignée : zone de saisie 8px, trait 1px `--mr-border-default`, `cursor` directionnel.
2. Survol : trait `--mr-accent-border` ; focus clavier : `outline` 2px `--mr-focus-color`.
3. Poignée : `role="separator"`, `aria-orientation`, `aria-valuenow/min/max`, `tabindex="0"`.
4. Flèches : pas de 5% ; `Début` / `Fin` vers `minSize` / `maxSize` (0.2 / 0.8 par défaut).
5. Bornes : blocage strict, annonce « taille minimale/maximale atteinte » en `aria-live="polite"`.
6. Glisser : suivi direct, aucune animation, bornes respectées.
7. `onValueChange` émet la fraction à chaque validation de saisie.
8. Cible tactile effective 24px par débordement invisible, sans élargir le trait visible.

## Interdits
- Jamais de poignée non focusable ni sans `aria-valuenow`.
- Jamais de trait hors 1px ni de zone de saisie hors 8px.
- Jamais de répartition animée : suivi direct de la saisie.
- Jamais de lecture du thème, de la marque ou de la densité en JavaScript (P7).
