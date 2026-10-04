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
B6, B7, corrections Button, I1 a I3, fix(base) et F1 a F3 (en attente de validation rendu) :
- sauvegarde : git push origin refactor/css-foundation:backup/css-foundation-wip
- changelog a preparer avant publication : tone deprecier ; loading Button sous aria-disabled/busy ; garde evenements non natifs ; correction portee base ADR-025 ; echelle typo font-size-sm
- defaut Field : Input rend lui-meme un Field, d'ou un double wrapper dans un Field
- limite Field : pas de prop disabled sur wrapper Field, etiquette desactivee non stylisable
- portee opt-in (ADR-025) : base sans style global, echelle racine native 16px preservee
- limites surface (ADR-024) : clair L >= 0.921 (marge 0.034) ; sombre L <= 0.254 (marge 0.034)
- focus : unifier le focus des champs au moment de Textarea (regle commune ou exception)
- navigateurs : test Firefox et WebKit au prochain point de controle, avant choix plancher
- CI en attente : brancher pnpm verify en CI avec installation de Chromium avant toute PR
- ligne de base poids sources : 29 194 o (15 fichiers) a F3
- ligne de base poids dist : index.css 14 903 o brut / 2 291 o gzip a F3
- composant suivant : Textarea (4e composant, point de controle ensuite)

