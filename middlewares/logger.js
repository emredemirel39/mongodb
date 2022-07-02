module.exports = (req, res, next) => {

    const date = new Date().toUTCString();

    console.log(`Date: ${date} -- Host: ${req.hostname} - Method: ${req.method}`)
    next();
};