# Modal
Statut : spec v4 — à valider
Source : prompt maître §7.12

## Rôle
Boîte de dialogue modale interrompant le flux applicatif pour une tâche ciblée ou une saisie concentrée. Choisir `AlertDialog` si l'action exige une confirmation sans échappatoire passive, `Drawer` pour un panneau latéral d'exploration ou d'édition longue.

## Anatomie
`Voile (::backdrop) → Panneau <dialog> → En-tête (label instrument facultatif + titre h2 + description small) → Corps (children) → Pied (actions alignées à droite, action principale en dernier)`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| sm | max-inline-size | `--mr-dialog-width-sm` | 400px | 400px |
| md | max-inline-size | `--mr-dialog-width-md` | 540px | 540px |
| lg | max-inline-size | `--mr-dialog-width-lg` | 720px | 720px |
| toutes | max-inline-size absolu | `calc(100vw - 32px)` | 100vw − 32px | 100vw − 32px |
| toutes | max-block-size absolu | `calc(100dvh - 64px)` | 100dvh − 64px | 100dvh − 64px |
| toutes | padding panneau | `--mr-spacing-6` | 24px | 24px |
| toutes | border-radius | `--mr-radius-overlay` | 12px | 12px |
| toutes | bordure | `--mr-border-default` | 1px solid | 1px solid |
| toutes | ombre | `--mr-shadow-overlay` | ombre overlay | ombre overlay |
| toutes | voile | `--mr-scrim` | neutre 40 % (light) | noir 60 % (dark) |
| toutes | titre | `--mr-type-h2` | 18px / 24px, 600, sans | 18px / 24px, 600, sans |
| toutes | description | `--mr-type-small` | 13px / 20px, 400, sans | 13px / 20px, 400, sans |
| toutes | écart titre → description | `--mr-spacing-1` | 4px | 4px |
| toutes | écart en-tête → corps | `--mr-spacing-4` | 16px | 16px |
| toutes | écart corps → pied | `--mr-spacing-4` | 16px | 16px |
| toutes | écart entre boutons de pied | `--mr-spacing-2` | 8px | 8px |

## États
| Variante | État | Fond | Texte | Bordure | Autre |
|---|---|---|---|---|---|
| dialogue | ouvert | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | voile `::backdrop` `--mr-scrim`, ombre `--mr-shadow-overlay` |
| dialogue | fermeture | `--mr-bg-overlay` | `--mr-text-primary` | `--mr-border-default` | disparition en `--mr-duration-fast` |

## Comportement et clavier
- Ouvert via l'API native `<dialog>` : méthode `.showModal()`, sans aucun portail React (C6).
- Apparition : transition d'opacité et de translation verticale `opacity: 0 -> 1` et `transform: translateY(8px) -> translateY(0)` sur `--mr-duration-slow` (240ms) avec la courbe `--mr-ease-enter`.
- Disparition : `opacity: 1 -> 0` sur `--mr-duration-fast` (120ms) avec `--mr-ease-exit`.
- Touche `Escape` : referme la modale nativement et restitue le focus à l'élément déclencheur.
- Clic sur le voile `::backdrop` referme la modale par défaut.
- Piège de focus : assuré nativement par le navigateur (`showModal()` bloque la tabulation en dehors).

## Accessibilité
- Élément `<dialog>` natif avec attribut `aria-labelledby` pointant sur le titre h2 et `aria-describedby` pointant sur la description.
- Restitution automatique du focus au déclencheur à la fermeture.
- Verrouillage du défilement de l'arrière-plan sans saccade de mise en page (scrollbar gutter conservé).
- Bouton de fermeture d'en-tête (IconButton ghost sm) avec `aria-label="Fermer"`.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `open` | `boolean` | — | état d'ouverture contrôlé (P5) |
| `defaultOpen` | `boolean` | `false` | état initial non contrôlé (P5) |
| `onOpenChange` | `(open: boolean) => void` | — | futur événement DOM `open-change` (P6) |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | largeur maximale |
| `title` | `ReactNode` | requis | titre h2 de la boîte de dialogue |
| `description` | `ReactNode` | — | texte d'explication sous le titre |
| `label` | `ReactNode` | — | label instrument en Geist Mono |
| `footer` | `ReactNode` | — | rangée d'actions en pied de boîte |
| `children` | `ReactNode` | requis | contenu principal |
| `className` | `string` | — | fusion de classe (P9) |

Les callbacks `onClose` et `onCancel` sont dépréciés au profit de `onOpenChange(false)` (7.12).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| `onClose` sur Modal (types / inventory) | `onOpenChange(open)` (7.12, P6) | oui | ligne Modal |
| portail JavaScript custom via `createPortal` | élément `<dialog>` natif avec `.showModal()` (3, C6) | non | section 3 |
| tokens `--mr-modal-radius`, `--mr-modal-width`, `--mr-modal-padding` | `--mr-radius-overlay`, `--mr-dialog-width-md`, `--mr-spacing-6` (mappés exacts, 5.16) | non | migration-table §2 |
| recette modal : 1 valeur en dur signalée (inventory §2.1) | tokens `--mr-dialog-width-*`, `--mr-spacing-6` (T2) | non | inventory §2.1 |

## Critères de vérification
1. Modal md : `max-inline-size` = 540px (`--mr-dialog-width-md`) ; sm : 400px ; lg : 720px.
2. élément racine = `<dialog>` ouvert par `showModal()`, sans aucun `createPortal`.
3. fond = `--mr-bg-overlay` (`#ffffff` light), bordure = 1px solid `--mr-border-default` (`#ccd4d7` light).
4. `border-radius` = 12px (`--mr-radius-overlay`), padding = 24px (`--mr-spacing-6`).
5. voile `::backdrop` : fond `--mr-scrim`.
6. titre : `font-size` = 18px, `line-height` = 24px, `font-weight` = 600 (`--mr-type-h2`).
7. description : `font-size` = 13px, `line-height` = 20px, `color` = `--mr-text-secondary`.
8. apparition : durée `--mr-duration-slow` (240ms), courbe `--mr-ease-enter`.
9. disparition : durée `--mr-duration-fast` (120ms), courbe `--mr-ease-exit`.
10. `Escape` referme la boîte et replace le focus sur le déclencheur.

## Interdits
- Jamais de `createPortal` pour le rendu de la boîte modale (C6).
- Jamais de boutons d'action principale à gauche du pied (actions à droite, principale en dernier).
- Jamais d'animation de dimension de la boîte lors de l'ouverture (translation et opacité seules).
- Pas de débordement de fenêtre sur petits écrans (contraintes `calc(100vw - 32px)` et `calc(100dvh - 64px)` strictes).
