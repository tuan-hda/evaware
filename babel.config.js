module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
          alias: {
            // This needs to be mirrored in tsconfig.json
            '~': './src'
          },
          root: ['.']
        }
      ],
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ]
  }
}
