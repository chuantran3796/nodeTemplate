import express from 'express'
import controller from '../controllers/Video'


const router = express.Router()

router.get('/video', controller.getVideo)


export default router