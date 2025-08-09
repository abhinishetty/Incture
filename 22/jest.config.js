// export default {
//   testEnvironment: "jsdom",
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
// };

// jest.config.js
export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    // "^.+\\.tsx?$": "ts-jest", // if you use TypeScript
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Example: alias for '@components/*' to '<rootDir>/src/components/*'
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    
    // Add other path aliases here if you use them in your imports
  },
};
