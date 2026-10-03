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
B6 commite localement (tailles sm et lg, padding-inline et mode icone seule) :
- tailles de controle : --mr-size-control-sm (1.75rem / 28px, WCAG 2.5.8 >= 24px) et --mr-size-control-lg (2.5rem / 40px)
- regle de proportion padding-inline : space-3 (sm), space-4 (md), space-5 (lg)
- typographie constante : font-size et gap identiques pour sm, md, lg (zero token supplementaire)
- mode carre icone seule [data-icon-only] : min-inline-size egal a min-block-size, padding-inline a 0
- 31 tokens declares au total, moteur de contraste auto-teste (21:1 et 2.40:1), pnpm verify vert a 6 etapes (11.44 s)
- composant suivant propose : Input (deuxieme lecteur de --mr-size-control-md et du fond de controle)
- prochaine action : validation par l'utilisateur du rendu B6 avant push, puis cadrage Input.
