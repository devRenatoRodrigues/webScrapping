import { Request, Response } from 'express';
import JobsService from '../services/Jobs.service';
import LinkedInService from '../services/Linkedin.service';

export class JobsController {
    private jobsService: JobsService;
    private linkedinService: LinkedInService;

    constructor() {
        this.jobsService = new JobsService();
        this.linkedinService = new LinkedInService();
    }

    public async getAllJobs(req: Request, res: Response): Promise<void> {
        try {
            const getJobs = await this.linkedinService.findJobs();
            const jobs = await this.jobsService.createManyJobs(getJobs);
            res.status(200).json(getJobs);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}