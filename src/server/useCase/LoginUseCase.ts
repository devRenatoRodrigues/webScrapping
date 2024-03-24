import { By, Key, until } from 'selenium-webdriver';
import { WebBrowser } from '../drivers';
import { ILinkedInAuth } from "../interfaces"

export class LoginUseCase {

    constructor(
        private webBrowser: WebBrowser
    ) { }

    async execute(auth: ILinkedInAuth) {
        try {
            const isAlreadyLoggedIn = await this._goToLoginPage();
            if (isAlreadyLoggedIn) return true;
            await this._login(auth)
            const isAuthenticaded = await this._checkIfLogged()
            return isAuthenticaded;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    get driver() {
        return this.webBrowser.driver;
    }

    private async _goToLoginPage() {
        this._console('Logging in...');
        const loginUrl = 'https://www.linkedin.com/login?_l=en';
        await this.driver.get(loginUrl);
        let getCurrentUrl = await this.driver.getCurrentUrl()
        this._console(`getCurrentUrl: ${getCurrentUrl}`);
        if (getCurrentUrl.includes('feed')) {
            this._console('Already logged in...');
            return true;
        } else {
            return false;
        }
    }

    private async _login(auth: ILinkedInAuth) {
        // User input
        const userInput = await this.driver.wait(until.elementLocated(By.id('username')), 10000);
        if (!userInput) {
            throw new Error('No user input found');
        }
        await userInput.sendKeys(auth.user);
        this._console('User set...');

        // Password input
        const passwordInput = await this.driver.findElement(By.id('password'));
        await passwordInput.sendKeys(auth.password, Key.RETURN);
        if (!passwordInput) {
            throw new Error('No password input found');
        }
        this._console('Password set...');

        // Wait for login
        await this.driver.sleep(5000);
    }

    private async _checkIfLogged() {
        const getCurrentUrl = await this.driver.getCurrentUrl();
        if (getCurrentUrl.includes('feed')) {
            return true;
        } else if (getCurrentUrl.includes('https://www.linkedin.com/login')) {
            throw new Error('Error on login: username or password incorrect');
        } else if (getCurrentUrl.includes('https://www.linkedin.com/checkpoint/challenge/verify')) {
            const pageSource = await this.driver.wait(until.elementLocated(By.css('body')), this.webBrowser.timeoutMS).getAttribute('innerHTML');
            console.log('pageSource: ', pageSource);
            await this.driver.sleep(2000);
            throw new Error('Error on login: captcha required');
        } else {
            throw new Error('Error on login: unknown error');
        }
    }

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }

}