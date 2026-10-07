# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regles prouvees en negatif, pnpm verify vert, harness dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte : proposition sans ecriture, regle derriere chaque valeur neuve,
contraste calcule, validation humaine, tokens et recette dans mr.components.
Button en premier (B1 a B6).

## Reprise
Sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
Etat :
- Corrections visuelles et ergonomiques terminees sur 10 points :
  - Select : support multiple moderne sans friction (clic direct sans Ctrl/Cmd, style option actif)
  - Switch : lisibilite du bouton au repos en theme clair amelioree (piste et bordure du pouce calibrees)
  - Radio : centrage deterministe du point (taille space-2 et centrage CSS Grid sans biais de sous-pixel)
  - Themes : teintes d'accent distinctives pour night (violet neon), ocean (turquoise), slate (indigo)
  - FileUpload : correction du repli de la zone large (min-block-size par taille et token d'espace valide)
  - Spinner : keyframes mr-spin declarees dans mr.components
  - Badge : majuscule forcee corrigee au niveau de la portee du harness
  - Statuts : chroma et contraste renforces pour info, warning, success, danger (WCAG AA 100% conforme)
  - Alertes : modernisation de Banner, Callout et InlineAlert (conteneur sobre, bordure d'accent integree)
  - Toast : carte flottante sur-elevee et bordure d'accent integree moderne
- Verifications : pnpm verify vert (6 etapes), 133 contrastes conformes sur 7 themes, tests dist et unitaires passants
- Prochaine etape : revue utilisateur et suite des composants
