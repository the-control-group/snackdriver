const stdout = ({ logLevel }) => {
    return {
        level: logLevel,
        stream: process.stdout,
    }
};

module.exports = { stdout }