module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.test.js$',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.js?$': 'babel-jest',
  },
  coverageDirectory: '../coverage',
  testResultsProcessor: 'jest-sonar-reporter',
  collectCoverageFrom: ['**/*.(t|j)s', '!**/node_modules/**'],
};
