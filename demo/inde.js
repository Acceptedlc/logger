const loggerUtil = require("../src/logger");

let logger = loggerUtil.getLogger("test", "/tmp", "info");

logger.debug({"fuck":"you"});
logger.info({"fuck":"you"});
logger.info({"fuck":"you"});
logger.info({"fuck":"you"});
