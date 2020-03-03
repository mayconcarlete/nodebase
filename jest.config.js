module.exports = {
  collectCoverage: true,
  coverageDirectory: '__tests__/coverage',
  collectCoverageFrom: ['src/**', '!src/database/migrations/**'],
  testEnvironment: 'node',
  testMatch: [
    "**/__tests__/**/*.test.js?(x)"
  ]
}
