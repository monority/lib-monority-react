# Chantier base CSS saine — Monority UI

Branche `refactor/css-foundation`, worktree `lib-monority-react-css-foundation`.
Source du systeme : `docs/foundation/`. Valeurs neuves definies par etapes.
Inventaire et recoltes : `C:/Users/monority/AppData/Local/Temp/`.

## Etape 0 — Squelette minimal
Reset (:where() scope mr-*), base minimale (canvas, typography, focus, color-scheme),
vocabulaire unique, tokens/ref.css et semantic.css prets a recevoir,
Stylelint avec regle no-raw-values prouvee en negatif, pnpm verify a 5 etapes,
harness minimal dans apps/web.

## Tranches verticales — Composant par composant
Croissance stricte avec le composant en cours : proposition sans ecriture,
regle derriere chaque valeur neuve, contraste calcule, validation humaine,
tokens et recette dans mr.components, pnpm verify vert, arret.
Button en premier (B1 a B6).

## Reprise
Finition de l'elagage terminee :
- 11 fichiers CSS (145 lignes au total)
- 11 tokens declares : 6 primitives dans ref.css, 5 semantiques dans semantic.css
- 0 orphelin strict, 6 primitives lues par semantic.css (dont marque commente interface publique)
- 5 semantiques lus par la base minimale (canvas fond/texte, focus ring, typo famille/taille)
- Base minimale : 4 regles strictes, line-height supprimee, focus 2px (exception admise)
- pnpm lint existe (biome lint .) mais echoue sur 132 diagnostics hors perimetre ; verify reste a 5 etapes vertes
Prochaine action : attente de validation sur la proposition Button B1.
