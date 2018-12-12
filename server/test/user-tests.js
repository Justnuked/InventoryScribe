const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const server = require('../server');
const chould = chai.should();
const mongoose = require('mongoose');
const User = require('../src/models/usermodel');
const assert = require('assert');

chai.use(chaiHttp);
chai.use(chaiString);

describe('User api tests', function(done){

    before(function(done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect('mongodb://localhost/inventoryscribetestuser');
        mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
          console.warn('Warning', error);
        });
    });
    
    beforeEach((done) =>{
        const {users, characters, inventories, items} = mongoose.connection.collections;
    
        users.drop(() =>{
            characters.drop(() =>{
                inventories.drop(() =>{
                    items.drop(() =>{
                        done();
                    });
                });
            });
        });
    });

    it('should register a user', function(done){

        let user = {
            'username': 'test',
            'password': 'test'
        }

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('user created');

            User.findOne({username: user.username})
            .then((result) =>{
                assert(result.username === 'test');
                done();
            });
        });
    });

    it('Should not register a user with the same name', function(done){
        let user = {
            'username': 'test',
            'password': 'test12'
        }

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            chai.request(server)
            .post('/api/auth/register')
            .send(user)
            .end(function(error, result){
                result.should.have.status(422);
                result.should.be.json;
                result.body.should.have.property('Message');
                result.body.Message.should.equal('username is taken');
    
                User.findOne({password: user.password})
                .then((result) =>{
                    assert(!result);
    
                    done();
                });
            });

        });
    });


    it('Should not register a user without a password', function(done){
        let user = {
            'username': 'testwithoutpass'
        }

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            result.should.have.status(400);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('missing values');

            User.findOne({username: user.username})
            .then((result) =>{
                assert(!result);

                done();
            });
        });
    });

    it('should login a user give back a token', function(done) {
		let user = {
			'username': 'testuser',
			'password': '12345'
        };
        
        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('user created');

            User.findOne({username: user.username})
            .then((result) =>{
                assert(result.username === 'testuser');

                chai.request(server)
                .post('/api/auth/login')
                .send(user)
                .end(function(error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.have.property('token');
                    result.body.token.should.startWith('ey');
                    done();	
                });
            });
        });


	});

    it('should delete a user', function(done){
        let user = {
            'username': 'test',
            'password': 'test'
        }

        var token;

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('user created');

            User.findOne({username: user.username})
            .then((result) =>{
                assert(result.username === 'test');

                chai.request(server)
                .post('/api/auth/login')
                .send(user)
                .end(function(error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.have.property('token');
                    token = "Bearer " + result.body.token;

                    chai.request(server)
                    .del('/api/user')
                    .set('Authorization', token)
                    .send({password: 'test'})
                    .end(function(error, result){
                        result.should.have.status(200);
                        result.should.be.json;
                        result.body.should.have.property('Message');
                        result.body.Message.should.equal('user deleted');

                        User.findOne({username: user.username})
                        .then((resultUser) =>{
                            assert(!resultUser);
                            done();
                        });
                    });
                });
            });
        });
    });

    it('should not delete a user with invalid credentials', function(done){
        let user = {
            'username': 'test',
            'password': 'test'
        }

        var token;

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('user created');

            User.findOne({username: user.username})
            .then((result) =>{
                assert(result.username === 'test');

                chai.request(server)
                .post('/api/auth/login')
                .send(user)
                .end(function(error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.have.property('token');
                    token = "Bearer " + result.body.token;

                    chai.request(server)
                    .del('/api/user')
                    .set('Authorization', token)
                    .send({password: 'testndfiughdiufhg'})
                    .end(function(error, result){
                        result.should.have.status(400);
                        result.should.be.json;
                        result.body.should.have.property('Message');
                        result.body.Message.should.equal('Username or password did not match');

                        User.findOne({username: user.username})
                        .then((resultUser) =>{
                            assert(resultUser);
                            done();
                        });
                    });
                });
            });
        });
    });

});

