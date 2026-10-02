# 04 : Tokens et thèmes

Ce document fixe les niveaux de tokens, leur nommage, la gestion des thèmes, de la marque et de la densité, et la manière de dériver les états. Il sert à créer ou modifier un token, un thème ou une valeur.

## Trois niveaux

1. **Primitives** (`--mr-ref-*`) : leviers modifiables par la marque, les thèmes et la mise à l'échelle (`--mr-ref-brand-*`, `--mr-ref-neutral-*`, `--mr-ref-radius-scale`). Internes, sauf `--mr-ref-brand-hue` et `--mr-ref-brand-chroma`, qui sont l'interface publique de la marque.
2. **Sémantiques** (`--mr-bg-*`, `--mr-text-*`, `--mr-space-*`, `--mr-radius-*`, `--mr-size-*`, `--mr-font-*`) : rôles d'usage et échelles de dimension/typographie déclarés une seule fois sous leur nom public dans `semantic.css` (ADR-018). Publics.
3. **Tokens de composant** (`--mr-<composant>-*`) : points de personnalisation d'un composant, qui référencent des sémantiques. Publics s'ils sont documentés.

Règles de niveau :

- Une recette ne lit que des sémantiques ou ses propres tokens de composant. Jamais une primitive.
- Une valeur brute n'existe que dans `tokens/` et dans `themes/` (ADR-018).
- Un sémantique ne référence pas un token de composant. Un token de composant ne référence pas un autre composant.
- Aucun cycle de références.

## Nommage

Grammaire : `--mr-<catégorie>-<rôle>[-<variante>]` pour les sémantiques, `--mr-ref-<catégorie>-<nom>` pour les primitives, `--mr-<composant>-<propriété>[-<variante>]` pour les tokens de composant.

Le vocabulaire des catégories et des rôles est **fermé** : il vit dans un seul fichier de vocabulaire (`tooling/stylelint/vocabulary.json`), lu par Stylelint, qui ne contient que des noms et aucune valeur. Ajouter un mot au vocabulaire est une décision (ADR si la catégorie est nouvelle).

Catégories :

- `bg` : fonds (`canvas`, `surface`, `raised`, `sunken`, `overlay`, `inverse`).
- `text` : couleurs de texte uniquement (`primary`, `secondary`, `tertiary`, `disabled`, `on-inverse`). Les tailles de texte ne portent jamais ce préfixe.
- `border` : couleurs de bordure (`subtle`, `default`, `control`).
- `accent` : couleurs de marque (`solid`, `subtle`, `border`, `text`).
- `danger`, `warning`, `success`, `info` : statuts, avec les rôles `text`, `solid`, `subtle`.
- `chart` : couleurs de séries (`1` à `5`, et `muted` seulement avec un consommateur avéré).
- `focus` : anneau de focus.
- `font-family`, `font-size`, `font-weight`, `line-height` : typographie.
- `space` : espacements. `radius` : rayons. `size` : tailles de contrôle (`control-md`, etc.). `border-width` : épaisseurs. `shadow` : ombres. `z` : profondeurs.
- `duration`, `ease` : mouvement. Les durées sont nommées par rôle (`state` pour les transitions d'état, `panel` pour le mouvement d'une surface, `spin`, `pulse`), jamais par composant.

Règles :

- Identifiants, catégories et rôles en anglais. Le français reste dans la prose et le texte utilisateur.
- Un nom décrit un rôle, jamais un composant consommateur ni une valeur (`--mr-bg-raised`, jamais `--mr-bg-white`).
- Une échelle est une suite courte de pas nommés (`xs`, `sm`, `md`, `lg`, `xl`), plafonnée. Ajouter un pas est une décision. Les valeurs initiales sont reprises de l'historique, pas redessinées.

## Création d'un token

Un token n'est créé que s'il a un consommateur réel.

- Sémantique : au moins un composant le lit, et la spec ou le langage visuel le justifie.
- Token de composant : au moins deux déclarations de la recette le lisent. Sinon, la recette lit directement le sémantique.
- Aucune création « par anticipation » ou parce qu'une spec le décrit sans qu'aucune recette ne l'utilise.

Procédure : écrire le token dans le fichier de son niveau, ses valeurs dans chaque thème où elles diffèrent, ajouter ses paires de contraste au test de contraste si elles sont nouvelles, annoncer dans le message de commit tout changement de rendu.

## Couleurs

- Format `oklch(L C H)`. Les neutres utilisent `--mr-ref-neutral-hue` et `--mr-ref-neutral-chroma`, la marque `--mr-ref-brand-hue` et `--mr-ref-brand-chroma`.
- Un thème neutre ne redéfinit pas les teintes. Un thème teinté (slate, ocean, night) redéfinit localement ses primitives de teinte dans son propre fichier ; il ne code jamais chroma ou hue en dur dans une recette.
- Teintes de statut fixes : succès 155, avertissement 80, danger 25, information 255. Elles n'ont pas de primitive : une marque ne peut pas les recolorer. Révision à prévoir seulement si une teinte de marque approche une teinte de statut, ou si des statuts personnalisables sont demandés.
- Chaque paire de couleurs d'usage respecte les seuils de `06-accessibilite.md`, avec une marge (environ 3,3 pour un seuil de 3).

## États dérivés

Les états `hover`, `active`, `focus` et `disabled` se dérivent, ils ne se déclarent pas comme tokens :

```css
.mr-button:hover {
  background: color-mix(in oklch, var(--mr-button-bg), var(--mr-text-primary) 8%);
}
```

Quand le support de `color-mix` n'est pas garanti, la valeur d'état de repli est le token de base, jamais une couleur brute. Les pourcentages de mélange sont des tokens partagés (`--mr-state-hover-mix`), pas des littéraux répétés.

## Thèmes

- Thèmes : `light`, `dark`, `slate`, `oled`, `ocean`, `night`, `high-contrast`.
- `dim` est un alias de `dark`, déclaré par un sélecteur groupé (`[data-theme="dark"], [data-theme="dim"]`). Il ne produit pas de bloc propre et n'est jamais compté comme thème.
- `system` est une préférence utilisateur résolue à l'exécution dans `@monority/ui`, avant le premier rendu. Elle n'a aucune existence en CSS.
- Un thème est un fichier `themes/<nom>.css` contenant `[data-theme="<nom>"]` et uniquement ce qui diffère du défaut. La liste des thèmes se lit du dossier par un glob, jamais d'une liste recopiée.
- Chaque thème déclare `color-scheme`.
- Le thème par défaut (`light`) vit dans `tokens/semantic.css` : un token se déclare uniquement sur les portées qui peuvent changer sa valeur (`:where(:root, [data-theme])` pour les neutres, échelles et alias, et `:where(:root, [data-theme], [data-brand])` pour la marque et le focus).
- Cette séparation garantit que la marque se réévalue par cascade sans écraser le thème actif sur un conteneur ancêtre.

Ajouter un thème : créer un fichier dans `themes/`, vérifier le contraste, ne rien changer d'autre. Si ajouter un thème exige de toucher un autre fichier, la structure est en défaut et doit être corrigée avant de continuer.

## Marque

`[data-brand]` redéfinit uniquement `--mr-ref-brand-hue` et `--mr-ref-brand-chroma`. Tout ce qui dépend de la marque se réévalue par cascade grâce au sélecteur `:where(:root, [data-theme], [data-brand])` de `semantic.css`, sans altérer les tokens neutres ou d'échelle. Aucun contournement par composant.

## Densité

`[data-density]` redéfinit les tokens d'espacement concernés. Pas de classes parallèles, pas de recette dupliquée par densité. Les valeurs de densité (`compact`, `default`, `comfortable` à confirmer) sont portées par des primitives, lues par des sémantiques d'espacement.

## Dépréciation

Un token public n'est jamais supprimé ni renommé sans le processus de `08-publication-et-versions.md`. Un alias déprécié garde sa cible : on migre les usages, pas l'alias. Aucun code nouveau n'utilise un token déprécié.

## Ajouter ou modifier : liste de contrôle

- Le token a un consommateur identifié (fichier et ligne).
- Son niveau et son nom respectent la grammaire et le vocabulaire.
- Aucune valeur brute hors `ref.css` et `themes/`.
- Ses valeurs existent dans tous les thèmes où elles diffèrent.
- Ses paires de contraste sont couvertes.
- Le changement de rendu est annoncé dans le message de commit.
