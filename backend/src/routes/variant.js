import { Router } from 'express'
const VariantCtl = require('../controllers/variant')

var router = Router()
router.get('/', VariantCtl.list)

module.exports = router
