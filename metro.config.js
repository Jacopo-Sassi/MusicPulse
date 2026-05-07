const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

const config = {
  transformer: {
    minifierPath: 'metro-minify-terser',
  },
  maxWorkers: 2, // IMPORTANTISSIMO su laptop
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
