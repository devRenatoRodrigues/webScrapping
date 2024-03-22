import { By, Key, until } from "selenium-webdriver";
import { WebBrowser } from "../drivers";

export class SearchUseCase {

    constructor(private webBrowser: WebBrowser) { }

    async execute(query: string) {
        this._console('Searching...');
        const searchInput = await this.driver.findElement(By.xpath("//input[@placeholder='Search']"));
        searchInput.clear()
        await searchInput.sendKeys(query, Key.RETURN);
        await this.driver.wait(until.urlContains('linkedin.com/search/results'), this.webBrowser.timeoutMS);
        const currentUrl = await this.driver.getCurrentUrl();
        if (!currentUrl.includes('results')) throw new Error('Error on search');
    }

    private _console(message: any) {
        if (process.env.DEBUG === 'true') {
            console.log(message);
        }
    }

    get driver() {
        return this.webBrowser.driver;
    }
}