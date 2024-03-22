import { ChromeDriver } from "@drivers";
import { WebBrowser } from "@drivers";
import { LoginUseCase, StartUseCase } from '../useCase';
import dotenv from 'dotenv';
import { SelectFilterUseCase } from "../useCase/selectFilterUseCase";
import { FindJobsUseCase } from "../useCase/FindJobsUseCase";
import SaveOnUseCase from "../useCase/SaveOnUseCase";
dotenv.config();

export default class LinkedInService {

    async execute() {

        const driver = await new StartUseCase().execute('chrome');
        const login = new LoginUseCase(driver);
        const auth = {
            user: process.env.LINKEDIN_USER!,
            password: process.env.LINKEDIN_PASSWORD!
        }
        const isAuthenticaded = await login.execute(auth);
        const extractJobs = await new FindJobsUseCase(driver).execute({ query: 'Software Engineer', filterButton: 'Jobs' });
        new SaveOnUseCase().execute({ data: extractJobs })
        return isAuthenticaded;
    }

}

