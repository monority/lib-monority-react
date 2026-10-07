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
- Equilibrage optique des actions d'EmptyState applique (commit a28d89f, min-inline-size: 120px)
- Boutons 'Creer un dossier' (primaire blanc) et 'Importer' (secondaire sombre) harmonises a 120px x 28px
- Verifications : pnpm verify vert (6 etapes), rendu verifie sur Chromium en clair et sombre
- Prochaine etape : revue des composants restants de la demande initiale (select multiple, spinner, alertes...)

