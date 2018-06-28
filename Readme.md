
## Usage

```
const loggerUtil = require("../src/logger");

let logger = loggerUtil.getLogger("test", "/tmp", "info");

logger.debug({"hello":"world"});
logger.info({"hello":"world"});
logger.info({"hello":"world"});
logger.info({"hello":"world"});

```

### 日志级别

* trace
* debug
* info
* warn
* error
* fatal

### API

#### getLogger

* category 类别
* logDir 输出路径
* currentLevel 日志级别
* jsonFormat 是否完全使用json格式，可选，默认false