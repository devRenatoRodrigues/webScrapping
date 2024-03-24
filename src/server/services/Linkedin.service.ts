import { ChromeDriver } from "@drivers";
import { WebBrowser } from "@drivers";
import { LoginUseCase, StartUseCase } from '../useCase';
import dotenv from 'dotenv';
import { FindJobsUseCase } from "../useCase/FindJobsUseCase";
import SaveOnUseCase from "../useCase/SaveOnUseCase";
import { ILinkedInAuth } from "../interfaces/linkedin.interfaces";
import { CloseUseCase } from "../useCase";
dotenv.config();

export default class LinkedInService {
    private _startBrowser: StartUseCase;
    private _driver: WebBrowser | null;
    constructor() {
        this._startBrowser = new StartUseCase();
        this._driver = null;
    }

    async findJobs() {
        try {
            const auth: ILinkedInAuth = {
                user: process.env.LINKEDIN_USER || '',
                password: process.env.LINKEDIN_PASSWORD || ''
            }
            this._driver = await this._startBrowser.execute('chrome');
            const extractJobs = await new FindJobsUseCase(this._driver).execute({ query: 'Software Engineer', filterButton: 'Jobs', auth });
            new SaveOnUseCase().execute({ data: extractJobs })
        } catch (error: any) {
            throw new Error(`Error on Find Jobs: ${error.message}`);

        } finally {
            if (this._driver) {
                await new CloseUseCase(this._driver).execute()
            }
        }
    }

}

