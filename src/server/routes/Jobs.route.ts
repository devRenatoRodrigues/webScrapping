import { Request, Router, Response } from 'express';
import { JobsController } from '../controllers/Jobs.controller';

const jobsController = new JobsController();


const router = Router();

router.get(
    '/',
    (req: Request, res: Response) => jobsController.getAllJobs(req, res)
);

export default router;