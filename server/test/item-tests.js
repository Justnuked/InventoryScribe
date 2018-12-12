const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const server = require('../server');
const chould = chai.should();
const mongoose = require('mongoose');
const User = require('../src/models/usermodel');
const Item = require('../src/models/itemmodel');
const Character = require('../src/models/charactermodel');
const Inventory = require('../src/models/inventorymodel');
const assert = require('assert');

chai.use(chaiHttp);
chai.use(chaiString);

var token;
var charId;
var invId;

describe('Item api tests',function(done){
    before(function(done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect('mongodb://localhost/inventoryscribetestitem');
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
                            "username": "test",
                            "password": "test"
                        };

                        let character = {
                            "name": "test",
                            "class": "test",
                            "race":"test"
                        };
                        
                        chai.request(server)
                        .post('/api/auth/register')
                        .send(user)
                        .end(function(error, result){

                            chai.request(server)
                            .post('/api/auth/login')
                            .send(user)
                            .end(function(error, result){
                                token = "Bearer " + result.body.token;

                                chai.request(server)
                                .post('/api/character')
                                .set('Authorization', token)
                                .send(character)
                                .end(function(error, result){
                                    Character.findOne({name: 'test'})
                                    .then((result) =>{
                                        charid = result._id;

                                        let inventory = {
                                            "type": "test",
                                            "charid": charId
                                        };

                                        chai.request(server)
                                        .post('/api/inventory')
                                        .set('Authorization', token)
                                        .send(inventory)
                                        .end(function(error, result){
                                            Inventory.findOne({type: 'test'})
                                            .then((result) =>{
                                                invId = result. _id;
                                                done();
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });

    xit('Should create an item', function(done){
        let item = {
            "name": "test",
            "description": "test",
            "amount" : 10,
            "charid": charId,
            "inventoryid": invId
        };

        chai.request(server)
        .post('/api/item')
        .set('Authorization', token)
        .send(item)
        .end(function(error, result){
            result.should.have.status(200);
            result.should.be.json();
            result.body.should.have.property('Message');
            result.body.Message.should.equal('item created');

            done();
        });
    });

    xit('Should update an item', function(done){
        let item = {
            "name": "test",
            "description": "test",
            "amount" : 5,
            "charid": charId,
            "inventoryid": invId
        };

        let newItem = {
            "name": "testNew",
            "description": "testNew",
            "amount" : 10,
            "charid": charId,
            "inventoryid": invId
        }

        chai.request(server)
        .post('/api/item')
        .set('Authorization', token)
        .send(item)
        .end(function(error, result){

            Item.findOne({name: 'test'})
            .then((result) =>{
                chai.request(server)
                .put('/api/item/' + result._id)
                .set('Authorization', token)
                .send(newItem)
                .end(function(error, result){
                    result.should.have.status(200);
                    result.should.be.json();
                    result.body.should.have.property('Message');
                    result.body.Message.should.equal('item updated');
                    done();
                });
            });
        });
    });
})