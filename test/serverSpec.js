var expect = require('chai').expect,
    middleware = require('./../index.js'),
    request = require('superagent');

describe('server', function() {
    var app;

    beforeEach(function() {
        app = middleware.createServer();
    });

    afterEach(function() {
        app.close();
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

    it('should raise exception on wrong number of arguments for use handler', function() {
        expect(function() {
            app.use(function() {

            });
        }).to.throw();

        expect(function() {
            app.use(function(res) {

            });
        }).to.throw();


        expect(function() {
            app.use(function(res, req, next, somethingmore) {

            });
        }).to.throw();
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

    it('should return on GET "hello world!"', function(done) {
        var message = 'hello world!';
        app.use(function(req, res) {
            res.write(message);
        });

        app.listen(3000, function() {
            request
                .get('http://localhost:3000/')
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.text).to.be.equal(message);
                    done()
                });
        });
    });

    it('should return on GET /some/?complext=path "hello world!"', function(done) {
        var message = 'hello world!';
        app.use(function(req, res) {
            res.write(message);
        });

        app.listen(3000, function() {
            request
                .get('http://localhost:3000/some/?complext=path')
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.text).to.be.equal(message);
                    done()
                });
        });
    });

    it('should return on GET /hello2 "hello world 2!"', function(done) {
        var wrongMessage = 'hello world 1!',
            rightMessage = 'hello world 2!';

        app.use('/wrong-url', function(req, res) {
            res.write(wrongMessage);
        });

        app.use('/right-url', function(req, res) {
            res.write(rightMessage);
        });

        app.listen(3000, function() {
            request
                .get('http://localhost:3000/right-url')
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.text).to.be.equal(rightMessage);
                    done()
                });
        });
    });

    it('should wait until "next" function of use will be invoke', function(done) {
        var wrongMessage = 'Wrong!',
            firstPartOfRightMessage = 'hello world 2!',
            secondPartOfRightMessage = 'hello world 1!',
            message1 = firstPartOfRightMessage,
            message2 = wrongMessage;

        app.use('/', function(req, res, next) {
            res.write(message1);
            setTimeout(function() {
                message2 = secondPartOfRightMessage;
                next();
            }, 100);
        });

        app.use('/', function(req, res) {
            res.write(message2);
        });

        app.listen(3000, function() {
            request
                .get('http://localhost:3000/')
                .end(function(err, res) {
                    if (err) {
                        done(err);
                    }

                    expect(res.text).to.be.equal(firstPartOfRightMessage + secondPartOfRightMessage);
                    done()
                });
        });

    })
});