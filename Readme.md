
## Usage

```
const loggerUtil = require("../src/logger");

let logger = loggerUtil.getLogger("test", "/tmp", "info");

logger.debug({"hello":"world"});
logger.info({"hello":"world"});
logger.info({"hello":"world"});
logger.info({"hello":"world"});

```