var chai = require('chai');
var server = require('../../src/app');
var chaiHttp = require('chai-http');
var should = chai.should();
var url = "localhost:3000"

chai.use(chaiHttp);

describe("User login", function(){
    it('Should authenticate as master', function() {
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
                res.should.have.status(200);

                //console.log(res.body)
            });
    });

    it('Should authenticate as manager', function() {
        var valid_credentials = {
            cpf : "70186150444",
            senha : "senhafacil"
        }
        
        chai.request(url)
            .post('/usuario/login')
            .send(valid_credentials)
            .end(function(err, res){
                res.body.should.have.property('mensagem')
                res.body.should.have.property('token')
                res.body.tipo.should.equal('Gerente')
                res.should.have.status(200)

                //console.log(res.body)
            });
    });

    it('Should authenticate as medic', function() {
        var valid_credentials = {
            cpf : "701.861.504-11",
            senha : "senhafacil"
        }

        chai.request(url)
            .post('/usuario/login')
            .send(valid_credentials)
            .end(function(err, res){
                res.body.should.have.property('mensagem')
                res.body.should.have.property('token')
                res.body.tipo.should.equal('Medico')
                res.should.have.status(200)

                //console.log(res.body)
            })
    });

    it('Should authenticate as user', function(){
        var valid_credentials = {
            cpf : "70186150472",
            senha : "senhafacil"
        }

        chai.request(url)
            .post('/usuario/login')
            .send(valid_credentials)
            .end(function(err, res){
                res.body.should.have.property('mensagem')
                res.body.should.have.property('token')
                res.body.tipo.should.equal('Paciente')
                res.should.have.status(200)

                //console.log(res.body)
            })
    })

    /* Testar falhas */
    it('Should fail if password not given.', function(){
        var incomplete_credentials = {
            cpf : "70186150472"
        }

        chai.request(url)
            .post('/usuario/login')
            .send(incomplete_credentials)
            .end(function(err, res){
                res.should.have.status(406)
                res.body.mensagem.should.equal('É necessário inserir uma senha.')
            });
    })
/*     it('Should fail if CPF and e-mail not given.', function(done){
        var incomplete_credentials = {
            senha : "senhafacil"
        }

        chai.request(url)
            .post('/usuario/login')
            .send(incomplete_credentials)
            .end(function(err, res){
                console.log(res)
                console.log("Should have something above")
                res.should.have.status(406)
                res.body.mensagem.should.equal("É necessário inserir um dado de login(CPF ou E-mail).")
            })
    }) */
});

// describe("User registration", function(){
//     it("Should register a pacient [TODO]", function(done){
//         done()
//     })

//     it("Should register a medic [TODO]", function(done){
//         done()
//     })

//     it("Should register a manager [TODO]", function(done){
//         done()
//     })
// });