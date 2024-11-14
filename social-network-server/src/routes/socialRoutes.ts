import express from 'express'
import { getUnconnectedPeople, getSocialInfluence } from '../controllers/socialController';

const router = express.Router();

router.post('/unconnectedPeople', getUnconnectedPeople);
router.post('/getSocialInfluence', getSocialInfluence);

export default router;