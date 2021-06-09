const { Router } = require('express')
const OngHasDonationController = require('../controllers/OngHasDonationController')
const { authorization } = require('../middlewares/authorization')

const routes = Router()

const ongHasDonationController = new OngHasDonationController()

routes.use(authorization)
routes.post('/ong/donation', ongHasDonationController.create)
routes.get('/ong/donation/all', ongHasDonationController.list)
routes.get('/ong/donation/:ong_id', ongHasDonationController.getDonationByOngId)
routes.get('/ong/donation/sum/:ong_id', ongHasDonationController.infoOng)

module.exports = routes