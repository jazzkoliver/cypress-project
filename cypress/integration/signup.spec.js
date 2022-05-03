import signup from '../pages/SignupPage'
import SignupFactory from '../factories/SignupFactory'
// import { it } from 'faker/lib/locales'
import SignupPage from '../pages/SignupPage'

describe('Signup', ()=>{ //test suite

    beforeEach(function() {
        cy.fixture('deliver').then((d)=> {
            this.deliver = d
        })
    })

    it('User should be deliveryman', function() {  //test case
        
        var deliver = SignupFactory.deliver()
        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()        
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)        
    })

    it('Invalid CPF', function() {  //test case
        
        var deliver = SignupFactory.deliver()
        deliver.cpf = '000000abc00'
        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! CPF inválido')        
    })

    it('Invalid e-mail', function(){  //test case
        
        var deliver = SignupFactory.deliver()
        deliver.email = 'jazzkoliver2gmail.com'
        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        signup.alertMessageShouldBe('Oops! Email com formato inválido.')        
    })

    context('Required fields', function() {
        const messages = [
            {field: 'name', output: 'É necessário informar o nome'},
            {field: 'cpf', output: 'É necessário informar o CPF'},
            {field: 'email', output: 'É necessário informar o email'},
            {field: 'postal_code', output: 'É necessário informar o CEP'},
            {field: 'number', output: 'É necessário informar o número do endereço'},
            {field: 'delivery_method', output: 'Selecione o método de entrega'},
            {field: 'cnh', output: 'Adicione uma foto da sua CNH'}
        ]

        before(function() {
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg) {
            it(`${msg.field} is required`, function() {
                SignupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})