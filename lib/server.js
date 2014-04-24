var EventEmitter = require('events').EventEmitter,
    http = require('http'),
    q = require('q');

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
    var promise = q.when();
    this.handlers
        .filter(function(item) {
            return !item.route || item.route === req.url;
        })
        .forEach(function(item) {
            switch(item.handler.length) {
                case 2:
                    promise = promise.then(function() {
                        item.handler(req, res);
                    });
                    break;
                case 3:
                    promise = promise.then(function() {
                        return q.ninvoke(item, 'handler', req, res);
                    });
                    break;
            }
        });

    promise.then(function() {
        res.end();
    });
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
        route = null;
    }

    if (fn === undefined || fn.length !== 2 && fn.length !== 3) {
        throw new Error('middleware should has 2 or 3 arguments');
    }

    this.handlers.push({
        route: route,
        handler: fn
    });
};
