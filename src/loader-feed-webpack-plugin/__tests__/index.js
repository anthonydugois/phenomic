import webpack from "webpack"
import { sync as rimraf } from "rimraf"

import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"
import PhenomicLoaderFeedWebpackPlugin from "../index.js"

const outputPath = __dirname + "/output/"
rimraf(outputPath)

describe("Loader", () => {
  it("Feed webpack plugin", () => {
    return new Promise((resolve, reject) => {
      webpack(
        {
          module: {
            loaders: [
              {
                test: /\.md$/,
                loader: __dirname + "/../../loader/index.js",
                exclude: /node_modules/,
              },
            ],
          },
          entry: __dirname + "/fixtures/script.js",
          resolve: { extensions: [ "" ] },
          output: {
            path: outputPath + "/routes",
            filename: "routes.js",
          },
          plugins: [
            new PhenomicLoaderWebpackPlugin(),
            new PhenomicLoaderFeedWebpackPlugin({
              feedsOptions: {
                title: "title",
                site_url: "site_url",
              },
              feeds: {
                "feed.xml": {},
              },
            }),
          ],
        },
        function(err, stats) {
          if (err) {
            reject(err)
          }
          resolve(stats)
        })
    })
    .then((stats) => {
      expect(stats.hasErrors()).toBeFalsy()
      if (stats.hasErrors()) {
        console.error(stats.compilation.errors)
      }

      expect(stats.hasWarnings()).toBeFalsy()
      if (stats.hasWarnings()) {
        console.log(stats.compilation.warnings)
      }

      const feed = stats.compilation.assets["feed.xml"]
      if (!feed) {
        console.log(stats.compilation.assets)
      }
      expect(feed && feed._value).toBeTruthy()
    })
  })
})
