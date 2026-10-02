# 01 : Principes

Ce document sert à trancher quand une règle précise manque. Il explique pourquoi le système est fait ainsi, pour qu'un contributeur puisse raisonner sans demander.

## Principes directeurs

1. **Le CSS écrit à la main est la source de vérité.** Aucune génération de code sans consommateur mesuré. Un fichier généré est une dette : il faut un outil, une étape de build, un contrôle de fraîcheur. On n'en crée que si un consommateur concret l'exige (par exemple des types TypeScript lus par du code).
2. **Le moins de machinerie possible.** Chaque contrôle automatique doit prévenir une régression réelle et déjà observée. Un contrôle qui en contrôle un autre est interdit.
3. **Une information, une source.** Une valeur de couleur, un nom de thème, une échelle ne sont écrits qu'à un seul endroit. Toute liste recopiée finit par diverger en silence : on la lit du disque (glob) ou on la dérive.
4. **Le consommateur gagne toujours.** La bibliothèque n'impose rien à l'application hôte : ses règles sont dans des couches, sa spécificité est minimale, ses noms sont préfixés. Une surcharge simple par le consommateur doit suffire, sans `!important`.
5. **Surface publique minimale et documentée.** Tout ce qui est public est un engagement de compatibilité. On expose peu, on documente ce qu'on expose, on garde le reste interne.
6. **L'accessibilité n'est pas une option.** Contraste, clavier, mouvement réduit et contraste forcé sont gérés par la fondation, pas par chaque composant.
7. **Cohérence plutôt que flexibilité.** Une seule façon évidente de faire chaque chose. Un nouveau mécanisme n'est introduit que si deux usages réels l'exigent.
8. **Petits changements réversibles.** Un commit, un sujet. Un composant à la fois, vérifié avant le suivant.
9. **Preuve plutôt qu'affirmation.** Un changement visuel se vérifie dans le navigateur, un chiffre se mesure, un nouveau contrôle se teste en négatif.
10. **Dégradation gracieuse.** Les fonctionnalités récentes (`color-mix`, `@property`) ne cassent pas l'affichage quand elles manquent : une valeur de repli lisible est prévue quand le support n'est pas garanti.

## Non-objectifs

- Pas de CSS-in-JS à l'exécution.
- Pas de bibliothèque d'utilitaires de type Tailwind : les utilitaires de la couche `mr.utilities` restent peu nombreux, et chacun doit avoir un usage mesuré.
- Pas de support des navigateurs anciens (voir `08-publication-et-versions.md`).
- Pas de génération multi-plateforme (iOS, Android, Figma) : le système est web uniquement.
- Pas d'APCA : la cible de contraste est WCAG 2.2 AA.
- Pas de variantes de thème par composant : un thème est global.

## Cadre de décision

Quand deux options sont possibles, applique dans l'ordre :

1. **Lisibilité dans deux ans** : un développeur qui n'a pas suivi le chantier comprend-il le code sans explication orale ?
2. **Coût du centième élément** : ajouter le centième token, composant ou thème coûte-t-il autant que le vingtième ? Sinon, la structure est mauvaise.
3. **Réversibilité** : si on se trompe, combien de fichiers faut-il toucher pour revenir en arrière ?
4. **Simplicité** : la solution la plus simple qui respecte les règles de ce dossier l'emporte. Pas d'abstraction sans deuxième cas d'usage prouvé.

Règle des deux usages : un token de composant, un utilitaire ou un mécanisme partagé n'existe qu'à partir de deux consommateurs réels.

## Ce qu'un contributeur ne fait pas seul

- Modifier une règle de ce dossier sans ADR.
- Ajouter une étape à `pnpm verify`.
- Changer l'API publique d'un composant.
- Introduire une dépendance d'exécution dans `@monority/ui`.

Dans ces cas, il s'arrête et demande, avec une alternative chiffrée.
