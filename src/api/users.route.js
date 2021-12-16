import { Router } from 'express'
import usersController from './users.controller.js'

const router = new Router()

router.route('/create').post()

router.route('/delete').delete()

export default router