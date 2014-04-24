var expect = require('chai').expect,
    middleware = require('./../index.js'),
    request = require('superagent');

describe('microframework functionality', function() {
    beforeEach(function() {
        var app = middleware.createServer();

        app.use(function (req, res, next) {
            res.write('a');
            next();
        });

        app.use('/hello', function (req, res, next) {
            res.write('b');
            next();
        });

        app.use(function (req, res, next) {
            res.write('c');
            next();
        });

        app.use('/hello', function (req, res) {
            res.end('hello');
        });

        app.use('/goodbye', function (req, res) {
            res.end('goodbye');
        });

        app.use(function (req, res) {
            res.end('end');
        });

        app.listen(3000, function () {
            console.log('Server started at 3000');
        });
    });

    xit('should work with case #1', function(done) {
        request
            .get('/hello')
            .end(function(res) {
                expect(res.body).to.be.equal('abchello');
                done();
            });
    });
});