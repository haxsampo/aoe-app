module.exports = {
  "env": {
    "commonjs": true,
    "es2021": true
  },
  "overrides": [
    {
      "env": {
        "node": true
      },
      "files": [
        ".eslintrc.{js,cjs}"
      ],
      "parserOptions": {
        "sourceType": "script"
      }
    }
  ],
  "parserOptions": {
    "ecmaVersion": "latest"
  },
  "rules": {
    'indent': [
      'error',
      2
    ],
  }
}
