require('@rushstack/eslint-config/patch/modern-module-resolution');

module.exports = {
  "overrides": [
    {
      "files": [
        "**/*.ts"
      ],
      "extends": [
        "airbnb-base",
        "airbnb-typescript/base"
      ],
      "parserOptions": {
        "project": ["./apps/*/tsconfig.json"]
      },
      "rules": {
        "prefer-destructuring": 0,
        "import/prefer-default-export": 0,
        "no-bitwise": 0,
        "no-plusplus": 0
      }
    }
  ]
}
