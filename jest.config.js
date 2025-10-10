// jest.config.js
module.exports = {
  testEnvironment: 'node',
  testTimeout: 10000, // 10 second timeout
  setupFilesAfterEnv: ['./jest.setup.js'], // a setup file for db connection
};
