# Container
Statut : spec v4 — à valider
Source : prompt maître §7.18 (base §5 tokens seuls)

## Rôle
Centre le contenu de page avec une largeur maximale et des marges latérales quand la ligne doit rester lisible sur grand écran. Retenir la Section pour un bloc rythmé sans contrainte de largeur.

## Anatomie
Conteneur unique centré (`margin-inline: auto`) : largeur maximale, padding latéral, enfant en flux normal.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| toutes | largeur maximale | `--mr-page-max-width` | 1440px | 1440px |
| toutes | padding latéral | `--mr-page-padding` | 24px (16px sous 640px) | 24px (16px sous 640px) |
| toutes | centrage | — | `margin-inline: auto` | `margin-inline: auto` |

Aucun écart de densité : mêmes valeurs en compact (5.13 ne liste pas le conteneur).

## États
| Variante | État | Fond | Texte | Bordure | Autre (rail, glyphe, ombre) |
|---|---|---|---|---|---|
| unique | unique | hérité du parent | hérité du parent | aucune | centrage conservé à toute largeur |

Pas d'état interactif : conteneur de mise en page uniquement.

## Comportement et clavier
Aucune interaction, aucune animation. Sous 640px le padding passe à 16px ; largeur minimale supportée 320px sans défilement horizontal de la page (5.14).

## Accessibilité
- Conteneur neutre : aucun rôle implicite modifié, jamais focusable pour lui-même.
- Repère principal : `as="main"` atterrit le contenu principal une seule fois par page.
- Aucun contenu masqué par le centrage à 320px de large.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `as` | `'div' \| 'main' \| 'section'` | `'div'` | balise fermée (P3) |
| `children` | `ReactNode` | requis | contenu centré |
| `className` | `string` | — | fusion (P9) |

Aucun callback (composant non interactif).

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| largeurs et padding dédiés `--mr-container-sm`, `--mr-container-md`, `--mr-container-lg`, `--mr-container-padding-inline`, `--mr-content-max-width` | `--mr-page-max-width` (1440px), `--mr-page-padding` (24px, 16px sous 640px) | non (visuel) | migration-table §2 |
| recette container : 1 valeur en dur signalée (inventory §2.1) | tokens de l'échelle (T2) | non | inventory §2.1 |
| `as` ouvert éventuel | union fermée `div \| main \| section` (P3) | oui (type) | prompt §7.18 |

## Critères de vérification
1. Largeur maximale : 1440px ; `margin-inline` = `auto`.
2. Padding latéral : 24px, 16px sous 640px.
3. Page à 320px : aucun défilement horizontal.
4. Aucune bordure, aucun fond, aucun rayon, aucune ombre.
5. `as="main"` : un seul par page, rôle principal conservé.
6. `as` : seules `div`, `main`, `section` acceptées.
7. Conteneur : aucun rôle ajouté, aucun `tabindex`.
8. Valeurs identiques en `data-density="compact"`.

## Interdits
- Jamais de largeur maximale hors `--mr-page-max-width`, jamais de padding hors `--mr-page-padding`.
- Jamais de `as` hors union fermée.
- Jamais de fond, de bordure ou d'ombre sur le conteneur.
- Jamais de défilement horizontal induit par le conteneur à 320px.
