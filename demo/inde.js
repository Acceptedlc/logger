const loggerUtil = require("../src/logger");

let logger = loggerUtil.getLogger("test", "/tmp", "info", true);

logger.debug({"fuck":"you"});
logger.info({"fuck":"you"});
logger.info({"fuck":"you"});
logger.info({"fuck":"you"});
