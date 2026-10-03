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
- ligne de base poids : dist/index.css pese 10 305 o brut (10,06 Ko) / 1 869 o gzip (1,83 Ko)
- detail dist : button.css 5 760 o, semantic.css 1 613 o, reset.css 1 097 o, dark.css 581 o, ref 298 o, base 750 o, layers 109 o
- sources styles/src : 13 fichiers CSS (18 325 o cumules), 1 orphelin identifie (tokens/vocabulary.json 2 171 o)
- verify a froid : 134.74 s (turbo --force) vs en cache : 11.85 s (6 etapes reelles vertes)
- decision retablie : echelles initiales restantes maintenue dans 10-decisions.md
- prochaine etape : micro-etape B7 (couverture API : fullWidth, warning, loading sans spinner)
