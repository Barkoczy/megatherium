module.exports = {
  parserOptions: {
    project: ['./web/tsconfig.json'],
  },
  extends: [
    'next/core-web-vitals',
    'airbnb-base',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
};
