# ScrollArea
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Cadre une zone à défilement (liste, panneau, code) avec des barres natives discrètes quand le contenu dépasse. Retenir le défilement de page pour le flux principal.

## Anatomie
Conteneur à débordement contrôlé (`overflow: auto` par axe via les props) : barres de défilement natives fines, contenu en flux normal.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | barres | — | natives fines (`scrollbar-width: thin`) | natives fines |
| toutes | couleur barres | `--mr-text-tertiary` | `scrollbar-color` avec fond transparent | `scrollbar-color` avec fond transparent |
| toutes | hauteur | — | prop `maxHeight` ou 100% du parent | prop `maxHeight` ou 100% du parent |

Aucun écart de densité sur les barres elles-mêmes.

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | hérité du parent | hérité du contenu | aucune | barres natives fines |
| unique | focus interne | hérité du parent | hérité du contenu | aucune | anneau de focus sur l'enfant actif uniquement |
| unique | défilement clavier | hérité du parent | hérité du contenu | aucune | la zone elle-même est focusable si aucun enfant ne l'est |

## Comportement et clavier
- Défilement natif : molette, tactile, `Flèche Haut` / `Bas`, `PageHaut` / `PageBas`, `Début` / `Fin` quand la zone a le focus.
- Zone focusable (`tabindex="0"`) uniquement si aucun enfant focusable ne permet d'y entrer.
- Aucune barre simulée en JavaScript, aucune synchronisation de position en JS (P7).
- Propagation du défilement au parent en bout de course (comportement natif conservé).

## Accessibilité
- Zone focusable : `role="region"` + `aria-label` nommant le contenu défilant.
- Enfants focusables : la zone ne prend pas le focus à leur place (un seul arrêt de tabulation).
- Indicateur de position : barres natives du navigateur, jamais masquées sans équivalent.
- Mouvement réduit : aucun défilement animé en JavaScript.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `axis` | `'vertical' \| 'horizontal' \| 'both'` | `'vertical'` | axes de défilement |
| `maxHeight` | `string \| number` | — | hauteur maximale avant défilement |
| `aria-label` | `string` | — | nom requis si la zone est focusable |
| `as` | `'div' \| 'section'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | contenu défilant |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif au sens P6).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| barres simulées ou masquées éventuelles | barres natives fines, `scrollbar-color` `--mr-text-tertiary` | non (visuel) | prompt §7.18 |
| recette scroll-area : 0 valeur en dur (inventory §2.1) | aucun changement visuel requis | non | inventory §2.1 |
| zone focusable sans nom éventuelle | `role="region"` + `aria-label` quand focusable | non | prompt §7.18 |
| `as` ouvert éventuel | union fermée `div \| section` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Barres : natives, `scrollbar-width` = `thin`, `scrollbar-color` avec `--mr-text-tertiary`.
2. Aucune barre simulée en JavaScript, aucune position lue ou écrite en JS (P7).
3. Zone focusable uniquement sans enfant focusable ; alors `role="region"` + `aria-label`.
4. Clavier : flèches, `PageHaut` / `PageBas`, `Début` / `Fin` déplacent le contenu au focus.
5. Un seul arrêt de tabulation pour entrer dans la zone.
6. `axis` : seul l'axe demandé défile, l'autre reste visible sans barre.
7. `as` : seules `div`, `section` acceptées.
8. Aucun masquage de barre sans équivalent, aucun défilement animé en JS.

## Interdits
- Jamais de barre de défilement simulée en JavaScript.
- Jamais de zone focusable sans `aria-label`.
- Jamais de masquage des barres natives sans équivalent accessible.
- Jamais de `as` hors union fermée.
