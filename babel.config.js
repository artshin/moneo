module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'babel-plugin-module-resolver',
      {
        cwd: 'babelrc',
        root: ['.'],
        extensions: ['.js', 'jsx', '.ts', 'tsx', '.ios.js', '.android.js'],
        alias: {
          '@UI': './src/UI',
          '@Components': './src/Components',
          '@Containers': './src/Containers',
          '@Navigation': './src/Navigation',
          '@Storybook': './src/Storybook',
          '@DB': './src/DB',
          '@Models': './src/Models',
          '@Contexts': './src/Contexts'
        }
      }
    ]
  ]
}
