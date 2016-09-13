import test from "jest-ava-api"
import editor from "../"

const genConfig = (loaders) => ({
  module: {
    loaders,
  },
})

const singleFileType = (loaderString) => genConfig([
  {
    loader: loaderString,
  },
])

describe("it edits webpack loader query config", () => {
  // test("")
})
//
// test("loader: edit a query", (t) => {
//   t.deepEqual(
//     editor(
//       singleFileType("foo-loader?name=foo"),
//       "foo-loader",
//       { name: "bar" }
//     ),
//     singleFileType("foo-loader?name=bar"),
//     "1 loader"
//   )
//   t.deepEqual(
//     editor(
//       singleFileType("foo-loader!bar-loader?name=foo"),
//       "bar-loader",
//       { name: "bar" }
//     ),
//     singleFileType("foo-loader!bar-loader?name=bar"),
//     "multiple loaders"
//   )
// })
//
// test.todo("loaders: add a query")
// test.todo("loaders: edit a query")
//
// test.todo("[WP 2] loaders: add a query")
// test.todo("[WP 2] loaders: edit a query")
//
// test.todo("can alter short loader name")
