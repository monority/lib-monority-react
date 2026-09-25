# Divider
Statut : spec v4 — à valider
Source : prompt maître §7.17 et §7.19

## Rôle
Ligne séparatrice fine horizontale ou verticale délimitant des groupes de contenu, avec label textuel optionnel. Absorbe l'ancien composant `Separator` (7.19).

## Anatomie
`Ligne 1px solid [--mr-border-subtle] → [Label central en style label instrument] → Ligne 1px solid`.

## Dimensions
| Taille | Propriété | Token | Valeur comfortable | Valeur compact |
|---|---|---|---|---|
| horizontal | épaisseur | `--mr-border-width` | 1px | 1px |
| horizontal | largeur | `100%` | 100 % | 100 % |
| vertical | épaisseur | `--mr-border-width` | 1px | 1px |
| vertical | hauteur | `100%` ou hauteur du parent | 100 % | 100 % |
| avec label | police label | `--mr-type-label` | 11px / 16px, 500, mono | 11px / 16px, 500, mono |
| avec label | padding horizontal label | `--mr-spacing-2` | 8px | 8px |
| avec label | couleur label | `--mr-text-tertiary` | `#5d686b` (light) | `#95a1a4` (dark) |

## États
Composant structurel passif non interactif.

| Variante | État | Couleur de trait | Texte label | Bordure | Autre |
|---|---|---|---|---|---|
| horizontal | repos | `--mr-border-subtle` | `--mr-text-tertiary` | — | ligne 1px solid |
| vertical | repos | `--mr-border-subtle` | — | — | trait vertical 1px solid |

## Comportement et clavier
- Composant purement séparateur : aucun comportement clavier, aucun état dynamique.
- En disposition horizontale avec label : deux demi-lignes encadrent le texte centré.

## Accessibilité
- Si le séparateur porte un sens sémantique : balise `<hr>` ou `<div role="separator" aria-orientation="horizontal | vertical">`.
- Si le séparateur est purement décoratif : `aria-hidden="true"` ou `role="none"` / `role="presentation"`.
- Label centré : texte en voix système mono, lisible dans le flux naturel.

## API cible
| Prop | Type | Défaut | Rôle |
|---|---|---|---|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | axe de séparation |
| `decorative` | `boolean` | `true` | séparateur décoratif (masqué aux lecteurs d'écran) |
| `label` | `ReactNode` | — | texte central optionnel (horizontal uniquement) |
| `className` | `string` | — | fusion de classe (P9) |

Callbacks : aucun.

## Écarts avec l'existant
| Actuel | Cible | Cassant | Entrée migration-table |
|---|---|---|---|
| composant `Separator` distinct (types / inventory) | fusion 7.19 → `Divider` ; `Separator` devient alias déprécié | oui | fusions 7.19 |
| couleur de trait variable selon les recettes | normalisée sur `--mr-border-subtle` (`#dde4e6` light, 7.17) | non (visuel) | section 7.17 |
| label éventuel en police variable | style `--mr-type-label` (11px mono 500 majuscules, 7.17) | non (visuel) | section 7.17 |
| recette divider : 1 valeur en dur signalée (inventory §2.1) | token `--mr-border-subtle` (T2) | non | inventory §2.1 |

## Critères de vérification
1. épaisseur du trait : 1px solid (`--mr-border-width`).
2. couleur du trait : `--mr-border-subtle` (`#dde4e6` light, `#293234` dark).
3. orientation horizontale : largeur 100 %.
4. orientation verticale : hauteur 100 % de la zone parent, largeur 1px.
5. label centré : police mono, taille = 11px, graisse = 500, majuscules (`--mr-type-label`), couleur `--mr-text-tertiary`.
6. si `decorative={true}` : attribut `aria-hidden="true"` ou `role="none"`.
7. si `decorative={false}` : `role="separator"` avec `aria-orientation` synchronisé.

## Interdits
- Jamais de trait supérieur à 1px (seule exception dashed pour FileUpload, 5.8).
- Jamais de couleur d'accent ou de fond vif sur un Divider.
- Pas de maintien du composant `Separator` comme API séparée (fusion stricte dans `Divider`, 7.19).
