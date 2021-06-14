const request = require('supertest')

const app = require('../src/app')

let ongs
let login

describe('CreateOng', () => {
    beforeEach(() => {
        ongs = [{
            id: "g2ce4734-a5ae-4355-8011-8412e33f2972",
            name: "ong da paz",
            description: "Somos unido por uma força maior",
            type_id: 1,
            highlights: true,
            phone: 53986546789,
            email: "ongdapaz@gmail.com",
            password: "123",
            role: "client"
        },
        {
            id: "c2ce4734-a5ae-4355-8011-841ce33f2972",
            name: "ong dos animais",
            description: "Nossa fauna é o que tem de mais belo",
            type_id: 2,
            highlights: false,
            phone: 53989546710,
            email: "ongdafauna@gmail.com",
            password: "123",
            role: "client"
        },
        {
            name: "Ong moradores de rua",
            phone: 5384565434,
        }
        ]

        login = [{
            email: "ongdafauna@gmail.com",
            password: "123"
        }]
    })

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ong')
            .send(ongs[0])

        expect(response.status).toBe(201)

        await request(app).delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
    })


    it('should be able to delete a ONG', async () => {
        await request(app)
            .post('/ong')
            .send(ongs[0])
        const response = await request(app)
            .delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')

        expect(response.status).toBe(200)
    })

    it('should be able to list a unique ONG', async () => {
        const response = await request(app)
            .get('/ong/c2ce4734-a5ae-4355-8011-841ce33f2972')

        expect(response.status).toBe(200)

        await request(app)
            .delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
    })

    it('should not be able to list a unique ONG with wrong ID', async () => {
        const response = await request(app)
            .get('/ong/c2ce4734-a5ae-4355-8011-841ce')

        expect(response.text).toEqual('"Erro na busca da ong :("')

    })

    it('should be able to list all ongs', async () => {
        const response = await request(app)
            .get('/ong')

        expect(response.status).toBe(200)

    })


    it('should be able to login user', async () => {
        await request(app)
        .post('/ong')
        .send(ongs[1])

        const response = await request(app)
            .post('/ong/session')
            .send({   
            email: "ongdafauna@gmail.com",
            password: "123"})

        expect(response.status).toBe(200)
    })

    it('should not be able to login with', async () => {
        await request(app)
        .post('/ong')
        .send(ongs[1])

        const response = await request(app)
            .post('/ong/session')
            .send({   
            email: "ongdafauna@gmail.com",
            password: "123"})

        expect(response.status).toBe(200)
    })

    it('should not be able to login whith wrong password', async () => {
        const response = await request(app)
            .post('/ong/session')
            .send({   
            email: "ongdafauna@gmail.com",
            password: "321"})

        expect(response.text).toEqual('"Falha na autenticação :("')
    })


    it('should be able to update a ONG', async () => {
        await request(app)
            .post('/ong')
            .send(ongs[0])
        const response = await request(app)
            .put('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
            .send(ongs[2])

        expect(response.status).toBe(200)

        await request(app).delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
    })

    it('should be able to list ONG highlights', async () => {
        const response = await request(app)
            .get('/ong/highlights/for')

        expect(response.status).toBe(200)
    })

 

    it('should be able to find by ONG email', async () => {
        await request(app)
        .post('/ong')
        .send(ongs[0])

        const response = await request(app)
            .post('/ong/find/email/')
            .send({
                email: "ongdapaz@gmail.com"
            })

        expect(response.status).toBe(200)

        await request(app)
            .delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
    })

    it('should be able to update ONG highlights', async () => {
        const response = await request(app)
            .get('/ong/highlights/update/g2ce4734-a5ae-4355-8011-8412e33f2972')

        expect(response.status).toBe(200)
    })
})
