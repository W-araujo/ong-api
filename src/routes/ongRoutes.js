const { Router } = require('express')
const OngController = require('../controllers/OngController')
const multer = require('multer')
const uploadConfig = require('../config/upload')
const { authorization } = require('../middlewares/authorization')

const routes = Router()
const upload = multer(uploadConfig);

const ongController = new OngController()


routes.post('/ong', ongController.create)
routes.post('/ong/session', ongController.login)

routes.use(authorization)
routes.get('/ong', ongController.listAll)
routes.get('/ong/:id', ongController.get)
routes.get('/ong/highlights/for', ongController.findHighlights)
routes.get('/ong/highlights/update/:id', ongController.updateHighlights)
routes.get('/ong/search/for', ongController.searchOngsByName)
routes.put('/ong/:id', ongController.update)
routes.patch('/ong/avatar/:id', upload.single('avatar'), ongController.upload)
routes.delete('/ong/:id', ongController.delete)

module.exports = routes