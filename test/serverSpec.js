var middleware = require('./../index.js'),
    expect = require('chai').expect;

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
});