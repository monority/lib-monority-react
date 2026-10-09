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
Commit de session : 8aa483f (plage 4825ea9..8aa483f)
Etat :
- Ajustements : alignement rigoureux de la case tout selectionner de DataTable avec les lignes, retrait des separateurs d'en-tete/pied sur Modal, harmonisation complete d'AlertDialog avec Modal (animation d'entree, espacements, actions)
- Verifications : pnpm verify vert (typecheck, format, lint:css, test:contrast, build, test, test:dist, test:audit), 1313 tests @monority/ui passants, 94 tests @monority/web passants
- Prochaine etape : Validation visuelle des ajustements par l'utilisateur
