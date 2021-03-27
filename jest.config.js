const path = require('path')

const rootDir = __dirname
const srcDir = path.join(rootDir, 'src')
const testDir = path.join(rootDir, 'test')
const coverageDirectory = path.join(rootDir, 'coverage')

module.exports = {
  rootDir: rootDir,
  roots: ['<rootDir>/src', '<rootDir>/test'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleDirectories: ['node_modules', srcDir, testDir, rootDir],
  testMatch: ['**/*.{spec,test}.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageReporters: ['text', 'lcov'],
  coverageDirectory,
}
