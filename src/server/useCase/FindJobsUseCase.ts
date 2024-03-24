import { By, WebElement, until } from "selenium-webdriver";
import { WebBrowser } from "../drivers";
import { SearchUseCase } from "./SearchUseCase";
import { SelectFilterUseCase } from "./selectFilterUseCase";
import { ILinkedInFindJobsRequest, ILinkedInJobs, } from "../interfaces/linkedin.interfaces";
import { LoginUseCase } from "./LoginUseCase";

export class FindJobsUseCase {

    constructor(private webBrowser: WebBrowser) { }

    async execute(settings: ILinkedInFindJobsRequest): Promise<ILinkedInJobs[]> {
        const jobs: ILinkedInJobs[] = [];
        const { auth, filterButton, query, quantity = 50 } = settings;

        await new LoginUseCase(this.webBrowser).execute(auth);
        await new SearchUseCase(this.webBrowser).execute(query);
        await new SelectFilterUseCase(this.webBrowser).execute(filterButton);

        let pageNumber = 1;
        let pageNumberPath;
        let pageButtonEl;
        while (jobs.length < quantity) {
            try {
                const nextPage = pageNumber += 1
                this._console('Extracting jobs...');

                // Get Jobs container
                await this.driver.wait(until.elementsLocated(By.css('ul.scaffold-layout__list-container')), 10000)
                const ulEl = await this.driver.findElements(By.css('ul.scaffold-layout__list-container'));
                const liEl = await ulEl[0].findElements(By.css('li.jobs-search-results__list-item'));
                const footer = await this.driver.findElement(By.css('footer.global-footer-compact'));

                await this._scrollToFooter(liEl, footer);

                const jobsFromPage = await this._extractjobsFromPage(liEl);
                if (jobsFromPage.length) {
                    jobs.push(...jobsFromPage);
                    this._console(`Extract total of ${jobsFromPage.length} Jobs in this page`);
                    // this._saveOn(JSON.parse(JSON.stringify(jobs)));
                }

                if (jobs.length >= quantity) break;

                // Go to next page
                pageButtonEl = await this.driver.findElement(By.css(`button[aria-label="Page ${pageNumber}"]`));
                pageButtonEl.click();

            } catch (error: any) {
                console.error('Error: ' + error.message)
                break;
            }
        }

        if (jobs.length > quantity) jobs.splice(quantity, jobs.length - quantity);
        return jobs;
    }

    private async _extractjobsFromPage(liEl: WebElement[]) {
        this._console('Extracting jobs from page...');
        const jobs = [];
        for (const el of liEl) {
            try {
                const nameLinkElement = await el.findElement(By.css('a.job-card-list__title'))
                const name = (await nameLinkElement.getText()).split('\n')[0];
                const url = await nameLinkElement.getAttribute('href');
                const job: ILinkedInJobs = { name, url };
                jobs.push(job)
            } catch (error) { /* empty */ }
        }
        return jobs;
    }

    private async _scrollToFooter(elements: WebElement[], footer: WebElement) {
        this._console('Scrolling Down...')
        for (let i = 0; i < elements.length; i += 3) {
            await this.driver.executeScript("arguments[0].scrollIntoView();", elements[i]);
            await this.driver.sleep(3000);
        }
        await this.driver.executeScript("arguments[0].scrollIntoView();", footer);
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