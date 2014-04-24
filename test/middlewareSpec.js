var middleware = require('./../index.js'),
    expect = require('chai').expect;

describe('middleware', function() {
    'use strict';

    it('should be define', function() {
        expect(middleware).to.not.be.undefined;
    });

    it('should has createServer function', function() {
        expect(middleware).to.have.property('createServer');
    });

    it('should create new instance of servier on createServer', function() {
        var instance1 = middleware.createServer(),
            instance2 = middleware.createServer();

        expect(instance1).to.not.be.undefined;
        expect(instance2).to.not.be.undefined;
        expect(instance1).to.not.be.equal(instance2);
    })
});