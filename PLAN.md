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
B6 (6aab0a2), B7 (938a9d6) et extension fullWidth icone (4f7da09) commites localement :
- ligne de base poids : sources CSS 19 189 o (B6) / 21 364 o (B7) ; dist/index.css 10 305 o brut / 1 869 o gzip a B6
- detail dist B6 : button.css 5 760 o, semantic.css 1 613 o, reset.css 1 097 o, dark.css 581 o, ref 298 o, base 750 o, layers 109 o, globals 97 o
- nettoyage : suppression de l'orphelin styles/src/tokens/vocabulary.json (source unique : tooling/stylelint/vocabulary.json)
- defauts de composant a traiter (Button.tsx) : clic non bloque en as="div" (loading/disabled) ; perte de focus clavier sous loading (disabled natif a remplacer par aria-disabled)
- navigateurs : test Firefox et WebKit (installation de Playwright dans le cache utilisateur, aucun fichier du depot) au prochain point de controle, avant le choix du plancher de navigateurs
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- prochaine etape : validation rendu B6/B7 par l'utilisateur et arbitrage de la proposition I1 (Input md repos/placeholder/focus)
