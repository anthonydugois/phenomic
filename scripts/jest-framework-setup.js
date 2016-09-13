// Increase test timeout on CI
if (process.env.CI) {
  // eslint-disable-next-line
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000 // 20s
}
