# 10 : Décisions

Ce document est le journal des décisions de la fondation. Il sert à comprendre pourquoi une règle existe, avant de proposer de la changer.

## Format d'un ADR

Chaque décision a un numéro stable (jamais réutilisé), un statut, et quatre rubriques courtes :

- **Contexte** : le problème, avec les faits mesurés.
- **Décision** : ce qui est retenu, en une ou deux phrases.
- **Alternatives écartées** : ce qui a été envisagé, avec la raison du rejet.
- **Conséquences** : ce que cela impose, et ce qui rouvrirait la décision.

Statuts : `Acceptée`, `Remplacée par ADR-xxx`, `Abandonnée`. Une décision remplacée reste dans le journal. Un ADR s'écrit au plus tard dans le commit qui applique la décision. Les numéros se suivent sans trou.

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

## Décisions ouvertes

Ces décisions sont marquées `[DÉCISION]`. Tant qu'elles ne sont pas tranchées, personne ne les contourne : on s'arrête et on demande.

- `[DÉCISION]` **Packaging pour les Web Components** : comment le CSS est adopté dans un shadow root (feuilles adoptées par composant, déclaration de couches par shadow root). À trancher avant le premier composant destiné à un autre framework que React.
- `[DÉCISION]` **Polymorphisme des composants** : mécanisme (`as`, `asChild` ou équivalent) et règles de typage. À trancher avant le premier composant polymorphe.
- `[DÉCISION]` **Plancher de navigateurs** : versions minimales exactes, à fixer par mesure de l'audience avant la première publication.
- `[DÉCISION]` **Valeurs et noms des densités** : confirmer `compact`, `default`, `comfortable` à partir des échelles historiques.
- `[DÉCISION]` **Échelles initiales** (espacement, rayons, tailles de texte, ombres, profondeurs) : pas et valeurs, issues de l'archive de l'ancien système, à figer lors du premier composant qui les lit.
- `[DÉCISION]` **Régénération des captures visuelles** : moment exact de la passe unique, après quel lot de composants.

## Ajouter un ADR

1. Prendre le numéro suivant, sans trou.
2. Remplir les quatre rubriques en quelques lignes, avec des faits mesurés.
3. L'inclure dans le commit qui applique la décision.
4. Si l'ADR en remplace un autre, marquer l'ancien `Remplacée par ADR-xxx` et ne pas le supprimer.
