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
B6, B7, corrections Button (52b9ad0, 8e9f740) et micro-etape Input I1 commites localement :
- ligne de base poids : sources CSS 23 920 o (14 fichiers) ; dist/index.css 12 615 o brut / 2 082 o gzip
- detail dist I1 : button.css 7 013 o, semantic.css 1 706 o, reset.css 1 097 o, input.css 870 o, base 750 o, dark.css 675 o, ref.css 298 o, layers.css 109 o, index.css 97 o
- limites fond opaque documentees : clair sur surface -0.04 (L=0.915) a 2.95:1 ; sombre sur surface +0.04 (L=0.26) a 2.94:1
- focus : unifier le focus des champs au moment de Textarea (regle commune a la base, ou exception partagee)
- question fermee : arbitrage ajustement --mr-border-control (L=0.60 clair / L=0.54 sombre pour securiser les surfaces a 3.07:1)
- navigateurs : test Firefox et WebKit (cache utilisateur) au prochain point de controle, avant le choix du plancher
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- prochaine etape : validation rendu B6/B7/I1 par l'utilisateur et ouverture micro-etape I2 (survol, invalide, desactive, lecture seule)
