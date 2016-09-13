import co from "../convert-to-webpack-1"

describe("convert loader config from formated wp2 format to wp1", () => {
  test("single loader", () => {
    expect(
      co({
        test: "foo",
        loaders: [
          {
            loader: "foo-loader",
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
        "foo-loader?phenomic=awesome",
      ],
    })
  })
  test("multiple loaders", () => {
    expect(
      co({
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
        ],
      })
    )
    .toEqual({
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
        "bar-loader",
      ],
    })
  })
  test("multiple loaders with complex query string", () => {
    expect(
      co({
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
              presets: [
                "foo",
                "bar",
                "baz",
              ],
            },
          },
        ],
      })
    )
    .toEqual({
      test: "foo",
      loaders: [
        "foo-loader?phenomic=awesome",
        "bar-loader?presets=foo&presets=bar&presets=baz",
      ],
    })
  })
})
