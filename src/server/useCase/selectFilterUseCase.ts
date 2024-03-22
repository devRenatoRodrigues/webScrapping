import { By } from "selenium-webdriver";
import { WebBrowser } from "../drivers";
import { LinkedInFilterButton } from "../interfaces";

export class SelectFilterUseCase {

    constructor(
        private webBrowser: WebBrowser
    ) { }

    async execute(filterButton: LinkedInFilterButton) {
        this._console(`Clicking "${filterButton}"`);
        const findButtons = await this.driver.findElements(By.className('search-reusables__filter-pill-button'));

        findButtons.forEach(async (button) => {
            const buttonName = await button.getText();
            if (buttonName === filterButton) {
                button.click();
            }
        })

        this._console(`Clicked "${filterButton}"`);
        await this.driver.sleep(5000);
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