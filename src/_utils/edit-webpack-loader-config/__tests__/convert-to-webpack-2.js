import co from "../convert-to-webpack-2"

describe("convert loader config to webpack 2 format", () => {
  describe("loader", () => {
    it("single loader with no query string", () => {
      expect(
        co({
          test: "foo",
          loader: "foo-loader",
        })
      )
      .toEqual({
        test: "foo",
        loaders: [ {
          loader: "foo-loader",
        } ],
      })
    })
    it("single loader with query string", () => {
      expect(
        co({
          test: "foo",
          loader: "foo-loader?name=foo",
        })
      )
      .toEqual({
        test: "foo",
        loaders: [ {
          loader: "foo-loader",
          query: {
            name: "foo",
          },
        } ],
      })
    })
    it("multiple loader with no query string", () => {
      expect(
        co({
          test: "foo",
          loader: "foo-loader!bar-loader",
        })
      )
      .toEqual({
        test: "foo",
        loaders: [
          {
            loader: "foo-loader",
          },
          {
            loader: "bar-loader",
          },
        ],
      })
    })
    it("multiple loader with query string on 1 loader", () => {
      expect(
        co({
          test: "foo",
          loader: "foo-loader!bar-loader?name=foo",
        })
      )
      .toEqual({
        test: "foo",
        loaders: [
          {
            loader: "foo-loader",
          },
          {
            loader: "bar-loader",
            query: {
              name: "foo",
            },
          },
        ],
      })
    })
    it("multiple loader with query string on all of them", () => {
      expect(
        co({
          test: "foo",
          loader: "foo-loader?phenomic=awesome!bar-loader?name=foo",
        })
      )
      .toEqual({
        test: "foo",
        loaders: [
          {
            loader: "foo-loader",
            query: {
              phenomic: "awesome",
            },
          },
          {
            loader: "bar-loader",
            query: {
              name: "foo",
            },
          },
        ],
      })
    })
  })
  describe("loaders", () => {
    it("single loader defined by string", () => {
      expect(
        co({
          test: "foo",
          loaders: [
            "foo-loader?phenomic=awesome",
          ],
        })
      )
      .toEqual({
        test: "foo",
        loaders: [ {
          loader: "foo-loader",
          query: {
            phenomic: "awesome",
          },
        } ],
      })
    })
    it("multiple loaders defined by string and object", () => {
      expect(
        co({
          test: "foo",
          loaders: [
            "foo-loader?phenomic=awesome",
            {
              loader: "bar-loader",
            },
            {
              loader: "baz-loader",
              query: {
                phenomic: "awesome",
              },
            },
          ],
        })
      )
      .toEqual({
        test: "foo",
        loaders: [
          {
            loader: "foo-loader",
            query: {
              phenomic: "awesome",
            },
          },
          {
            loader: "bar-loader",
          },
          {
            loader: "baz-loader",
            query: {
              phenomic: "awesome",
            },
          },
        ],
      })
    })
  })
})
