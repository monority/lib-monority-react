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
B6, B7, corrections Button, I1 a I3 finalises (en attente de validation rendu) :
- sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
- moteur contraste : parseur strict rejetant tout format inconnu et attente fin des animations
- limites fond opaque (ADR-024) : surface clair L >= 0.921 (marge 0.034) ; sombre L <= 0.254 (marge 0.034)
- focus : unifier le focus des champs au moment de Textarea (regle commune a la base ou exception partagee)
- spinner : indicateur visuel Button differe a l'integration du composant Spinner
- navigateurs : test Firefox et WebKit (cache utilisateur) au prochain point de controle, avant choix plancher
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- ligne de base poids sources : 26 772 o (14 fichiers) a I3
- ligne de base poids dist : index.css 13 914 o brut / 2 188 o gzip a I3
- composant suivant : Field (etiquette, texte d'aide, erreur), premier pas echelle typographique

