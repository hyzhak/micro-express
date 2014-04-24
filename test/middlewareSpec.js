var middleware = require('./../index.js'),
    expect = require('chai').expect;

describe('middleware', function() {
    'use strict';

    it('should be define', function() {
        expect(middleware).to.be.not.undefined;
    });

    it('should has createServer function', function() {
        expect(middleware).to.have.property('createServer');
    });
});