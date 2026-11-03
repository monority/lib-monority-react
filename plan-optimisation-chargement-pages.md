# Plan — Optimisation du chargement des pages, docs en priorite

Demande : "peut-on optimiser le chargement des pages, surtout docs ?" Livrable : plan complet,
verification finale apres execution, note objective. Un commit par phase, reversible seul.

## Correctif de mesure (base factuelle de la session precedente a corriger)

- Le chiffre "839 KB transfere" annonce en fin de session precedente etait faux en interpretation :
  c'est la somme des tailles decomprimees (Playwright body.length), pas les tailles reseau.
- Tailles gzip de reference (sortie Vite build, autorite) : CSS 33,18 KB ; vendor-react 91,35 KB ;
  chunk d'entree 27,20 KB ; vendor-syntax 13,04 KB ; DocsPage 9,11 KB ; 2 woff2 latin ~59 KB
  (les 10 autres subsets Geist ne se chargent pas grace a unicode-range).
- Total wire estime sur /docs/button : environ 240 KB + HTML. Le CSS n'est pas le poste dominant
  annonce ; React et les polices dominent. Le decoupage JS par route est deja en place et sain.

## Causes identifiees (mesurees, pas devinees)

1. Requete tierce morte : JetBrains Mono n'est referencee que dans apps/web/index.html (ligne 15,
   plus preconnect). Aucun usage dans le code ni le CSS (grep apps+packages, ts/tsx/css/html/json).
   La police mono reelle est Geist Mono via Fontsource. Cout : 1 feuille tierce bloquante + 2 RTT.
2. Chunk d'entree gonfle par la palette de commandes : AppHeader importe statiquement CommandPalette
   depuis @monority/ui ; "CommandPalette" et la chaine de recherche sont verifiees presents dans
   index-G5Nl6QLi.js (93 KB brut / 27 KB gzip). Chargee sur toutes les pages avant toute interaction.
3. Polices sans preload : swap possible tardif au LCP. A decider sur la baseline Phase 0.
4. Rejete apres mesure : lazy-charger highlight.js n'apporte rien, toutes les pages composants docs
   affichent un playground avec code. Le chunk vendor-syntax est deja de facto scope docs.

## Phases

Phase 0 — Baseline chiffree fiable (aucun changement de code)
- Script Playwright jetable : tailles wire (en-tetes Content-Length reponse), pages / et /docs/button.
- Mesure LCP/peintures, avant et apres les phases, meme protocole.
- Critere de sortie : baseline consignee dans le rapport avant le premier commit de code.

Phase 1 — Supprimer la requete Google Fonts morte (fix(web))
- index.html : supprimer les 2 preconnect et la feuille JetBrains Mono.
- CSP : retirer fonts.googleapis.com de style-src et fonts.gstatic.com de font-src.
- Pre-verification faite : aucun autre usage de JetBrains dans le depot ; aucun e2e n'asserte la CSP.
- Preuves : capture reseau sans requete tierce, pnpm verify vert, e2e cibles.
- Commit : fix(web) retirer la requete Google Fonts morte et resserrer la CSP.

Phase 2 — Sortir CommandPalette du chemin critique (refactor(web), conditionnelle)
- AppHeader : chargement differe de CommandPalette (import dynamique a la premiere ouverture ou au
  repos), Suspense local. Le registre des composants reste dans l'entree (donnees de navigation).
- Critere go : chunk d'entree gzip reduit d'au moins 15 %, palette operationnelle au clavier, aucun
  e2e casse. Sinon : constat consigne, aucun changement (pas de complexite sans gain mesure).
- Commit conditionnel : refactor(web) charger la palette de commandes a la demande.

Phase 3 — Preload des polices latin (optionnelle, decidee sur la baseline)
- Les noms woff2 sont haches : un lien code en dur casse au rebuild. Si la baseline montre un LCP
  lie aux polices, petit plugin vite (transformIndexHtml, 30 lignes max) qui injecte les preload
  depuis les assets emis. Sinon : rejet consigne.
- Commit conditionnel : build(web) precharger les polices latin.

Phase 4 — Verification finale
- pnpm verify complet (7 etapes actuelles : typecheck, format:check, lint, lint:css, build,
  test:rendered, test).
- e2e cibles : geometry (ratio CODE THEME), accessibility, library-scope, theme-runtime.
- Lighthouse/mesure Playwright apres, comparee a la Phase 0, ecarts consignes dans le rapport.
- PLAN.md ## Reprise mise a jour ; push et PR a arbitrer avec l'utilisateur.

## Hors perimetre (rejete avec raison, signale)

- Decoupage CSS par recette : le CSS ne pese que 33 KB gzip transfere ; chaque page docs compose
  plusieurs composants (dependances transitives d'exemples) ; risque sur le contrat des couches
  eleve pour un gain negatif. Ne pas faire.
- Remplacer la stack (React, routeur), SSR, compression serveur : hors sujet repo ou depend de
  l'hebergement, pas du code.
- Les 59 KB de polices Geist sont un cout d'identite assumé, seul le preload peut en ameliorer
  la chronologie, pas le poids.

## Regles respectees

- Aucune dependance nouvelle, aucune etape ajoutee a pnpm verify (O7), aucun detecteur de liste.
- Un commit par sujet, staging par liste de chemins (O8). Les fichiers sidebar-layout modifies par
  une autre session et apps/web/.tmp-verify-sidebar.mjs ne sont pas touches.
- Preuves plutot qu'affirmations (O9) : chaque phase a son critere chiffre avant/apres.

## Note objective du plan (grille 5 criteres x 4 points)

1. Base factuelle : 3/4. Toutes les causes reposent sur des mesures (sortie build Vite, grep
   d'usages, imports verifies, inventaire chunks). La baseline wire/LCP n'existe pas encore, la
   Phase 0 la cree ; la premiere estimation de la session precedente etait fausse et le plan le
   corrige explicitement.
2. Maitrise du risque : 4/4. Phases reversibles une a une, criteres go/no-go chiffres, rejets
   explicites, perimetre ferme, fichiers d'autres sessions preserves.
3. Conformite au contrat du depot : 4/4. Pas de dependance, pas de porte verify supplementaire,
   commits par sujet, preuves exigees. Reserve mineure : la Phase 2 touche AppHeader, composant
   partage entre home et docs, donc surface de tests plus large.
4. Impact attendu : 2/4. Honnetement modeste : suppression d'une requete tierce (Phase 1),
   peut-etre 4 a 8 KB gzip d'entree (Phase 2), chronologie de chargement des polices (Phase 3).
   L'application est deja bien decoupee ; les couts restants (React 91 KB gzip, polices 59 KB,
   CSS 33 KB gzip) sont structurels a la stack, pas du gachis.
5. Verifiabilite : 4/4. Chaque phase a une preuve avant/apres chiffree et une suite de tests
   existante pour la non-regression.

Total : 17/20. Un plan honnete et executable dont la limite principale est l'impact : le site est
deja bien optimise structurellement, les gains restants sont reels mais petits.
