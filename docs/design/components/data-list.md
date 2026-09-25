# DataList
Statut : spec v4 — à valider
Source : prompt maître §7.15

## Rôle
Présentation sobre de paires métadonnée clé / valeur pour des fiches de détail, des récapitulatifs ou des inspecteurs. Choisir `Table` pour comparer plusieurs éléments selon les mêmes colonnes, `Card` pour une section autonome.

## Anatomie
`Liste de rangées dl → Clé dt (style label instrument) → Valeur dd (style body) → [Séparateur border-subtle entre rangées]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | police de clé (dt) | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| comfortable | police de valeur (dd) | `--mr-type-body` | 14px / 20px, 400, sans | — |
| compact | police de valeur (dd) | `--mr-type-small` | — | 13px / 20px, 400, sans |
| toutes | écart clé → valeur (horizontal) | `--mr-spacing-4` | 16px | 12px |
| toutes | écart vertical entre rangées | `--mr-spacing-3` | 12px | 8px |
| toutes | bordure séparatrice | `--mr-border-width` | 1px | 1px |

## États
Composant d'affichage passif non interactif.

| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| standard | repos | transparent | clé `--mr-text-tertiary`, valeur `--mr-text-primary` | séparateur `--mr-border-subtle` | — |

## Comportement et clavier
- Affichage passif : aucun comportement clavier propre ; les liens ou boutons placés à l'intérieur des valeurs restent normalement accessibles au clavier.
- Disposition : horizontale (clé alignée à gauche, valeur à droite) ou verticale (clé au-dessus de la valeur).

## Accessibilité
- Balisage sémantique natif `<dl>`, `<dt>`, `<dd>`.
- Clés identifiées en voix système mono pour distinguer clairement les métadonnées des contenus réels.
- Chiffres de données formatés en `tabular-nums` si la valeur est numérique.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `items` | `Array<{ label: ReactNode, value: ReactNode, key?: string }>` | requis | paires clé / valeur (P2) |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | disposition |
| `divided` | `boolean` | `true` | présence d'une bordure de séparation |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun callback maison.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| clé parfois en police sans empattement | clé obligatoirement en style `--mr-type-label` (11px mono 500 majuscules, 7.15) | non (visuel) | section 7.15 |
| recette data-list : 2 valeurs en dur signalées (inventory §2.1) | tokens `--mr-spacing-3`, `--mr-border-subtle` (T2) | non | inventory §2.1 |

## Critères de vérification
1. élément racine = `<dl>`, clés = `<dt>`, valeurs = `<dd>`.
2. clé (dt) : police mono, taille = 11px, graisse = 500, majuscules (`--mr-type-label`), couleur `--mr-text-tertiary`.
3. valeur (dd) : police sans empattement, taille = 14px en comfortable (`--mr-type-body`), couleur `--mr-text-primary`.
4. séparateur entre rangées : 1px solid `--mr-border-subtle` (`#dde4e6` light).
5. orientation horizontale : clé et valeur sur la même rangée avec écart minimal de 16px.

## Interdits
- Jamais de clé en voix humaine variable (la clé d'un DataList est une métadonnée système en mono).
- Jamais de balisage non sémantique (divs empilées sans dl/dt/dd).
- Jamais d'ombre ou de fond teinté superflu sur les rangées.
