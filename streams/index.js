const { stdout } = require('./stdout');
const { debugStream } = require('./debugStream');
const { stackdriver } = require('./stackdriver');

module.exports = {
    stdout,
    debugStream,
    stackdriver,
};