var expect = require('chai').expect,
    middleware = require('./../index.js'),
    request = require('superagent');

describe('server', function() {
    var app;

    beforeEach(function() {
        app = middleware.createServer();
    });

    afterEach(function() {
        app = null;
    });

    it('should has "use" function', function() {
        expect(app).to.have.property('use');
    });

    it('should has "listen" function', function() {
        expect(app).to.have.property('listen');
    });

    it('should has "listen" function', function() {
        expect(app).to.have.property('close');
    });

    it('should start listen port 3000 on listen(3000)', function(done) {
        app.listen(3000, function() {
            request
                .get('http://localhost:3000/')
                .end(function(err, res) {
                    done(err);
                });
        });
    });

    xit('should return on GET "hello world!"', function(done) {
        var message = 'hello world!';
        app.use(function(req, res, next) {
            res.write(message);
            next();
        });

        app.listen(3000, function() {
            request
                .get('http://localhost:3000/')
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.body).to.be.equal(message);
                    done()
                });
        });
    });
});