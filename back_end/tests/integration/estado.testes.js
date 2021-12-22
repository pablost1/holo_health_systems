var chai = require('chai');
var server = require('../../src/app');
var chaiHttp = require('chai-http');
var should = chai.should();
var url = "localhost:3000"

chai.use(chaiHttp);

// Efetuando login para fazer a consulta da cidade
var valid_credentials = {
    cpf : "701.861.504-66",
    senha : "senhafacil"
}

chai.request(url)
    .post('/usuario/login')
    .send(valid_credentials)
    .end(function(err, res){
        res.body.should.have.property('mensagem')
        res.body.should.have.property('token')
        res.body.tipo.should.equal('Mestre')
        res.should.have.status(200)

        var token = res.body.token

describe('Rotas Estado', function(){

    it('Should create a new "estado"', function(done){

        done();
    });

    it('Should get all "estados"', async function(){

        chai.request(url)
            .get('/estado')
            .set({"Authorization" : `Bearer ${token}`})
            .end(function(err, res) {
                res.should.have.status(200);
            });   
        });
    }); 

    /* it('Should create a "estado"', function(){
        data = {
            nome : "ESTADO-TESTE"
        }

        chai.request(url)
            .post('/estado')
            .set({"Authorization" : `Bearer ${token}`})
            .send(data)
            .end(function(err, res){
                console.log(res.body)
            });

    }); */

    it('Should alter a "estado"', function(done){
        done();
    });

    it('Should remove a "estado"', function(done){
        done()
    });
})