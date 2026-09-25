# FormSection
Statut : spec v4 — à valider
Source : prompt maître §7.4

## Rôle
Groupe logique de champs de formulaire avec titre de section, description facultative et séparateur structurel. Choisir `FormSection` pour structurer un formulaire complexe en blocs thématiques.

## Anatomie
`[label instrument] → titre h3 → [description] → corps (champs) → [Divider]`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | label instrument | `--mr-type-label` (11/16, 500, mono) | 11px / 16px | 11px / 16px |
| toutes | titre | `--mr-type-h3` (16/24, 600, sans) | 16px / 24px | 16px / 24px |
| toutes | description | `--mr-type-small` (13/20, 400, sans) | 13px / 20px | 13px / 20px |
| toutes | écart titre → description | `--mr-spacing-1` | 4px | 4px |
| toutes | écart en-tête → champs | `--mr-section-gap` | 16px | 12px |
| toutes | écart entre champs | `--mr-section-gap` | 16px | 12px |
| toutes | marge après séparateur | `--mr-spacing-6` | 24px | 24px |

## États
Composant structurel non interactif.

| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| standard | repos | transparent | titre `--mr-text-primary`, description `--mr-text-secondary`, label `--mr-text-tertiary` | — | séparateur inférieur `--mr-border-subtle` |

## Comportement et clavier
- Aucun comportement interactif propre : délègue la navigation clavier aux champs enfants.
- Pas d'animation, pas de transition d'état.

## Accessibilité
- Conteneur `<fieldset>` ou `<section aria-labelledby="...">`.
- Titre relié comme légende ou titre de région pour les lecteurs d'écran.
- Pas de piège de focus ; flux de tabulation séquentiel naturel entre champs.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `label` | `ReactNode` | — | label instrument en Geist Mono (7.4) |
| `title` | `ReactNode` | requis | titre h3 |
| `description` | `ReactNode` | — | texte d'explication small |
| `meta` | `ReactNode` | — | métadonnée de section (conservée, règle de conservation) |
| `actions` | `ReactNode` | — | actions de section à droite du titre |
| `children` | `ReactNode` | requis | champs de formulaire |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun callback maison.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| absence de prop `label` | `label` ajouté pour le label instrument en Geist Mono (7.4) | non (ajout) | ligne FormSection |
| prop `meta` | conservée (règle de conservation : seul 7.19 renomme ou supprime) | non | ligne FormSection |
| espacement interne via CSS ad hoc | normalisé sur `--mr-section-gap` (16px / compact 12px) | non | migration-table §2 |
| recette form-section : 1 valeur en dur signalée (inventory §2.1) | alignée sur les tokens d'espacement (T2) | non | inventory §2.1 |

## Critères de vérification
1. titre : `font-size` = 16px, `line-height` = 24px, `font-weight` = 600, `color` = `--mr-text-primary`.
2. description : `font-size` = 13px, `line-height` = 20px, `color` = `--mr-text-secondary`.
3. écart entre champs : `gap` = 16px en comfortable, 12px en compact (`--mr-section-gap`).
4. label instrument : police mono, `font-size` = 11px, `color` = `--mr-text-tertiary`, majuscules.
5. séparateur : épaisseur 1px, `background-color` ou `border-color` = `--mr-border-subtle`.

## Interdits
- Jamais de carte dans une section de formulaire (Card exclue ici).
- Jamais de titre en voix système mono (voix humaine Geist sans uniquement pour les titres).
- Aucun style interactif (survol, focus) sur le conteneur de section.
