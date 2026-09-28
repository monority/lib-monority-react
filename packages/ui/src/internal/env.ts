/**
 * Vrai hors production. La référence à `process.env.NODE_ENV` doit rester
 * littérale : les bundlers la remplacent à la compilation, ce qui élimine le
 * code de développement.
 *
 * Deux contraintes pour que l'élimination fonctionne réellement (vérifié avec
 * un bundle de production, voir `prod-elimination.test.ts`) :
 *
 * - la constante, et non une fonction : les minifieurs propagent les
 *   constantes inter-modules mais n'inlinent pas les appels de fonction ;
 * - le code de développement va dans un bloc positif `if (isDevelopment) { … }`.
 *   Après substitution, `if (false)` disparaît avec son corps, alors qu'un
 *   retour anticipé `if (!isDevelopment) return` laisse le corps dans le bundle.
 *   Un appelant qui passe un message littéral à `deprecate()` doit donc garder
 *   l'appel derrière `if (isDevelopment)`, sinon le message reste dans le
 *   bundle de production.
 */
export const isDevelopment = process.env.NODE_ENV !== 'production'
