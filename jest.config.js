module.exports = {
  clearMocks: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/out'],
  testPathIgnorePatterns: ['<rootDir>/.next', '<rootDir>/out'],
  preset: 'ts-jest',
  transform: {
    '.*': 'babel-jest'
  }
}
