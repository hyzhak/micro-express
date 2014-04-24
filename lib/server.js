var http = require('http'),
    EventEmitter = require('events').EventEmitter;

/**
 * @private
 *
 * create new instance of server
 */
module.exports.createNew = function() {
    return new Server();
};

var Server = function() {

};

Server.prototype = Object.create(EventEmitter);

/**
 * open connection on specific port
 *
 * @param port
 * @param cb
 * @returns {*}
 */
Server.prototype.listen = function(port, cb) {
    this.server = http.createServer(this._requestListener.bind(this));
    return this.server.listen.apply(this.server, arguments);
};

/**
 * @private
 *
 * @param req
 * @param res
 */
Server.prototype._requestListener = function(req, res) {
    res.writeHead(200);
    res.end('Hello, World!\n');
};

/**
 * clone connection
 */
Server.prototype.close = function() {
    if (!this.server) {
        return;
    }
    this.server.close();
};

Server.prototype.use = function() {

};
