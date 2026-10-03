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
B6, B7, corrections Button et micro-etape Input I1 commites localement (en attente de validation rendu) :
- ligne de base poids : sources CSS 23 920 o (14 fichiers) ; dist/index.css 12 615 o brut / 2 082 o gzip
- limites fond opaque (valeurs exactes) : clair surface L >= 0.921 (marge 0.034) ; sombre surface L <= 0.254 (marge 0.034)
- decision bordure controle : Option B validee par ADR-024 (bande de luminosite des surfaces contrainte)
- focus : unifier le focus des champs au moment de Textarea (regle commune a la base, ou exception partagee)
- navigateurs : test Firefox et WebKit (cache utilisateur) au prochain point de controle, avant le choix du plancher
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- prochaine etape : validation rendu B6/B7/I1 par l'utilisateur et ouverture micro-etape I2 (survol, invalide, desactive, lecture seule)

