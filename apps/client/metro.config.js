const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Find the project root (iron-scribe folder)
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Watch all files in the monorepo (so it sees packages/common)
config.watchFolders = [workspaceRoot];

// 2. Let Metro resolve modules from the root node_modules
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Force Metro to resolve shared packages correctly
config.resolver.disableHierarchicalLookup = true;
config.resolver.unstable_conditionNames = ["browser", "require", "react-native"];

module.exports = config;