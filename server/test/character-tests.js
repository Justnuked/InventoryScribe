const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const server = require('../server');
const chould = chai.should();
const mongoose = require('mongoose');
const User = require('../src/models/usermodel');
const Character = require('../src/models/charactermodel');
const assert = require('assert');

chai.use(chaiHttp);
chai.use(chaiString);

var token;

describe('character api tests', function(done){

    before(function(done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect('mongodb://localhost/inventoryscribetestchar');
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
                        let user = {
                            'username': 'testuser',
                            'password': '12345'
                        };
                        
                        chai.request(server)
                        .post('/api/auth/register')
                        .send(user)
                        .end(function(error, result){
                            User.findOne({username: user.username})
                            .then((result) =>{
                                chai.request(server)
                                .post('/api/auth/login')
                                .send(user)
                                .end(function(error, result) {
                                    token = "Bearer " + result.body.token;
                                    done();	
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should create a character', function(done){
        let character = {
            name: "test",
            class: "test",
            race: "test"
        };

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('Character created');

            Character.findOne({name: 'test'})
            .then((result) =>{
                assert(result.name === 'test');
                done();
            });
        });
    });

    it('should not create a character without a name', function(done){
        let character = {
            class: "test",
            race: "test"
        };

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            result.should.have.status(400);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('missing values');

            Character.findOne({name: 'test'})
            .then((resultCharacter) =>{
                assert(!resultCharacter);
                done();
            });
        });
    });

    it('should not create a character without a class', function(done){
        let character = {
            name: "test",
            race: "test"
        };

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            result.should.have.status(400);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('missing values');

            Character.findOne({name: 'test'})
            .then((resultCharacter) =>{
                assert(!resultCharacter);
                done();
            });
        });
    });

    it('should not create a character without a race', function(done){
        let character = {
            name: "test",
            class: "test"
        };

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            result.should.have.status(400);
            result.should.be.json;
            result.body.should.have.property('Message');
            result.body.Message.should.equal('missing values');

            Character.findOne({name: 'test'})
            .then((resultCharacter) =>{
                assert(!resultCharacter);
                done();
            });
        });
    });

    it('should delete a character', function(done){
        let character = {
            name: "test",
            class: "test",
            race: "test"
        };

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            Character.findOne({name: 'test'})
            .then((resultCharacter) =>{

                var url = '/api/character/' + resultCharacter._id;
                chai.request(server)
                .del(url)
                .set('Authorization', token)
                .send(null)
                .end(function(error, resultDel){
                    resultDel.should.have.status(200);
                    resultDel.should.be.json;
                    resultDel.body.should.have.property('Message');
                    resultDel.body.Message.should.equal("Character deleted");

                    Character.findOne({_id: resultCharacter._id})
                    .then((findResult) =>{
                        assert(!findResult);
                        done();
                    })
                })
            });
        });
    });

    it('should not delete a character that is not of the logged in user', function(done){
        let character = {
            name: "test",
            class: "test",
            race: "test"
        };

        let user = {
            username:'baduser',
            password:'badpassword'
        }

        var newToken;

        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, newUserResult){
            User.findOne({username: user.username})
            .then((result) =>{
                chai.request(server)
                .post('/api/auth/login')
                .send(user)
                .end(function(error, result) {
                    newToken = "Bearer " + result.body.token;

                    chai.request(server)
                    .post('/api/character')
                    .set('Authorization', token)
                    .send(character)
                    .end(function(error, result){
                        Character.findOne({name:'test'})
                        .then(temp =>{
                            console.log(temp);
                        })

                        Character.findOne({name: 'test'})
                        .then((resultCharacter) =>{
                            
                            var url = '/api/character/' + resultCharacter._id;
                            chai.request(server)
                            .del(url)
                            .set('Authorization', newToken)
                            .send(null)
                            .end(function(error, resultDel){
                                resultDel.should.have.status(401);
                                resultDel.should.be.json;
                                resultDel.body.should.have.property('Message');
                                resultDel.body.Message.should.equal("This resource does not belong to user");
            
                                Character.findOne({_id: resultCharacter._id})
                                .then((findResult) =>{
                                    assert(findResult);
                                    done();
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    it('should get all characters of a user', function(done){
        let character = {
            name: "test",
            class: "test",
            race: "test"
        };

        let character2 = {
            name: "test2",
            class: "test2",
            race: "test2"
        }

        chai.request(server)
        .post('/api/character')
        .set('Authorization', token)
        .send(character)
        .end(function(error, result){
            Character.findOne({name: 'test'})
            .then((result) =>{

                chai.request(server)
                .post('/api/character')
                .set('Authorization', token)
                .send(character2)
                .end(function(error, result){
                    chai.request(server)
                    .get('/api/character')
                    .set('Authorization', token)
                    .send(null)
                    .end(function(error, result){
                        result.should.have.status(200);
                        result.should.be.json;
                        result.body[0].should.have.property('race');
                        result.body[0].race.should.equal('test');
                        result.body[1].race.should.equal('test2');
                        done();
                    });
                });
            });
        });
    });
});