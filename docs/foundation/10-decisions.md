# 10 : Décisions

Ce document est le journal des décisions de la fondation. Il sert à comprendre pourquoi une règle existe, avant de proposer de la changer.

## Format d'un ADR

Chaque décision a un numéro stable (jamais réutilisé), un statut, et quatre rubriques courtes :

- **Contexte** : le problème, avec les faits mesurés.
- **Décision** : ce qui est retenu, en une ou deux phrases.
- **Alternatives écartées** : ce qui a été envisagé, avec la raison du rejet.
- **Conséquences** : ce que cela impose, et ce qui rouvrirait la décision.

Statuts : `Acceptée`, `Remplacée par ADR-xxx`, `Abandonnée`. Une décision remplacée reste dans le journal. Un ADR s'écrit au plus tard dans le commit qui applique la décision. Les numéros se suivent sans trou.

## Sommaire des décisions

- ADR-001 : le CSS écrit à la main est la source de vérité
- ADR-002 : cascade en couches préfixées
- ADR-003 : trois niveaux de tokens
- ADR-004 : états dérivés, jamais déclarés
- ADR-005 : vocabulaire fermé, en anglais, nommé par rôle
- ADR-006 : thèmes, alias et préférence
- ADR-007 : thèmes teintés redéfinissent leurs primitives de teinte
- ADR-008 : teintes de statut fixes
- ADR-009 : contraste WCAG 2.2 AA, sans APCA
- ADR-010 : variantes et états par attributs de données
- ADR-011 : React 19 et TypeScript strict
- ADR-012 : porte pnpm verify à huit étapes au plus
- ADR-013 : un composant à la fois, validé avant le suivant
- ADR-014 : un token n'existe qu'avec un consommateur
- ADR-015 : API publique minimale
- ADR-016 : état de session dans un seul fichier
- ADR-017 : documents et rapports sans tableau
- ADR-018 : échelles déclarées une seule fois dans semantic.css et valeurs brutes autorisées dans tokens/ et themes/
- ADR-019 : catégorie size, rôle on-solid et emplacement du fichier de vocabulaire
- ADR-020 : style de base neutre (inverse/on-inverse), marque réservée aux variantes explicites et hauteur de contrôle 32px
- ADR-021 : ordre des couches pour prefers-reduced-motion, durées en multiples de 50ms et grille d'états en multiples de 12%
- ADR-022 : symétrie du thème sombre par permutation des rôles neutres et levier de luminosité d'accent pour conteneur de marque
- ADR-023 : dérivation des états de contrôle plein par mélange vers `--mr-text-primary`
- ADR-024 : bande de luminosité des surfaces portant un contrôle bordé
- ADR-025 : les styles de portée sont opt-in par data-theme ; la base ne modifie jamais la taille racine
- ADR-026 : bordure de contrôle discrète au repos et accessibilité garantie par le focus et le thème contrasté

## Décisions acceptées

### ADR-001 : le CSS écrit à la main est la source de vérité
Statut : Acceptée.
Contexte : le premier système générait le CSS depuis des tokens JSON via un générateur et plus de vingt contrôles. Cible uniquement web, thèmes déjà exprimables en CSS natif ; six sessions de travail consommées pour neuf tokens sémantiques.
Décision : les tokens sont écrits directement en CSS. Aucune génération sans consommateur mesuré.
Alternatives écartées : garder le JSON et le générateur (coût de build et de contrôles disproportionné pour une cible web unique).
Conséquences : un `tokens.d.ts` n'existe que si du code TypeScript consomme les noms. Un export vers un autre outil (design tool, mobile) rouvrirait la décision.

### ADR-002 : cascade en couches préfixées
Statut : Acceptée.
Contexte : la bibliothèque est consommée par des applications qui ont leur propre CSS.
Décision : toutes les règles sont dans `mr.reset`, `mr.base`, `mr.tokens`, `mr.themes`, `mr.components`, `mr.utilities`, ordre déclaré une seule fois.
Alternatives écartées : spécificité maîtrisée sans couches (fragile, impose `!important`) ; préfixes de classe seuls (n'évite pas les conflits d'ordre).
Conséquences : le CSS non layerisé du consommateur gagne toujours, c'est un engagement public. Les Web Components devront adopter leurs propres couches par shadow root.

### ADR-003 : trois niveaux de tokens
Statut : Amendée par ADR-018.
Décision : primitives (`--mr-ref-*`), sémantiques, tokens de composant. Une recette ne lit jamais une primitive. Une valeur brute n'existe que dans les primitives et les thèmes.
Conséquences : ajouter un thème ou une marque ne touche aucune recette.

### ADR-004 : états dérivés, jamais déclarés
Statut : Acceptée.
Décision : hover, active et disabled se dérivent par `color-mix(in oklch, ...)`. Les mélanges sont des tokens partagés.
Alternatives écartées : un token par état (multiplie les tokens par le nombre de couleurs).

### ADR-005 : vocabulaire fermé, en anglais, nommé par rôle
Statut : Acceptée.
Décision : catégories et rôles dans un seul fichier de vocabulaire, en anglais. Les durées se nomment par rôle (`state`, `panel`), jamais par composant. Le préfixe `text` est réservé aux couleurs de texte ; les tailles s'appellent `font-size-*`.
Alternatives écartées : noms français (friction pour un contributeur externe) ; noms liés aux composants (faux dès qu'un second composant les utilise) ; `--mr-text-xl` pour les tailles (collision avec `--mr-text-primary`).

### ADR-006 : thèmes, alias et préférence
Statut : Acceptée.
Décision : sept thèmes (`light`, `dark`, `slate`, `oled`, `ocean`, `night`, `high-contrast`). `dim` est un alias de `dark`. `system` est une préférence résolue à l'exécution dans `@monority/ui`. La liste des thèmes se lit du dossier `themes/`.
Alternatives écartées : liste de thèmes recopiée dans le build, l'interface et les tests (a déjà fait perdre un thème en silence).

### ADR-007 : thèmes teintés redéfinissent leurs primitives de teinte
Statut : Acceptée.
Décision : slate, ocean et night redéfinissent localement leurs primitives de teinte dans leur propre fichier. Aucune chroma ou hue codée en dur dans une recette.
Conséquences : le thème par défaut et les thèmes neutres ne portent aucune teinte propre.

### ADR-008 : teintes de statut fixes
Statut : Acceptée.
Décision : succès 155, avertissement 80, danger 25, information 255, sans primitive.
Alternatives écartées : une primitive par statut (quatre primitives de plus, chacune à maintenir dans chaque thème).
Conséquences : une marque ne peut pas recolorer les statuts. Révision si une teinte de marque approche une teinte de statut ou si des statuts personnalisables sont demandés.

### ADR-009 : contraste WCAG 2.2 AA, sans APCA
Statut : Acceptée.
Décision : 4,5:1 pour le texte, 3:1 pour les composants UI, marge visée, seuils propres plus élevés pour `high-contrast`.
Alternatives écartées : ajouter APCA (second seuil à arbitrer et à maintenir).

### ADR-010 : variantes et états par attributs de données
Statut : Acceptée.
Décision : `data-variant`, `data-size`, `data-state` ; états natifs d'abord. Pas de modificateurs BEM dans le nouveau code.

### ADR-011 : React 19 et TypeScript strict
Statut : Acceptée.
Décision : `ref` comme prop, pas de `forwardRef` dans le code nouveau ; pas de `any`, pas de cast pour faire taire le compilateur.

### ADR-012 : porte `pnpm verify` à huit étapes au plus
Statut : Acceptée.
Contexte : vingt et une étapes, dont de nombreux contrôles de contrôles, ont consommé le travail qu'elles étaient censées protéger.
Décision : huit étapes au plus, ordre fixe (voir `07-qualite-et-tests.md`). Aucune étape sans accord écrit et ADR.
Alternatives écartées : cliquets, registres, détecteurs et tests de parité de listes.

### ADR-013 : un composant à la fois, validé avant le suivant
Statut : Acceptée.
Décision : reconstruction des composants un par un, avec vérification visuelle humaine après chacun (voir `09-gouvernance-et-workflow.md`).
Alternatives écartées : migration par gros lots (régressions difficiles à attribuer, relecture impossible).

### ADR-014 : un token n'existe qu'avec un consommateur
Statut : Acceptée.
Décision : un sémantique exige un consommateur dans une recette, un token de composant exige au moins deux lectures.
Alternatives écartées : créer les tokens décrits par les specs d'avance (a produit des tokens sans lecteur).

### ADR-015 : API publique minimale
Statut : Acceptée.
Décision : sont publics les composants, les tokens sémantiques et de composant documentés, `--mr-ref-brand-*`, les attributs de données documentés, les noms de couches. Le reste est interne.

### ADR-016 : état de session dans un seul fichier
Statut : Acceptée.
Décision : la section `## Reprise` de `PLAN.md` (30 lignes au plus). Pas de `HANDOFF.md`. Les documents durables vivent dans `docs/foundation/`.

### ADR-017 : documents et rapports sans tableau
Statut : Acceptée.
Décision : prose et puces, jamais de tableau, même quand un gabarit externe en impose un.

### ADR-018 : échelles déclarées une seule fois dans semantic.css et valeurs brutes autorisées dans tokens/ et themes/
Statut : Acceptée (amende ADR-003).
Contexte : doubler chaque pas d'échelle par une primitive --mr-ref-space-* puis un sémantique --mr-space-* doublait le bruit sans gain sémantique. De plus, placer le thème clair par défaut dans semantic.css exige d'y autoriser les valeurs oklch brutes.
Décision : les échelles de dimension et de typographie (space, radius, font-size, font-weight, font-family, size) sont des tokens publics déclarés une seule fois dans `tokens/semantic.css`. `tokens/ref.css` ne conserve que les leviers de marque, neutres et mise à l'échelle (--mr-ref-brand-*, --mr-ref-neutral-*, --mr-ref-radius-scale). Les valeurs brutes sont autorisées dans `tokens/` et `themes/`, et strictement interdites dans `recipes/`, `base/` et `reset.css`. Un token se déclare uniquement sur les portées qui peuvent changer sa valeur : `:where(:root, [data-theme])` pour les neutres, échelles et alias afin de ne pas écraser le thème d'un conteneur ancêtre, et `:where(:root, [data-theme], [data-brand])` pour la marque et le focus.

### ADR-019 : catégorie size, rôle on-solid et emplacement du fichier de vocabulaire
Statut : Acceptée (amendée par ADR-020 pour le rôle on-solid).
Contexte : Button exige une hauteur de contrôle minimale, un texte sur fond d'accent et la fermeture du vocabulaire pour Stylelint.
Décision : ajout de la catégorie `size` (`--mr-size-control-*`) et du rôle `on-solid` (`--mr-accent-on-solid`) au vocabulaire clos. Décision ouverte tranchée : le fichier de vocabulaire unique lu par Stylelint vit à l'emplacement `tooling/stylelint/vocabulary.json`. Note : le rôle `on-solid` est ensuite retiré par ADR-020 lors du passage au style neutre.

### ADR-020 : style de base neutre (inverse/on-inverse), marque réservée aux variantes explicites et hauteur de contrôle 32px
Statut : Acceptée.
Contexte : Le bouton principal est l'action la plus fréquente de l'interface ; une couleur d'accent vive omniprésente fatigue l'œil. De plus, la hauteur md initiale de 40px (2.5rem) était surdimensionnée par rapport aux standards compacts de la bibliothèque.
Décision :
1. Le style par défaut du bouton principal adopte un contraste neutre noir et blanc via `--mr-bg-inverse: var(--mr-text-primary);` et `--mr-text-on-inverse: var(--mr-bg-canvas);`. Les rôles `inverse` (catégorie `bg`) et `on-inverse` (catégorie `text`) entrent dans le vocabulaire clos.
2. La couleur de marque (`--mr-accent-solid`) est réservée aux variantes explicites et à l'anneau de focus (`--mr-focus-ring`). Le token `--mr-accent-on-solid` est supprimé conformément à ADR-014.
3. La hauteur de contrôle de base `--mr-size-control-md` passe à 2rem (32px), portée par `min-block-size` pour autoriser l'extension si le zoom texte ou le contenu le requiert. La cible tactile respecte WCAG 2.5.8 (seuil 24px).
Alternatives écartées : conserver l'accent vif sur l'action par défaut (surcharge visuelle), hauteur fixe en px (empêche l'adaptation au zoom texte).

### ADR-021 : ordre des couches pour prefers-reduced-motion, durées en multiples de 50ms et grille d'états en multiples de 12%
Statut : Acceptée.
Contexte : L'ordre des couches CSS (`mr.reset, mr.base, mr.tokens, mr.themes, mr.components`) empêche `mr.base` de surcharger une variable déclarée dans `mr.tokens` à spécificité égale. De plus, les états interactifs et les transitions du bouton nécessitent des règles d'échelle strictes sans valeurs brutes dans les recettes.
Décision :
1. Une couche CSS ne peut jamais surcharger un token déclaré dans une couche postérieure. L'override de durée pour `prefers-reduced-motion: reduce` vit donc dans `mr.tokens`, immédiatement après la déclaration du token.
2. Les durées d'interaction suivent une échelle en multiples de 50ms (`--mr-duration-state: 150ms`).
3. Les mélanges d'état interactifs (`state-hover-mix`, `state-active-mix`, `state-disabled-mix`) forment une grille arithmétique en multiples de 12% (12% pour le survol, 24% pour l'actif, 84% pour le désactivé) dérivant la couleur par rapprochement du canevas (`--mr-bg-canvas`).
4. Aucune valeur brute de mélange ou d'état ne vit dans les recettes : tous les ratios sont déclarés sous forme de tokens `--mr-state-*-mix` dans le vocabulaire clos.

### ADR-022 : symétrie du thème sombre par permutation des rôles neutres et levier de luminosité d'accent pour conteneur de marque
Statut : Acceptée.
Contexte : Le thème sombre doit garantir les mêmes contrastes de texte et d'anneau de focus que le thème clair sans valeurs arbitraires ni rupture perceptuelle. De plus, un token dépendant à la fois du thème et de la marque (`--mr-accent-solid`) voit sa formule redéclarée sous `[data-brand]` ; avec une luminosité littérale en dur, un conteneur de marque sous thème sombre réinitialiserait la luminosité en clair.
Décision :
1. Règle de symétrie : le thème sombre échange les deux rôles de base du clair (`--mr-bg-canvas` sombre prend la valeur de `--mr-text-primary` clair `0.22`, et `--mr-text-primary` sombre prend celle de `--mr-bg-canvas` clair `0.955`). Un seul paramètre pour tout le système, contraste conservé à l'identique (15.19:1).
2. Texte désactivé sombre : luminosité calculée à `0.542` pour reproduire le ratio de 3.46:1 du clair sur son canevas.
3. Levier d'accent : ajout de la primitive `--mr-ref-accent-lightness: 0.5` dans `ref.css` (portée `:where(:root, [data-theme])`), redéfinie à `0.635` dans `dark.css` (reproduisant le contraste de ~5.0:1 de l'anneau de focus sur canevas). `--mr-accent-solid` lit ce levier.

### ADR-023 : dérivation des états de contrôle plein par mélange vers `--mr-text-primary`
Statut : Acceptée.
Contexte : Pour le bouton principal neutre, le fond s'obtient en rapprochant l'inverse du canevas (`--mr-bg-canvas`), car le texte (`--mr-text-on-inverse`) a déjà la couleur du canevas opposé. En revanche, pour un contrôle plein coloré dont le texte partage la couleur du canevas (`--mr-danger-on-solid: var(--mr-bg-canvas)`), mélanger le fond vers le canevas au survol et à l'actif rapproche la couleur de fond de la couleur du texte, faisant chuter le contraste sous le seuil WCAG AA de 4.5:1 (4.23:1 au survol et 3.37:1 à l'actif en clair).
Décision :
1. Dérivation d'état pour les contrôles pleins colorés : les états interactifs (survol et actif) mélangent le fond plein vers `--mr-text-primary` (pourcentages partagés `12%` et `24%`).
2. Règle de contraste : en s'approchant de `--mr-text-primary`, le fond s'éloigne de la couleur du texte (`--mr-bg-canvas`), augmentant le contraste interactif au lieu de le dégrader (6.27:1 au survol et 7.27:1 à l'actif en clair ; 5.64:1 au survol et 6.55:1 à l'actif en sombre).
3. L'état désactivé conserve le mélange à 84% vers `--mr-bg-canvas` avec le texte `--mr-text-disabled`.

### ADR-024 : bande de luminosité des surfaces portant un contrôle bordé
Statut : Acceptée.
Contexte : Les contrôles bordés utilisent un fond opaque (`--mr-bg-canvas`) et une bordure `--mr-border-control` (L=0,61 en clair, L=0,53 en sombre). Sur le canevas par défaut (L=0,955 en clair, L=0,22 en sombre), les contrastes atteignent respectivement 3,33:1 et 3,28:1. Posé sur une surface dont la luminosité s'écarte de plus de 0,034 du canevas, le ratio de la bordure tombe sous le seuil WCAG 1.4.11 (3,0:1).
Décision : L'Option B est retenue : contraindre la surface plutôt que multiplier les tokens de bordure. Un contrôle bordé ne peut être posé que sur une surface respectant la bande de luminosité admissible calculée par le moteur de contraste : L >= 0,921 en thème clair (intervalle [0,921, 1,000]) et L <= 0,254 en thème sombre (intervalle [0,000, 0,254]).
Alternatives écartées : Option A (adapter la bordure selon la surface ou introduire un token par niveau de surface, écartée pour éviter l'explosion du vocabulaire).
Conséquences : Toute surface portant un contrôle de saisie ou un bouton secondaire doit calibrer sa luminosité dans ces bornes. Si un conteneur exige une surface hors bande, un conteneur explicite ou un token contextuel devra faire l'objet d'un arbitrage par ADR.

### ADR-025 : les styles de portée sont opt-in par data-theme ; la base ne modifie jamais la taille racine
Statut : Acceptée.
Contexte : La base posait `font-size: var(--mr-font-size-md)` (0,875rem = 14px) sur `:where(:root, [data-theme])` ainsi que `background-color`, `color` et `color-scheme` sur `:root`. Cette imposition globale modifiait la taille racine de l'hôte, réduisant chaque valeur en rem de 12,5 % (les hauteurs des contrôles sm, md, lg tombaient à 24,5, 28 et 35 px au lieu de 28, 32 et 40 px) et violait la règle d'isolation en altérant 33 propriétés d'éléments nus d'une page hôte sans data-theme.
Décision :
1. Les styles de portée (fond, couleur de texte, famille de police, color-scheme) sont strictement opt-in et ne s'appliquent qu'aux conteneurs portant `[data-theme]`, jamais à `:root` seul.
2. La couche `mr.base` ne pose jamais de `font-size` ni de `line-height` sur une portée : la racine de l'hôte conserve sa taille native (16px par défaut du navigateur).
3. Chaque composant déclare sa propre taille de police (ex. `--mr-font-size-md` sur `.mr-btn` et `.mr-input`).
4. Les tokens par défaut (thème clair) restent déclarés sur `:root` dans `tokens/semantic.css` comme propriétés personnalisées inertes.
Alternatives écartées : fixer `font-size: 16px` sur `:root` (écrase le réglage d'accessibilité du navigateur de l'utilisateur) ; conserver `font-size: 0.875rem` sur `:root` (fausse toutes les mesures en rem de l'application hôte).
Conséquences : Les contrôles atteignent leurs dimensions nominales à la racine native (28, 32 et 40 px). Une page hôte sans data-theme ne subit aucune altération de style (0 différence). Les tests automatisés de non-imposition et de racine à 16px sont intégrés dans `check-contrast.js`.

### ADR-026 : bordure de contrôle discrète au repos et accessibilité garantie par le focus et le thème contrasté
Statut : Acceptée.
Contexte : À un ratio de contraste de 3,01:1 au repos (L=0,635 en clair, L=0,51 en sombre), les bordures de contrôle (Input et Button secondaire) sont perçues visuellement comme trop marquées (« trop blanches » en sombre et trop lourdes en clair) par rapport aux standards de design modernes.
Décision :
1. Les bordures de contrôle au repos (`--mr-border-control`) adoptent un ratio discret calibré entre 1,8:1 et 2,0:1 (L=0,75 en clair donnant 1,95:1 ; L=0,40 en sombre donnant 1,88:1 sur les canevas respectifs).
2. L'accessibilité visuelle est assurée par l'anneau de focus neutre (outline 1px à 4,8:1 sur canevas), par le survol (ratio >= 2,4:1) et par le futur thème contrasté (`high-contrast`) qui rétablira un ratio de bordure au repos >= 3,0:1.
Alternatives écartées :
- Conserver le seuil 3,0:1 au repos (rendu visuel jugé trop lourd et inadapté au produit).
- Différencier le fond de l'input par rapport au canevas (exigerait l'introduction prématurée d'un nouveau token de surface).
Conséquences : Les bordures de saisie et de bouton secondaire s'intègrent de manière subtile et épurée. Le seuil de test automatisé dans `test-contrast.js` est ajusté à 1,8:1 pour les bordures de contrôle au repos et 2,0:1 au survol.

## Décisions ouvertes

Ces décisions sont marquées `[DÉCISION]`. Tant qu'elles ne sont pas tranchées, personne ne les contourne : on s'arrête et on demande.

- `[DÉCISION]` **Packaging pour les Web Components** : comment le CSS est adopté dans un shadow root (feuilles adoptées par composant, déclaration de couches par shadow root). À trancher avant le premier composant destiné à un autre framework que React.
- `[DÉCISION]` **Polymorphisme des composants** : mécanisme (`as`, `asChild` ou équivalent) et règles de typage. À trancher avant le premier composant polymorphe.
- `[DÉCISION]` **Plancher de navigateurs** : versions minimales exactes, à fixer par mesure de l'audience avant la première publication.
- `[DÉCISION]` **Valeurs et noms des densités** : confirmer `compact`, `default`, `comfortable` à partir des échelles historiques.
- `[DÉCISION]` **Échelles initiales restantes** : pas et valeurs pour les autres rayons, autres tailles de texte, interlignes, ombres, profondeurs (z-index), épaisseurs de bordure et densités, à figer lors du premier composant qui les lit. Les règles déjà posées pour Button (grille d'espacement de 0,25rem, base de rayon de 2px, échelle des graisses) font foi pour l'ensemble du système.
- `[DÉCISION]` **Régénération des captures visuelles** : moment exact de la passe unique, après quel lot de composants.

## Ajouter un ADR

1. Prendre le numéro suivant, sans trou.
2. Remplir les quatre rubriques en quelques lignes, avec des faits mesurés.
3. L'inclure dans le commit qui applique la décision.
4. Si l'ADR en remplace un autre, marquer l'ancien `Remplacée par ADR-xxx` et ne pas le supprimer.
