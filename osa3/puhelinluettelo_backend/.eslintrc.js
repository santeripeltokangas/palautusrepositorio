module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: 'eslint:recommended',
    parserOptions: {
      ecmaVersion: 'latest',
    },
    rules: {
      indent: ['error', 2],
      'linebreak-style': [
        'error',
        process.platform === 'win32' ? 'windows' : 'unix',
      ],
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
    },
  };