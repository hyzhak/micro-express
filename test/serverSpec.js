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
        expect(app).to.have.property('use')
    });

    it('should has "listen" function', function() {
        expect(app).to.have.property('listen')
    });

    it('should start listen port 3000 on listen(3000)', function(done) {
        app.listen(3000, function() {
            console.log('listen!');
            request
                .get('http://localhost:3000/')
                .end(function(err, res) {
                    done(err);
                });
        });
    });
});