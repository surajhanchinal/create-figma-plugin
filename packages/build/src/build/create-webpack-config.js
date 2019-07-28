import { join } from 'path'
import TerserPlugin from 'terser-webpack-plugin'
import webpack from 'webpack'
import { constants } from '@create-figma-plugin/common'

export function createWebpackConfig (entry, isDevelopment, isWatch) {
  const mode = isDevelopment ? 'development' : 'production'
  return {
    mode,
    entry,
    output: {
      filename: '[name].js',
      path: join(process.cwd(), constants.build.directoryName)
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader'
        }
      ]
    },
    watch: isWatch,
    resolve: {
      modules: [
        join(process.cwd(), constants.src.directory),
        process.cwd(),
        'node_modules'
      ],
      extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    devtool: isDevelopment ? 'inline-cheap-source-map' : 'none',
    stats: 'errors-only',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          }
        })
      ]
    }
  }
}