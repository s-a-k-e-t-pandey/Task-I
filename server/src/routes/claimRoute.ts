import express from 'express';
import { claim } from '../controllers/claimsController';

const router = express.Router();

router.post('/', claim);

export default router;
