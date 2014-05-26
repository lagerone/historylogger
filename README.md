# HistoryLogger

HistoryLogger i a logger that keeps log history. 
Hover the latest log message to show the log history.
Click any log iten to collapse/expand the log.

HistoryLogger requires no dependencies.

## Usage

Include `build/historylogger.css` and `build/HistoryLogger.min.js` in your page.

```javascript
var logger = new HistoryLogger();
logger.log('Some message');
logger.empy(); // Clear the log
```

## Demo

View demo at [lagerone.github.io/historylogger/](http://lagerone.github.io/historylogger/).