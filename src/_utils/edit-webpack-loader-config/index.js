// @flow
import convertToWebpack2 from "./convert-to-webpack-2"

// TODO: Handle if one loader is used multiple times
// TODO: Handle short loader name (loader is ommited)

const editWebpackLoaderConfig = (
  config: WebpackConfig,
  loaderName: string,
  queryEdition: Object,
  isThisWebpack2: Boolean = true
): WebpackConfig => {
  if (
    config.module.hasOwnProperty("loader") &&
    !Array.is(config.module.loaders)
  ) {
    throw new Error("config parameter must be a valid webpack config")
  }

  const fileTypes = config.module.loaders
    .map((fileType) => convertToWebpack2(fileType))
    .map((loader) => {
      // Yeah, this is the loader that we are looking for
      if (loader.search(loaderName) > -1) {
        return {
          ...loader,
          query: {
            ...loader.query,
            ...queryEdition,
          },
        }
      }

      return loader
    })

  if (isThisWebpack2) {
    return {
      ...config,
      module: {
        ...config.module,
        loaders: fileTypes,
      },
    }
  }

  // convert fileTypes back to webpack 1 format and return
}

export default editWebpackLoaderConfig
