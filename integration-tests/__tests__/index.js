// This weird trick was used to make sure jest will run
// build result test before cli test since cli will clean up dist folder

require("../build-result.js")
require("../cli.js")
