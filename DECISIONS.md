# Décisions du chantier tokens

Source de vérité : `ROADMAP.md`. Ce fichier fige les décisions prises en phase 0 et trace les amendements apportés à la feuille de route.

Convention de nommage des tokens : `docs/design/tokens-convention.md`.
État transitoire du système : `packages/tokens/rebuild.json`.

## Décisions figées

Ces décisions ne sont pas rouvertes sans demande explicite.

### D2 — Portée des styles globaux
VALIDÉE. La library n'impose aucun style global à l'hôte. Le reset et les styles de base sont scopés aux éléments `mr-*` ; le contenu fourni par l'hôte garde ses propres styles. `normalize.css` est unifié ou supprimé, la suppression devant être prouvée par `git grep`.

Implémentation existante : `packages/styles/src/base/library-scope.css`, export opt-in `./reset.css`. Le périmètre des règles est limité aux éléments `mr-*`.

### D6 — Autorité spec / recette
La recette gouverne jusqu'à réécriture de la spécification. Une spec réécrite et marquée « validée » redevient autorité. Réécrire la spec et modifier la recette a lieu dans le même commit, sinon la dérive est silencieuse — c'est précisément le défaut que ce chantier répare.

### D7 — Appareil déprécié
`deprecated.json`, `deprecated.css` et `migration-table.md` sont supprimés en UN seul commit, à l'étape 11z. Pas avant.

### D8 — Nommage des tokens
Token global : `--mr-<catégorie>-<rôle>[-<variante>]`.
Token local : `--mr-<composant>-<propriété>[-<état>]`, autorisé seulement si le rôle est propre au composant ET constitue une vraie surface de personnalisation. Sinon il est globalisé ou supprimé.

Un token = un rôle. Pas de doublon, pas d'orphelin.

### D9 — Arbitrage d'un doublon
1. La valeur réellement utilisée par la recette l'emporte. Un nom jamais référencé ne gagne rien.
2. Le nom conforme à D8 est gardé. Si aucun ne l'est, le nom est réécrit et l'ancien disparaît — il n'est pas conservé en alias.
3. Les variantes de suffixe contradictoires sont unificiées.

Le paquet n'ayant jamais été publié, un perdant est supprimé, pas déprécié.

### D10 — Rendu pendant le chantier
Un changement de rendu est autorisé s'il est annoncé explicitement token par token, avant → après, et validé. Après l'étape 11, la règle stricte de non-régression reprend.

### D11 — Préfixe des primitifs
VALIDÉE. Les primitives portent le préfixe `--mr-ref-*`. Cela sépare sans ambiguïté les trois niveaux du système (ROADMAP §4.1) et rend lisible une recette qui violerait la règle « jamais de primitif dans une recette ».

Application : phase 0, appliquée dans le commit `refactor(tokens): renommer les primitives sous le prefixe ref`. Le constat qui l'a motivée : 4 des 7 primitives échouaient à la regex du §5.2 — `neutral-hue` et `neutral-chroma` parce que `neutral` n'était pas dans la liste fermée, `font-sans` et `font-mono` parce que `font-[a-z]+` exigeait un troisième segment. Les 7 primitives sont désormais `--mr-ref-brand-hue`, `--mr-ref-brand-chroma`, `--mr-ref-neutral-hue`, `--mr-ref-neutral-chroma`, `--mr-ref-font-sans`, `--mr-ref-font-mono`, `--mr-ref-radius-scale`.

Portée du renommage : **154 occurrences dans 78 fichiers**. Deux documents d'archives ont été volontairement laissés intacts, les renommer aurait falsifié un état historique : `docs/design/audit/migration-table.md` et `docs/design/reference/prompt-maitre-v4.md`.

Impact : `packages/ui/src/lib/design-config.ts`, `packages/ui/src/providers/get-theme-script.ts` et les specs e2e `design-customizer`, `theme-subtree` lisent ces noms via `getComputedStyle` et suivent dans le même commit. Le rebranding par client repose sur ces noms.

### D12 — Scoping des composants
VALIDÉE. `data-*`. Les variantes et états passent par `[data-variant]`, `[data-size]`, `[data-state]` ; une classe de base préfixée par composant reste en place.

Constat mesuré : 174 `.tsx`, 254 `className` à préfixe `mr-`, 302 attributs `data-*` sur 90 fichiers. Le mécanisme est déjà en place, aucun travail de migration.

### D13 — Dérivation des états
VALIDÉE. `color-mix(in oklch, …)`. Un token d'état n'est pas écrit : il se dérive du token de repos.

**Condition de validation, à vérifier au commit 3** : `audit:contrast` doit savoir résoudre `color-mix()` pour mesurer une paire texte/fond. colorjs.io ne résout pas `color-mix()` ; si la mesure est impossible, le contraste sera relevé par couleurs calculées dans Playwright (`getComputedStyle` sur les nœuds réels) et c'est cette méthode qui fera foi.

### D14 — Liste fermée des catégories globales
VALIDÉE le 2026-10-01. La liste des catégories de tokens globaux est celle de `docs/design/tokens-convention.md` §4, et la regex du ROADMAP §5.2 en est **dérivée**, pas recopiée. Un test échoue si les deux divergent.

Trois points :
- Les catégories composées sont des noms complets et se tiennent seules : `--mr-border-width`, `--mr-z-index`, `--mr-line-height`, `--mr-control-height`, `--mr-icon-size`, `--mr-letter-spacing`.
- Un nom à deux segments est valide quand la catégorie est déjà le rôle entier : `--mr-accent`, `--mr-border`, `--mr-scrim`.
- La liste **exclut les composants** : `switch`, `badge`, `dialog`, `drawer`… relèvent du registre `local-tokens` avec justification (D8), pas de la regex globale.

Interdits explicites : les abréviations héritées `--mr-fs-*`, `--mr-lh-*`, `--mr-dur-*`, `--mr-ease-*`. D8 les remplace par `font-size`, `line-height`, `duration`, `easing`.

Motivation, mesurée : la regex initiale du §5.2 rejetait **179 des 279** tokens existants, soit 64 %. Trois défauts distincts — catégories absentes de la liste (`ease` et non `easing`, et toutes les familles de composants), catégories composées traitées comme des préfixes alors qu'elles sont des noms complets, et noms à deux segments refusés alors que `--mr-accent` est un nom nécessaire.

### D15 — Échelle des variantes
**TRANCHÉE le 2026-10-01 — option C, échelle déclarée par famille et fermée.**

Rien n'interdit aujourd'hui le mélange. D8 autorise `[-<variante>]`, la regex §5.2 autorise n'importe quel segment `(-[a-z0-9]+)*`, et rien ne dit ce qu'une variante peut être.

**Constat mesuré** sur les 279 tokens de la table rase, dernier segment du nom :
- 66 libellés de rôle (`hue`, `stroke`, `medium`, `display`…) ;
- 27 numériques (`spacing` 0 à 24, `fs` 11 à 32, `opacity` 0 à 100) ;
- 22 mots de rôle (`full`, `fast`, `hover`, `active`, `subtle`…) ;
- 7 tailles nommées (`sm`, `xs`, `md`, `lg`, `xl`, `2xl`, `3xl`).

Le mélange est la source du désordre, pas les noms eux-mêmes. Un même préfixe accumulait jusqu'à trois conventions : `control` portait 17 tokens, dont `size-sm/md/lg` (nommé), `padding-inline-xs/sm/md/lg` (nommé) et `gap` (sans variante). `switch` en portait 11 avec deux conventions contradictoires : `track-w-sm`, `track-h-sm`, `scale-lg`, `scale-sm`, `track-width-md`, `thumb-off`.

**Options :**

- **A — tailles nommées partout.** Simple, lisible dans `data-size`. Mais `--mr-spacing-md` est absurde : un pas de grille n'est pas un « md ».
- **B — numérique partout.** `--mr-control-height-2`. Compact, mais `data-size="2"` n'est pas auto-documenté pour un consommateur.
- **C — échelle déclarée par famille, fermée.** Chaque famille déclare ses pas dans `packages/tokens/categories.json`, et `audit:tokens` refuse tout pas hors liste. Nommé pour ce qui est exposé en prop `size`, numérique pour les échelles continues sans sens public (`spacing`), jamais de mélange au sein d'une famille.
- **D — statu quo.** each families garde sa convention. C'est l'état mesuré ci-dessus.

**Tableau des échelles : `docs/design/tokens-scales.md`, à valider avant toute création de token.**

**Option retenue : C**, sous cinq conditions opposables :

1. Les échelles sont déclarées dans `packages/tokens/categories.json`, source unique. Le test de synchronisation couvre les pas, pas seulement les catégories.
2. Un seul type de pas par famille. Nommer `spacing` en `md` et numéroter `control-height` en `2` dans la même famille est interdit.
3. Un plafond de pas par famille est déclaré dans le même JSON — garde explicite contre la dérive du nombre de pas.
4. `audit:tokens` échoue sur un pas non déclaré, avec une fixture ok et une fixture nok par famille.
5. Avant 11b1, le tableau complet famille → type de pas → pas autorisés est présenté et validé. Aucun token ne sera créé avant cette validation.

Le tableau du point 5 est fondé sur les mesures des 279 tokens de la table rase, pas sur une intention : il dit ce que le système utilise réellement, pas ce qu'il devrait utiliser.

### D16 — Spinner : une échelle, deux rôles
**TRANCHÉE le 2026-10-01.** `spinner-size-*` (conteneur) et `spinner-ring-*` (anneau intérieur) sont décalées d'un pas constant de 0.25 rem : 1/0.75, 1.5/1.25, 2/1.75. Ce n'est pas une redondance, c'est une mesure et son épaisseur — l'écart correspond à la bordure plus la marge intérieure. **Les deux séries sont justifiées et doivent être conservées.**

La question n'est donc plus « laquelle garder » mais « deux échelles parallèles, ou une échelle et deux rôles ? ». Recommandation : deux rôles `size` et `ring`, un seul jeu de pas `{sm, md, lg}`. L'alternative autoriserait un jour les deux séries à se désaligner, ce qui casserait la géométrie du composant. Décision design. Détail et valeurs dans `docs/design/tokens-scales.md` §4.3.

**D17 — Durées de transition : rôles `etat` et `panneau` (amendement de D15)**
**TRANCHÉE le 2026-10-01.** La voie B (`--mr-duration-entree` / `--mr-duration-sortie`) a été validée puis **amendée** : sa condition initiale — découper le drawer entrée/sortie — est mesurée fausse. Les 8 occurrences y sont toutes en `slow-alt`, 4 pour l'entrée et 4 pour la sortie.

Le découpage réel est par **type de déclaration** : `fast-alt` (150 ms) n'apparaît que dans des `transition:` d'état (button, checkbox, file-trigger, infinite-scroll) ; `slow-alt` (200 ms) que dans des `animation:` de surface (drawer). Noms retenus : `--mr-duration-etat` et `--mr-duration-panneau`, **rôles et non composants** — `etat` décrit le déclencheur, `panneau` décrit ce qui bouge. `surface` a été écarté : collision avec `bg-surface`, qui est une couche de fond.

Amendement appliqué dans `packages/tokens/categories.json` : `etat` et `panneau` sont des rôles de la famille `duration`. Le plafond de **pas** reste 3. La regex D14 acceptait déjà ces deux noms ; c'est l'échelle D15 qui refusait les rôles non déclarés, et la correction passe par la déclaration, jamais par un contournement.

Application en 11b4, avec le correctif `prefers-reduced-motion` (le bloc actuel ignore `fast-alt`, `slow-alt`, `quick` et `600`) et un test qui échoue si un `duration-*` est absent du bloc. Le correctif et le test dans le même commit.

**D18 — `--mr-ref-radius-scale` traité en 11b2**
**TRANCHÉE le 2026-10-01.** Ce primitif est lu par 98 occurrences dans 58 fichiers, dont 52 recettes. Créer un token sémantique intermédiaire est un travail de la famille **dimensions**, pas de la famille **couleur**. Traitement renvoyé à 11b2 pour que 11b1 reste centrée sur la couleur ; sinon 52 recettes seraient migrées dans une phase qui ne porte pas sur les rayons.

### D19 — Les teintes de statut sont fixes, sans primitive
**TRANCHÉE le 2026-10-01.**

**Contexte.** Toutes les couleurs du système sortent soit d'une primitive de marque, soit d'une primitive neutre. Un statut n'est ni l'un ni l'autre : un succès vert et un danger rouge doivent signifier la même chose quel que soit le client, et rester reconnaissables par quelqu'un qui ne distingue pas le rouge du vert. Les faire dériver de la teinte de marque rendrait le vert de « succès » mauve chez un client violet. Une teinte de statut ne peut donc pas être une primitive.

**Décision.** Quatre teintes fixes, déclarées une seule fois : succès 155, avertissement 80, danger 25, information 255. Elles sont autorisées par T3 via `allowedFixed`, la liste de valeurs admises sans primitive. Aucune primitive de statut n'est créée.

**Alternative écartée : une primitive par ton.** Elle porterait le système de 7 à 11 primitives. Coût mesuré, par ton ajouté : une entrée dans `primitives.json`, une ligne dans le motif Stylelint dérivé de `categories.json`, une ligne dans l'échelle D15, un contrat X2 à écrire, et une reconstruction de plus dans chacun des sept thèmes. Elle achèterait la rebrandisation des statuts, que le chantier n'a jamais demandée et qui est sémantiquement fausse : un statut qui change de couleur change de sens.

**Déclencheur de révision.** Deux conditions, à vérifier à chaque changement de teinte de marque. Si la teinte de marque se rapproche d'une teinte de statut au point de les confondre — mesuré, pas estimé : moins de 15 degrés d'écart de hue OKLCH —, alors soit la teinte de statut bouge, soit elle gagne un suffixe de nom qui empêche la confusion. Et si un client demande des statuts personnalisables, c'est une autre décision, pas un amendement de celle-ci.

**Vérification qu'une teinte n'est définie qu'en un seul endroit.** Les quatre valeurs n'apparaissent que dans la déclaration unique des statuts, jamais dans un thème, jamais dans une recette. Le contrôle existe déjà : T3 refuse toute valeur en dur absente de `allowedFixed`, et `allowedFixed` est l'unique liste qui l'autorise. Déclarer une teinte de statut ailleurs la ferait échouer. État mesuré au moment de la décision : aucune des quatre valeurs n'est encore déclarée, et les sources de tokens ne contiennent que les sept primitives `--mr-ref-*`. La déclaration arrive en 11b1 ; le même refus s'applique alors.

**Conséquences.** Une marque ne peut pas recolorer un statut, et c'est voulu. Les statuts sont les seules couleurs du système qui ne suivent pas le rebranding, ce qui doit rester lisible dans la documentation de marque.

### D20 — Slate est un 7ᵉ thème assumé, à contenu purgé
**TRANCHÉE le 2026-10-01.**

**Contexte.** `packages/tokens/src/themes/slate.json` a été introduit par `d42ebad` (« Patch for css », 2026-09-28). Le générateur portait alors une liste de thèmes en dur qui ne le mentionnait pas : le fichier était suivi par git, il matchait le glob `src/themes/*.json`, et il n'était ni résolu, ni émis, ni contrôlé. La table rase (`41aa61d`) a vidé les six thèmes de la liste en dur ; `slate.json` n'y figurait pas et a conservé ses 44 tokens. Slate est malgré tout du code applicatif vivant : `theme-provider.tsx`, `theme-scope.tsx`, `constants.ts`, `design-config.ts`, `get-theme-script.ts`, plus `audit-baseline.spec.ts`, `components.visual.spec.ts` et `theme-runtime.spec.ts`.

**Décision.** Slate est le 7ᵉ thème du système. Son squelette reste ; ses 44 tokens sont purgés comme ceux des six autres, conformément à la table rase.

**Règle fondatrice.** Tout fichier de `src/themes/*.json` est émis, validé et couvert par T3 et X2. Aucun thème ne peut être présent sans être contrôlé. Cette règle est appliquée par le test de parité de l'étape 0.13.

**Alternatives écartées.**
- **A — purge complète.** Mesurée : 6 fichiers de code applicatif et 3 specs e2e à réécrire pour supprimer une liste de thèmes. Rejetée : le coût est réel et le bénéfice nul, `slate` est un thème utilisé.
- **C — conserver les 44 tokens.** Rejetée : rouvre 44 tokens hors table rase, sans décision ni contrôle.

**Conséquences.** T3 doit comparer des noms courts et non des noms préfixés par le thème (voir D21). Le 7ᵉ thème est dans le périmètre de X2, qui vérifie contraste et seuils par thème.

### D21 — T3 compare des noms courts, jamais le dernier segment
**TRANCHÉE le 2026-10-01.**

**Contexte.** T3 autorise les teintes fixes de statut par nom court (`success-text`). Un thème nommé produit `theme-slate-success-text`, qui ne correspondait à rien : les tons d'un thème ajouté au glob étaient tous signalés à tort.

**Décision.** Retirer le préfixe **exact** `--mr-theme-<nom de thème>-` avant comparaison avec `allowedFixed`. La liste des thèmes vient du disque (`lib/themes.mjs`), donc aucun nom de thème n'est codé en dur. `allowedFixed` reste une liste de noms courts, indépendante du nombre de thèmes.

**Alternatives écartées.**
- **Comparer le dernier segment.** Rejetée, et fragile : `success-text`, `danger-text`, `warning-text` et `info-text` se terminent tous par `text`. T3 deviendrait aveugle à la distinction entre tons.
- **Étendre `allowedFixed` par thème.** Rejetée : une liste à maintenir par thème, contraire à D14.

**Conséquences.** Sept tests de normalisation couvrent les cas limites : nom de thème composé (`high-contrast`), token dont le nom contient un thème sans être préfixé, préfixe partiel, thème qui est le préfixe d'un autre, tri par longueur décroissante, et non-régression de la distinction entre les quatre tons.

### D22 — Parité des listes de thèmes : une source dérivée, un test pour les listes recopiées
**TRANCHÉE le 2026-10-01.**

**Contexte.** Les listes de thèmes vivent à deux endroits et n'étaient gardées par personne. Côté build, trois listes maintenues à la main ont déjà perdu `slate` en silence : le fichier existait, il était suivi par git, il matchait le glob, et le générateur l'ignorait. Côté application et tests, dix fichiers d'`apps/web/e2e` citent des noms de thèmes et **cinq** écrivent une liste ; aucun test ne les surveillait. `git log -S` a montré qu'aucune des quatre listes partielles n'a de raison délibérée : `geometry.spec.ts` a ses trois thèmes depuis sa création (`88f0b1a`) sans en avoir jamais eu davantage, et les deux autres sont antérieures à leurs thèmes manquants. **Ces listes périmées avaient la même cause que `slate` : une liste recopiée à la main, jamais mise à jour.**

**Décision, en deux temps.**

*Les listes modifiables sont dérivées.* `theme-scope.tsx` prend `ResolvedThemeName` ; `design-config.ts` construit sa liste depuis `ThemeName` et porte l'exclusion de `high-contrast` dans le type, pas dans une liste ; `get-theme-script.ts` dérive sa liste de stockage. Une liste en dur ne peut plus diverger de la constante. Mesure : `theme-scope.tsx` n'importe que des types, `constants.ts` n'importe rien — ni cycle, ni coût de bundle.

*Les listes recopiées sont vérifiées par un test.* `detecterListesDeThemes` applique une **règle structurelle sur le type des éléments** : une liste de thèmes est un tableau dont les éléments sont des chaînes littérales égales à des noms de thèmes. Un tableau d'objets n'en est pas une, quelles que soient ses clés. Chaque liste détectée est soit exhaustive, soit annotée `mr-theme-subset:` avec une raison ; sinon le test échoue en nommant le thème manquant et le fichier fautif. Un alias n'est jamais compté comme thème manquant.

**Pourquoi une règle sur le type, et non sur le contenu.** Un critère « au moins deux noms de thèmes dans un littéral » confond une liste de thèmes avec un objet de configuration qui porte un thème. Il remontait deux tables de fixtures de `design-customizer.spec.ts` et un accès calculé `opposite[theme]` de `theme-subtree.spec.ts`. La règle sur le type les écarte sans parser aucune clé et sans introduire de seconde marque. Mesure : 11 fixtures positives et négatives passent, et `apps/web/e2e` donne exactement 5 détections, les 5 vraies listes, **zéro faux positif**.

**Alternatives écartées, avec leur coût.**
- *Option 2, `themes.json` produit par le build et importé par l'UI.* Écartée : elle couple le runtime de la librairie à un artefact de build, donc à `packages/tokens/dist`, absent chez un consommateur npm qui n'a pas ce monorepo. Un package publié ne peut pas exiger un fichier que son build n'embarque pas.
- *Ajouter un `exports` sur `@monority/tokens`.* Le package est `private: true`, sans `main` ni `exports`, et rien n'y est importable aujourd'hui. Ouvrir un point d'entrée sur du code de build obligerait les specs e2e à charger le générateur pour lire une liste de chaînes. Coût disproportionné, bénéfice nul : un test de parité rend le même service.
- *Voie (ii), le test ne lit que les fichiers déjà annotés.* Écartée : elle déplace le défaut `slate` au niveau des tests. Une onzième spec écrite dans une forme non reconnue passe inapercue, puisque rien ne la cherche.
- *La marque `mr-theme-not-a-list:`.* Écartée : inutile sous la règle structurelle. Elle ne serait revenue que pour classer un cas que la règle ne tranche pas, et aucun cas de ce genre n'a survécu aux fixtures.
- *Une règle de clé `theme` dans le détecteur.* Écartée : elle ferait parser des clés au détecteur, qu'il ne fait nulle part ailleurs, pour un résultat que la règle sur le type obtient déjà.

**Limites assumées.**
- Un **objet indexé par noms de thèmes** n'est pas détecté : c'est hors du périmètre du test. Un tel objet est typé sur `ThemeName`, donc le compilateur en impose l'exhaustivité — le risque est couvert ailleurs. Mesure : `theme-provider.tsx:10` déclare `RESOLVED_THEMES: readonly ResolvedThemeName[]` en sept littéraux ; c'est la liste la mieux gardée du dépôt, et elle reste une liste à maintenir.
- **L'extension hors `apps/web/e2e` est l'item 0.15b**, non implémenté ici. Mesure : la même règle trouve 3 détections de plus — `theme-provider.tsx:10` (7 thèmes, exhaustive), `HarnessPage.tsx:6` (6 thèmes, `slate` manquant, et son type `Theme` en dérive, donc le compilateur ne peut pas le rattraper) et une boucle de test dans `get-theme-script.test.ts:91`.

**Conséquences.** Le coût du centième token ne change pas, mais le coût d'*ajouter un thème* baisse : l'ajout d'un fichier dans `src/themes/` fait désormais échouer la porte si une liste applicative n'est pas mise à jour. Une annotation dont la raison cite 11b1 devient fausse en fin de 11b1 : la relecture de ces annotations est inscrite à la Definition of Done.

### D23 — Un registre d'alias de rendu, distinct des thèmes et des préférences
**TRANCHÉE le 2026-10-01.**

**Contexte.** Trois concepts portaient le même mot. Un **thème** est un fichier de `src/themes/*.json`, dérivé du disque. Un **alias de rendu** est un nom de sélecteur qui rend un thème existant : `dim` rend `dark`. Une **préférence utilisateur** comme `system` est résolue à l'exécution, jamais à la compilation.

Le statut d'alias était implicite : il tenait dans une condition en dur de `lib/themes.mjs` (`name === SYSTEM_FALLBACK_THEME`) et dans deux `Exclude<>` de `packages/ui/src/lib/constants.ts` — `ThemePreference = Exclude<ThemeNameType, 'dim'>` et `ResolvedThemeName = Exclude<ThemeNameType, 'system' | 'dim'>`. Un alias non documenté redevient un `slate` : invisible, jamais contrôlé.

**Décision.** `packages/tokens/theme-aliases.json` déclare les alias de rendu (`{ "dim": "dark" }`, rien d'autre), lu par `lib/themes.mjs`. La condition en dur disparaît. `DEFAULT_THEME` et `SYSTEM_FALLBACK_THEME` restent dans `lib/themes.mjs` : ce sont deux rôles de génération, pas des alias. Mesure : ils ne sont consommés que dans `packages/tokens` (`lib/themes.mjs`, `sd-formats.mjs`), **aucun consommateur UI, aucune duplication** — ils ne deviennent donc pas une source du test de parité.

**Sur la contradiction `dim` : elle n'existait pas.** `design-config.ts` lignes 50 à 55 propose six thèmes et ne contient aucune occurrence de `dim`. `dim` n'est donc **pas sélectionnable** par l'utilisateur. Les deux `Exclude<>` sont exacts : `dim` figure dans l'enum `ThemeName` mais est exclu de ce que l'utilisateur choisit et de ce qui est résolu. Ils restent, et le test les vérifie.

**Sur le CSS : il n'y avait pas de défaut.** `dim` était déjà groupé avec sa cible — `[data-theme="dark"],\n[data-theme="dim"]`, mesuré sur le CSS généré. Un grep ligne à ligne avait fait croire à un bloc autonome vide. La règle est désormais écrite et testée plutôt que constatée.

**Alternatives écartées.**
- **`Exclude<>` implicites.** Rejetée : `dim` reste un alias sans statut déclaré. Un fichier `dim.json` passerait inaperçu, comme `slate`.
- **Registre unique tokens + UI.** Rejetée : deux listes à synchroniser. `@monority/tokens` est `private: true`, sans `main` ni `exports` ; le lier obligerait à ouvrir un point d'entrée sur du code de build. L'enum `ThemeName` reste la source UI, et un test vérifie qu'elle coïncide avec le registre.

**Conséquences.** Dix tests couvrent : registre exact, cible existante, alias ne masquant pas un fichier, sélecteur groupé, absence de bloc autonome, et correspondance avec l'enum UI. `system` reste dans `packages/ui` : le build ne doit pas dépendre d'un concept qu'il ne produit pas.

### D24 — Unité de référence du chantier : les références pendantes de recette
**TRANCHÉE le 2026-10-01.**

**Contexte.** Le chantier comparait des nombres sans unité explicite. « 3291 » venait d'un scan large incluant `apps/web` et la base ; « 3170 constats » venait d'`audit:tokens` et comptait autre chose. Deux mesures d'unités différentes ne sont pas comparables.

**Décision.** L'unité de référence du chantier est **l'occurrence de `var(--mr-x)` pendante dans `packages/styles/src/recipes/*.recipe.css`**, où `--mr-x` n'est définie ni globalement, ni localement dans le même fichier, ni dans le fichier déprécié. Script nommé : `packages/tokens/scripts/measure-pending.mjs`. Périmètre : recettes uniquement — la base, les utilitaires et `apps/web` sont des consommateurs, pas la cible.

**Valeur de base : 2241 occurrences, 129 tokens distincts, 75 recettes sur 76.** Mesurée au commit `2d3981b`. Fichier : `pending-baseline.json`. Cliquet : `--check` échoue si le nombre monte, signale une baisse.

**Conséquences.** « 3291 » est **retiré des critères** : ancienne unité, plus comparable. Chaque famille de 11b1 rapporte avant, après, écart attendu et écart mesuré, dans cette unité. Le nombre de constats d'`audit:tokens` reste rapporté séparément, jamais mélangé.


## Amendements à la feuille de route

### §4.3 — Cascade (amendé)
Les noms `mr.*` de la feuille de route ne sont pas retenus. L'espace de noms réel est `monority.*`, et il comporte un layer `recipes` que la feuille de route ne mentionne pas.

Ordre effectif, déclaré dans `packages/styles/src/layers/index.css` et vérifié dans les sept `*.layer.css` :

```
monority.reset → monority.tokens → monority.base → monority.recipes
  → monority.components → monority.utilities → monority.overrides
```

Le reset et le scope passent par `:where()`, spécificité nulle. Aucun `!important` hors `forced-colors` et `prefers-reduced-motion`, qui doivent rester documentés.

### §4.4 — Recettes (amendé)
Les recettes restent en CSS. `packages/styles/src/recipes/<composant>.recipe.css`, une par composant, 77 fichiers. Zéro migration vers `.recipe.ts` : il n'y a ni objet déclaratif ni runtime à maintenir. Les variantes passent par `data-*` (D12).

Changement de conception à retenir : la recette est du CSS statique, donc « zero-runtime » et « compatible Server Components » ne sont pas des contraintes à satisfaire mais des propriétés acquises.

### §4.6 — CSS de composant (amendé le 2026-10-01)
La description d'origine — « un fichier par composant dans `packages/ui/components/<Nom>/<Nom>.css` » — décrit une architecture qui **n'existe pas** et ne sera pas créée. Décision : amender pour décrire la réalité, **aucune migration**.

État mesuré au 2026-10-01 :
- **74 composants** dans `packages/ui/src/components/<catégorie>/<kebab-case>/`, 11 catégories, **315 fichiers** (`.ts` 161, `.tsx` 154), 19 795 lignes ;
- anatomie constante : `X.tsx`, `X.types.ts`, `X.test.tsx`, `index.ts` ;
- **0 fichier CSS** dans un dossier de composant ;
- 3 fichiers CSS dans toute la librairie : `packages/ui/src/styles/{globals,reset,utilities}.css`, 2 lignes chacun, simples relais d'import ;
- tout le style des composants vit dans les 77 recettes (7 313 lignes).

Le style est centralisé dans les recettes. La phase 14 audite les 315 fichiers sans en créer : propriétés logiques dans les styles inline, absence de valeur en dur, attributs `data-*` conformes, aucune classe modificatrice BEM. Les recettes sont auditées en phase 12, avant.

### §4.5 — Reset / base / scope
Le reset et les styles de base sont scopés aux éléments `mr-*` (D2). `normalize.css` est à fusionner ou supprimer, la suppression prouvée par `git grep`.

### Baseline visuelle (décision du 2026-10-01)
Prise **à la fin de 11b5**, pas en phase 0 : le système de tokens a été razé, une baseline capturée maintenant gellerait un rendu vide. Les snapshots d'avant le raz sont conservés, taggués « cible visuelle », et servent à mesurer les diffs annoncés pendant 11b1–11b5.

## Glossaire

- **T6** — références pendantes et tokens dépréciés. Vérifie que toute référence de code désigne un token qui existe, et qu'aucun alias déprécié n'est encore consommé. Implémentation : `packages/tokens/scripts/check-deprecated.mjs`.
- **X2** — contrastes WCAG. Mesure chaque paire texte/fond sur tous les thèmes et toutes les marques, aux seuils AA/HC, plus les minimums du tableau du langage. Implémentation : `packages/tokens/scripts/check-contrasts.mjs`.
- **S11** — spécifications contre tokens résolus. Compare les valeurs annoncées dans les tableaux « Dimensions » des specs aux tokens réellement résolus. Un écart se corrige dans la spec, jamais dans les tokens. Implémentation : `packages/tokens/scripts/check-spec-values.mjs`.
- **`rebuild.json`** — verrou du chantier tokens. Tant qu'il existe, T6/X2/S11 rapportent au lieu de bloquer. Sa suppression, à l'étape 11z, est le jalon de fin.
- **Pendente** — `var(--mr-x)` utilisée alors que `--mr-x` n'est définie nulle part.
- **Orpheline** — token défini et jamais utilisé.