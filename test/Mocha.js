let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let server = require('../skripta');
let fs = require('fs');
const vratiPodatke = require('./pomocneFunkcije');


chai.use(chaiHttp);

var content = fs.readFileSync('./test/testniPodaci.txt', 'utf8', (err, data) => {});
var testovi = vratiPodatke(content);

describe("Testovi", function() {

    for (var i = 0; i < testovi.length; i++) {
        let test = testovi[i];
        if (test.operacija == "POST") {
            it(test.operacija + test.ruta, (done) => {
                chai.request(server)
                    .post(test.ruta)
                    .send(JSON.parse(test.ulaz))
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.eql(JSON.parse(test.izlaz));
                        done();
                    });
            });
        } else if (test.operacija == "GET") {
            it(test.operacija + test.ruta, (done) => {
                chai.request(server)
                    .get(test.ruta)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.should.be.json;
                        res.body.should.be.eql(JSON.parse(test.izlaz));
                        done();
                    });
            });
        } else if (test.operacija == "DELETE") {
            it(test.operacija + test.ruta, (done) => {
                chai.request(server)
                    .delete(test.ruta)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.should.be.eql(JSON.parse(test.izlaz));
                        done();
                    });
            });
        }

    }
});