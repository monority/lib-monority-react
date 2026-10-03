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
B7 commite localement (couverture API de Button : fullWidth, warning, loading) :
- fullWidth (inline-size 100% sur toutes les combinaisons, y compris icone seule), warning (alias secondary depricie), loading (cursor progress, etats de repos figes)
- budget tokens : 0 token cree, 31 tokens distincts conserves (mesure identique avant/apres)
- regression : 0 ecart sur les 72 combinaisons existantes (4 variantes x 3 tailles x 2 themes x 3 etats)
- captures harness : Temp/button-harness-light.png et Temp/button-harness-dark.png
- compatibilite navigateurs : Chromium 1243 valide ; Firefox et WebKit absents du cache Playwright local
- non couvert dans button.md : densite compacte (attente global), spinner superpose (attente composant), pointer fine, offset focus liste
- action CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- prochaine etape : validation rendu B6/B7, puis lancement de la tranche Input (phase B)
