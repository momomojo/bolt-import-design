const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);

  // Add custom rules or modifications here

  // Modify the resolver to handle AsyncStorage for web
  if (!config.resolve) {
    config.resolve = {};
  }
  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }

  // Add fallbacks for node modules in web
  config.resolve.alias['@react-native-async-storage/async-storage'] =
    'react-native-web/dist/modules/AsyncStorage/index.js';

  // For other potential React Native modules used in web
  config.resolve.alias['react-native'] = 'react-native-web';

  return config;
};
