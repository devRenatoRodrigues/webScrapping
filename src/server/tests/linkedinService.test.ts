import 'dotenv/config';
import { ILinkedInAuth } from '@interfaces';
import LinkedInService from '../services/Linkedin.service';
import dotenv from 'dotenv';
dotenv.config();

describe('LinkedIn Test', () => {
    jest.setTimeout(300000)

    // const auth: ILinkedInAuth = {
    //     user: process.env.LINKEDIN_USERNAME!,
    //     password: process.env.LINKEDIN_PASSWORD!
    // }
    const linkedInService = new LinkedInService();

    // beforeAll(async () => {
    //     await linkedInService.execute();
    // });

    it('should login', async () => {
        const isAuthenticaded = await linkedInService.findJobs();
        console.log('isAuthenticaded', isAuthenticaded);
        expect(isAuthenticaded).toBe(true);
    })

    // afterAll(async () => {
    //     await linkedInService.stop();
    // });

});