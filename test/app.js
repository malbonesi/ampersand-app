var request = require('supertest');
var app = require('../server');
var expect = require('chai').expect;

request = request(app);

var user = {
    username: 'DarthVader',
    password: 'iamyourfather1',
    email: 'darth@starwars.com'
};


describe('GET /', function() {
    it('should return 200 OK', function(done) {
        request.get('/').expect(200, done);
    });
});

describe('Account Register', function() {
    it('should return 201', function(done) {
        request.post('/api/user').send(user).expect(201, done);
    });
    
    it('should return 401 from duplicate user', function(done) {
        request.post('/api/user').send(user).expect(401, done);
    });
});