export default {
    plugins: ['./tooling/stylelint/no-raw-values.js'],
    rules: {
        'monority/no-raw-values': true,
        'selector-max-specificity': '0,2,0',
    },
}
