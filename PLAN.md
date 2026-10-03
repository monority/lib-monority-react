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
B6, B7, corrections Button, I1, I2 et consolidation Input (en attente de validation rendu) :
- sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
- moteur contraste : parseur strict rejetant tout format inconnu et attente fin des animations
- etats combines Input : ordre de priorite desactive > lecture seule > invalide > survol verifie
- limites fond opaque (ADR-024) : surface clair L >= 0.921 (marge 0.034) ; sombre L <= 0.254 (marge 0.034)
- focus : unifier le focus des champs au moment de Textarea (regle commune a la base ou exception partagee)
- spinner : indicateur visuel Button differe a l'integration du composant Spinner
- navigateurs : test Firefox et WebKit (cache utilisateur) au prochain point de controle, avant le choix du plancher
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- ligne de base poids : sources 23 920 o (14 fichiers) ; dist/index.css 12 615 brut / 2 082 gzip a I1
- composant suivant : I2 consolide, proposition I3 en attente de validation, puis Field / Textarea

