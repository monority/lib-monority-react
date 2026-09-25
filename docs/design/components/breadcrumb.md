# Breadcrumb
Statut : spec v4 — à valider
Source : prompt maître §7.16

## Rôle
Fil d'Ariane textuel matérialisant l'arborescence et l'emplacement de la page courante au sein du site. Choisir `NavigationMenu` pour une sélection de destination principale, `Tabs` pour basculer de vue locale.

## Anatomie
`Liste ordonnée de liens parents → Séparateurs textuels « / » en voix système mono → Page courante (non cliquable)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | police liens et page courante | `--mr-type-small` | 13px / 20px, 400, sans | 13px / 20px, 400, sans |
| toutes | police séparateur « / » | `--mr-font-mono` | 13px / 20px, 400, mono | 13px / 20px, 400, mono |
| toutes | écart lien ↔ séparateur | `--mr-spacing-2` | 8px | 8px |
| toutes | hauteur minimale de rangée | `--mr-min-target` | 24px | 24px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| lien parent | repos | transparent | `--mr-text-secondary` | — | soulignement absent |
| lien parent | survol | transparent | `--mr-text-primary` | — | soulignement textuel discret |
| lien parent | focus | transparent | `--mr-text-primary` | — | `outline: var(--mr-focus-width) solid var(--mr-focus-color)`, offset 2px |
| séparateur | passif | transparent | `--mr-text-tertiary` | — | glyphe « / » en mono |
| page courante | actif | transparent | `--mr-text-primary` | — | pas de lien, `aria-current="page"` |

## Comportement et clavier
- Tabulation séquentielle standard entre les liens parents.
- La page courante n'est pas un lien : elle ne reçoit pas le focus de tabulation et n'est pas cliquable.
- Clic sur un lien parent déclenche la navigation vers le niveau hiérarchique correspondant.

## Accessibilité
- Structure sémantique : `<nav aria-label="Fil d'Ariane">` avec `<ol>` et `<li>`.
- Page courante : portée par un élément `<span>` avec l'attribut `aria-current="page"`.
- Séparateurs : munis de `aria-hidden="true"` pour ne pas polluer la lecture vocale.
- Contraste : lien parent `--mr-text-secondary` ≥ 4.5:1, page courante `--mr-text-primary` ≥ 7:1.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ label: ReactNode, href?: string }>` | requis | éléments hiérarchiques ordonnés (P2) |
| `separator` | `ReactNode` | `'/'` | caractère ou symbole séparateur |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun callback propre (les liens déclenchent la navigation native).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| séparateurs en styles hétérogènes | séparateur « / » en `--mr-text-tertiary` mono (7.16) | non (visuel) | section 7.16 |
| page courante parfois balisée en ancre inactive | page courante sans lien avec `aria-current="page"` (7.16) | non (accessibilité) | section 7.16 |
| recette breadcrumb : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-type-small`, `--mr-spacing-2` (T2) | non | inventory §2.1 |

## Critères de vérification
1. police de texte : taille = 13px, interligne = 20px, graisse = 400 (`--mr-type-small`).
2. séparateur « / » : police mono (`--mr-font-mono`), couleur = `--mr-text-tertiary` (`#5d686b` light), `aria-hidden="true"`.
3. lien parent : couleur = `--mr-text-secondary` (`#4a5558` light) ; au survol couleur = `--mr-text-primary`.
4. page courante : couleur = `--mr-text-primary` (`#131c1f` light), `aria-current="page"`, non cliquable.
5. structure : balises `<nav>`, `<ol>`, `<li>` présentes.
6. écart entre lien et séparateur = 8px (`--mr-spacing-2`).
7. lien parent focusable : `outline` = `var(--mr-focus-width) solid var(--mr-focus-color)` avec offset 2px.
8. hauteur minimale de rangée ≥ 24px (`--mr-min-target`) ; dernier élément sans lien cliquable.
9. ordre de tabulation : les liens parents sont atteignables dans l'ordre du tableau `items`, page courante exclue.

## Interdits
- Jamais de lien cliquable sur la page courante (la page active n'a pas de destination).
- Jamais de séparateurs vocalisés par les lecteurs d'écran (`aria-hidden="true"` obligatoire).
- Jamais d'icône séparatrice saturée ou voyante.
