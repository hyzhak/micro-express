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

Server.prototype.use = function() {

};

Server.prototype.requestListener = function(req, res) {
    res.writeHead(200);
    res.end('Hello, World!\n');
};

Server.prototype.listen = function(port, cb) {
    var server = http.createServer(this.requestListener.bind(this));
    return server.listen.apply(server, arguments);
};