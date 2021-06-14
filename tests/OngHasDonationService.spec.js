const request = require('supertest')

const app = require('../src/app')

let donation
let ongs
let ongdonation

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
        ]
        donation = [{
            id: 1,
            value: 100
        },
        {
            id: 2,
            value: 50
        }]

        ongdonation = [{
            ong_id: "g2ce4734-a5ae-4355-8011-8412e33f2972",
            donation_id: 1
        },
        {
            ong_id: "g2ce4734-a5ae-4355-8011-8412e33f2972",
            name: 2
        },
        ]
    })

    it('should be able to create a new donation', async () => {
        await request(app)
        .post('/ong')
        .send(ongs[0])
        
        const response = await request(app)
            .post('/ong/donation')
            .send(ongdonation[0])

        expect(response.status).toBe(201)

        await request(app).delete('/ong/g2ce4734-a5ae-4355-8011-8412e33f2972')
    })

    it('should be able to list donations', async () => {
        const response = await request(app)
            .get('/ong/donation/all')

        expect(response.status).toBe(200)
    })

    it('should be able get one donations', async () => {
        const response = await request(app)
            .get('/ong/donation/g2ce4734-a5ae-4355-8011-8412e33f2972')

        expect(response.status).toBe(200)
    })

    it('should be able to information by ong', async () => {
        const response = await request(app)
            .get('/ong/donation/sum/g2ce4734-a5ae-4355-8011-8412e33f2972')

        expect(response.status).toBe(200)
    })


})
