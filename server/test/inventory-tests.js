const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiString = require('chai-string');
const server = require('../server');
const chould = chai.should();
const mongoose = require('mongoose');
const User = require('../src/models/usermodel');
const Character = require('../src/models/charactermodel');
const Inventory = require('../src/models/inventorymodel');
const assert = require('assert');

chai.use(chaiHttp);
chai.use(chaiString);

var token;
var charId;

describe('Inventory api tests', function(done){

    before(function(done) {
        mongoose.Promise = global.Promise;
        mongoose.set('useFindAndModify', false);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect('mongodb://localhost/inventoryscribetestinv');
        mongoose.connection
        .once('open', () => { done(); })
        .on('error', (error) => {
          console.warn('Warning', error);
        });
    });

    afterEach((done) =>{

        console.log("afterEach inventory");
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

            
    beforeEach((done) =>{
        console.log("before each inventory");
        let user = {
            'username': 'testuser',
            'password': '12345'
        };

        let charactertest = {
            'name': 'test',
            'class': 'test',
            'race': 'test'
        };
        
        chai.request(server)
        .post('/api/auth/register')
        .send(user)
        .end(function(error, result){
            console.log('register done')
            User.findOne({username: user.username})
            .then((result) =>{
                chai.request(server)
                .post('/api/auth/login')
                .send(user)
                .end(function(error, result) {
                    console.log(result.body.token);
                    token = "Bearer " + result.body.token;
                    console.log('login done');

                    chai.request(server)
                    .post('/api/character')
                    .set('Authorization', token)
                    .send(charactertest)
                    .end(function(error, result){
                        console.log(result.body);
                        console.log('creating character done')
                        done()
                    });
                });
            });
        }); 
    });

    it('should create a inventory', function(done){
        Character.findOne({name: 'test'})
        .then(result =>{
            console.log(result + " should create a inventory result");
            charId = result._id;
            console.log(charId);

            let inventory = {
                "type": "test",
                "charid" : charId
            };
            
            chai.request(server)
            .post('/api/inventory')
            .set('Authorization',  token)
            .send(inventory)
            .end(function(error, result){
                result.should.have.status(200);
                result.should.be.json;
                result.body.should.have.property('Message');
                result.body.Message.should.equal('Inventory added');

                done();
            });
        });
    });

    xit('should delete a inventory', function(done){
        Character.findOne({name: 'test'})
        .then(result =>{
            console.log(result + " should delete a inventory result");
            charId = result._id;

            let inventory = {
                "type": "test",
                "charid" : charId
            };
            
            chai.request(server)
            .post('/api/inventory')
            .set('Authorization',  token)
            .send(inventory)
            .end(function(error, result){
                result.should.have.status(200);
                result.should.be.json;
                result.body.should.have.property('Message');
                result.body.Message.should.equal('Inventory added');

                Inventory.findOne({type: 'test'})
                .then((invResult =>{
                    console.log(invResult + "invResult")
                    assert(invResult.type === 'test');
                    done();
                }))
            });
        });
    });
})