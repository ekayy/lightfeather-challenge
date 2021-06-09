module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [2, 'always', 'pascal-case'],
    'scope-case': [2, 'always', 'kebab-case'],
    'type-enum': [
      2,
      'always',
      [
        'Chore',
        'Ci',
        'Docs',
        'Feat',
        'Fix',
        'Perf',
        'Refactor',
        'Revert',
        'Style',
        'Test',
      ],
    ],
  },
}
