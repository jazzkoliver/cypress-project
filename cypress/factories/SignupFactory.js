var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {
    deliver: function() {
        
        var firstName = faker.name.firstName()

        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '41999999999',
            address: {
                postal_code: '80520160',
                street: 'Rua Júlio Zaninelli',
                number: '420',
                details: 'Casa 1',
                district: 'Bom Retiro',
                city_state: 'Curitiba/PR'
            },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }
        return data
    }
}