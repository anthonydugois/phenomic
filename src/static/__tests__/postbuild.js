import postBuild from "../postbuild"
import { join } from "path"
import pify from "pify"
import mockFs from "mock-fs"
import fs from "fs"
const { readFile } = pify(fs)

const readOpts = { encoding: "utf8" }

const baseConfig = {
  baseUrl: { hostname: "test.host" },
  cwd: __dirname,
  destination: "output",
}

const noop = () => {}

describe("static > postbuild", () => {
  beforeEach(() => {
    mockFs({
      [__dirname + "/output"]: {},
    })
  })

  afterEach(() => {
    mockFs.restore()
  })

  it("post build nojekyll", async () => {
    const config = {
      ...baseConfig,
      nojekyll: true,
    }

    try {
      await postBuild(config, [], noop)
      const file = await readFile(join(
        config.cwd,
        config.destination,
        ".nojekyll"
      ), readOpts)
      expect(file).toBe("")
    }
    catch (err) {
      console.log(err)
    }
  })
  it("post build CNAME", async () => {
    const config = {
      ...baseConfig,
      CNAME: true,
    }

    await postBuild(config, [], noop)
    const file = await readFile(join(
      config.cwd,
      config.destination,
      "CNAME"
    ), readOpts)
    expect(file).toBe(config.baseUrl.hostname)
  })
})
