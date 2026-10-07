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
- Bouton principal blanc (variant default/primary) retabli dans EmptyStateHarness (commit 7c721d3)
- Second bouton Importer maintenu en variante secondary sombre
- Diagnostic d'inspection termine : 118.23px et 74.42px confirment la largeur (W), hauteur identique a 28px (H)
- Verifications : pnpm verify vert (6 etapes), tests unitaires et web passants
- Prochaine etape : validation utilisateur sur l'equilibrage visuel des actions mixtes EmptyState

