import { ChromeDriver } from "@drivers";
import { WebBrowser } from "@drivers";
import { LoginUseCase, StartUseCase } from '../useCase';
import dotenv from 'dotenv';
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
        return isAuthenticaded;
    }

}

