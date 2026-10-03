# 06 : Accessibilité

Ce document fixe les cibles d'accessibilité et la façon dont la fondation les garantit. Il sert à choisir une couleur, écrire un état de focus ou valider un composant.

## Cible

WCAG 2.2 niveau AA, comme plancher. Pas d'APCA : un second seuil à maintenir sans arbitrage clair n'apporte rien. Si un jour le contraste devient un frein produit, la décision se rouvre par ADR.

## Contraste

- Texte normal : 4,5:1 minimum. Grand texte : 3:1.
- Composants d'interface et objets graphiques (bordure d'un contrôle, icône porteuse de sens, anneau de focus) : 3:1 minimum (WCAG 1.4.11).
- Les bordures de contrôle au repos atteignent 3:1 sur leur fond. Un contrôle à bordure a toujours un fond opaque. Un contrôle bordé ne peut être posé que sur une surface respectant la bande de luminosité admissible (L >= 0,921 en thème clair pour une bordure à L=0,61 ; L <= 0,254 en thème sombre pour une bordure à L=0,53) afin de garantir un ratio de contraste supérieur ou égal à 3,0:1 (WCAG 1.4.11).
- Le thème `high-contrast` a des seuils propres, plus élevés, qu'aucune modification ne peut abaisser.
- Viser une marge : environ 3,3 pour un seuil de 3, 4,8 pour un seuil de 4,5. Le minimum exact casse au premier ajustement de teinte.
- Les paires vérifiées par le test de contraste, pour chaque thème : texte principal et secondaire sur chaque fond ; texte désactivé selon la règle du thème ; bordure de contrôle sur fond de surface ; texte de statut sur surface et sur canevas ; texte sur fond solide de danger ; texte et bordure d'accent ; anneau de focus sur chaque fond. Tout composant qui introduit une nouvelle paire l'ajoute au test dans le même commit.

Les valeurs qui échouent se corrigent à la source (la valeur du token), jamais en abaissant le seuil ni en excluant la paire.

## Focus

- `:focus-visible` seulement : pas d'anneau au clic souris, anneau toujours présent au clavier.
- Un seul style de focus pour toute la bibliothèque, défini par tokens (`--mr-focus-*`) dans la base. Une recette ne le redéfinit pas.
- L'anneau doit rester visible sur tous les fonds de la bibliothèque (3:1) et ne jamais être coupé par `overflow`.
- Aucun `outline: none` sans équivalent visible.

## Clavier

- Tout ce qui se fait à la souris se fait au clavier.
- Ordre de tabulation conforme à l'ordre visuel ; pas de `tabindex` positif.
- Composants composites (menu, onglets, listes) : pattern de navigation de la spécification de WAI-ARIA Authoring Practices correspondante, avec roving tabindex ou `aria-activedescendant`.
- Pas de piège clavier. Les surfaces modales piègent le focus volontairement et le rendent à l'élément déclencheur à la fermeture.

## Cibles tactiles

Taille minimale 24 par 24 pixels CSS (WCAG 2.2, critère 2.5.8). Objectif recommandé pour les contrôles principaux : 44 par 44. La taille minimale est portée par la base ou par les tailles de composant, pas par chaque recette.

## Mouvement

- `prefers-reduced-motion: reduce` est géré dans la couche `mr.tokens` (et non `mr.base`), en respect de l'ordre des couches : une couche antérieure ne peut pas surcharger un token déclaré dans une couche postérieure. Les durées de transition et d'animation (`--mr-duration-*`) y tombent à zéro (`0ms`).
- Le contenu ne dépend jamais d'une animation pour être compris.
- Pas de clignotement supérieur à trois flashs par seconde.
- Tout nouveau token de durée est couvert par la règle de mouvement réduit : aucun `duration-*` ne peut en être absent.

## Contraste forcé et préférence de contraste

- `forced-colors: active` : les composants restent utilisables avec la palette système. Les bordures et les anneaux de focus n'utilisent que des couleurs système ou des bordures réelles (pas de simple ombre ni de fond pour exprimer une limite). Les icônes portent `forced-color-adjust` seulement quand c'est nécessaire.
- `prefers-contrast: more` : gérée dans la base, par les tokens de bordure et de texte, indépendamment du thème `high-contrast` explicite.

## Texte et mise en page

- Les tailles de texte sont en unités relatives. Le texte reste lisible à 200 % de zoom, sans défilement horizontal pour le contenu courant à 320 pixels de large.
- Aucune information transmise par la couleur seule : un état d'erreur ajoute une icône, un texte ou une bordure.
- Les espacements de texte (interligne, interlettrage) peuvent être élargis par l'utilisateur sans perte de contenu.

## Vérification

Par composant, avant validation :

1. Tests de comportement accessible dans le fichier de test du composant (`getByRole`, états ARIA, clavier).
2. Contrôle automatique des règles d'accessibilité (axe) dans les tests du composant, si l'outil est déjà présent dans le dépôt. Il ne s'ajoute pas comme nouvelle étape de `pnpm verify`.
3. Vérification manuelle dans la page de vérification visuelle : navigation au clavier complète, focus visible sur chaque état, rendu en `high-contrast` et avec les couleurs forcées du navigateur, mouvement réduit activé.

Un composant qui échoue à l'une de ces vérifications n'est pas terminé.
