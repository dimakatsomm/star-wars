import express from 'express';
import Container from 'typedi';

import { SWAController } from '../controllers/swa.controller';
import { validateUserSession } from '../middleware/auth.middleware';

const router = express.Router();
const controller = Container.get(SWAController);

router.get('/characters', validateUserSession(), controller.getCharacters);

export default router;
