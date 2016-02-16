import test from "ava"; import "babel-core/register"

import beautifyHTML from ".."

test("should make html readable", (t) => (
  t.is(
    beautifyHTML("<html><body><h1>title</h1><p>test</p></body></html>"),
    `<html>

<body>
  <h1>title</h1>
  <p>test</p>
</body>

</html>`
  )
))
