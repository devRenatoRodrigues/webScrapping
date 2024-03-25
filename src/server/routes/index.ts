import { Router } from 'express';
import JobsRoute from './Jobs.route';

const router = Router();

router.use('/jobs', JobsRoute);



export default router;