import express from 'express';
import Container from 'typedi';

import { SWAController } from '../controllers/swa.controller';

const router = express.Router();
const controller = Container.get(SWAController);

router.post('/characters', controller.getCharacters);

export default router;
