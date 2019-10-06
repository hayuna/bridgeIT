import chai, {expect} from 'chai';
import chaiHttp  from 'chai-http'
import { Role } from "../../src/models";
import server from "../../index";
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;
const opts = { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true };

before((done) => {
    mongoServer = new MongoMemoryServer();
    mongoServer
        .getConnectionString()
        .then((mongoUri) => {
            return mongoose.connect(mongoUri, opts, err => {
                if(err) done(err);
            });
        })
        .then(() => done());
});

after(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
})

let should = chai.should();
chai.use(chaiHttp);

describe('Roles', () => {
    it('GET /role', async () => {
        const roles = await Role.countDocuments();
        expect(roles).to.equal(0);
    });
    
    it('POST /role', async () => {
        const role = {
            name: "sam9ple text_88",
            color: "#fff"
        };
        const result = await chai.request(server).post('/role').send(role)
        const expectedResponse = JSON.parse(result.res.text);
        console.log(typeof expectedResponse.isActive)
        console.log(expectedResponse.isActive)

        expect(expectedResponse.isActive).should.equal(false);
        expect(expectedResponse.name).should.equal(role.name);
        expect(expectedResponse.color).should.equal(role.color);
    });

    it('PATCH /role', (done) => {
        const role = new Role({
            name: "sample text",
            color: "#333"
        });

        role.save()
            .then( savedRole => {
                const rolePatch = {
                    name: "sample text 2",
                    color: "#666"
                };
                chai.request(server)
                    .patch(`/role/${savedRole._id}`)
                    .send(rolePatch)
                    .end(async (err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body["success"].should.equal(true);
                        const retrievedUpdatedRole = await Role.findById(savedRole._id);
                        expect(rolePatch["name"]).to.equal(retrievedUpdatedRole["name"]);
                        expect(rolePatch["color"]).to.equal(retrievedUpdatedRole["color"]);
                        done();
                    });
            })
    });
});