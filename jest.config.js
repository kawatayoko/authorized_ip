module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/src/**/*.test.js', '**/src/**/*.test.ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  }
};