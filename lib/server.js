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
    this.handlers = [];
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
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    this.handlers.forEach(function(item) {
        switch(item.handler.length) {
            case 2:
                item.handler(req, res);
                break;
            case 3:
                //TODO:
                throw new Error('TODO');
                item.handler(req, res, next);
                break;
        }
    });

    res.end();
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

/**
 * add middleware to the server
 *
 * @param route
 * @param fn
 */
Server.prototype.use = function(route, fn) {
    if (fn === undefined) {
        fn = route;
        route = '/';
    }

    this.handlers.push({
        route: route,
        handler: fn
    });
};
