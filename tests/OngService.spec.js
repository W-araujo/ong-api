const request = require('supertest')

const app = require('../src/app')

let ongs

describe('CreateOng', () => {
    beforeEach(() => {
        ongs = [{
            id: "g2ce4734-a5ae-4355-8011-8412e33f2972",
            name: "ong da paz",
            description: "Somos unido por uma força maior",
            type_id: 1,
            phone: 53986546789,
            email: "ongdapaz@gmail.com"
        },
        {
            id: "c2ce4734-a5ae-4355-8011-841ce33f2972",
            name: "ong dos animais",
            description: "Nossa fauna é o que tem de mais belo",
            type_id: 2,
            phone: 53989546710,
            email: "ongdafauna@gmail.com"
        }]
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ong')
            .send(ongs[0])

        expect(response.status).toBe(201)
    })
})
