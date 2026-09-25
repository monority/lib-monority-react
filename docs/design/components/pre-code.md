# PreCode
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5.9)

## Rôle
Affiche un bloc de code multiligne avec coloration restreinte quand l'exemple doit être lu et copié. Retenir le Kbd pour une touche et le Text `code` pour un identifiant en ligne.

## Anatomie
Bloc : en-tête facultatif (label instrument + langage + bouton Copier en CopyButton sm), corps en `code` avec numéros de ligne facultatifs, défilement horizontal.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | police | `--mr-type-code` | 13px / 20px, mono | 13px / 20px, mono |
| toutes | fond | `--mr-bg-sunken` | `#f1f5f6` light | `#f1f5f6` light |
| toutes | bordure | `--mr-border-subtle` | 1px | 1px |
| toutes | rayon | `--mr-radius-card` | 10px | 10px |
| toutes | padding | `--mr-spacing-4` | 16px | 16px |
| toutes | écart en-tête/corps | `--mr-stack-gap` | 12px | 8px |
| toutes | numéros de ligne | `--mr-type-code-sm` | 12px / 16px, `--mr-text-tertiary` | 12px / 16px, `--mr-text-tertiary` |

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | repos | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-subtle` | défilement horizontal, aucune ombre |
| unique | focus (copie) | `--mr-bg-sunken` | `--mr-text-primary` | `--mr-border-subtle` | anneau de focus sur le bouton Copier uniquement |

Coloration syntaxique uniquement avec : `accent-text`, `success-text`, `warning-text`, `danger-text`, `info-text`, `text-secondary`, `text-tertiary`. Aucune autre couleur.

## Comportement et clavier
- Copie : CopyButton sm en en-tête, `Enter` / `Espace`, confirmation « Copié » éphémère sans déplacer le focus.
- Défilement horizontal natif du corps, numéros de ligne fixes hors défilement vertical uniquement (aucune synchronisation en JS, P7).
- Aucune édition : le bloc est en lecture seule ; l'édition appartient à un champ dédié.
- Hauteur maximale par `maxLines` (prop) avec défilement vertical au-delà, jamais de troncature sans scroll.

## Accessibilité
- Bloc : `<pre>`, code : `<code>`, langage exposé en `aria-label` (« Exemple TypeScript »).
- Numéros de ligne en `aria-hidden="true"` (le code reste copiable sans numéros).
- Coloration jamais seule porteuse de sens : commentaires et structure explicites.
- Contraste : `--mr-text-primary` ≥ 7:1, coloration ≥ 4.5:1 (tons de statut et d'accent).

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `language` | `string` | — | langage pour la coloration et l'annonce |
| `title` | `string` | — | label instrument d'en-tête |
| `lineNumbers` | `boolean` | `false` | numéros de ligne |
| `maxLines` | `number` | — | hauteur maximale avant scroll vertical |
| `copyable` | `boolean` | `true` | bouton Copier |
| `children` | `string` | requis | code source (texte, jamais de JSX exécuté) |
| `className` | `string` | — | fusion (P9) |

Aucun callback propre (la copie suit la spec CopyButton).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| tokens `--mr-code-bg`, `--mr-code-fg`, `--mr-code-scrollbar`, `--mr-code-shadow`, `--mr-code-padding` utilisés mais non définis | remplacés par `--mr-bg-sunken`, `--mr-text-primary`, `--mr-border-subtle`, `--mr-radius-card`, `--mr-spacing-4` (décision phase 0 bis, S8) | non (visuel) | language.md (décisions audit) |
| prop `size` actuelle (migration §1 PreCode) | taille unique `--mr-type-code` (13px), prop supprimée | oui | migration-table §1 |
| recette pre-code : 0 valeur en dur (inventory §2.1) | aucun changement visuel requis | non | inventory §2.1 |
| coloration libre éventuelle | 7 couleurs fermées (accent, 4 statuts, secondary, tertiary) | oui (visuel) | prompt §7.18 |

## Critères de vérification
1. Police : 13px/20px, mono ; fond `--mr-bg-sunken` ; bordure 1px `--mr-border-subtle` ; rayon 10px ; padding 16px.
2. Éléments : `<pre>` + `<code>`, `aria-label` avec le langage.
3. Coloration : uniquement `accent-text`, `success-text`, `warning-text`, `danger-text`, `info-text`, `text-secondary`, `text-tertiary`.
4. Numéros de ligne : 12px/16px `--mr-text-tertiary`, `aria-hidden="true"`, exclus de la copie.
5. Copie : CopyButton sm, confirmation sans déplacement du focus.
6. Défilement : horizontal natif, aucune synchronisation en JavaScript.
7. `maxLines` : au-delà, scroll vertical, jamais de troncature sèche.
8. Contraste : texte ≥ 7:1, coloration ≥ 4.5:1, dans les 4 thèmes.

## Interdits
- Jamais de couleur de coloration hors des 7 admises.
- Jamais de JSX exécuté dans le bloc : `children` texte uniquement.
- Jamais de numéros de ligne copiés ou annoncés.
- Jamais de prop `size` : taille unique.
