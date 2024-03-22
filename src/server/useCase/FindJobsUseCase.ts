import { By, WebElement, until } from "selenium-webdriver";
import { WebBrowser } from "../drivers";
import { SearchUseCase } from "./SearchUseCase";
import { SelectFilterUseCase } from "./selectFilterUseCase";
import { ILinkedInFindJobsRequest, ILinkedInJobs, } from "../interfaces/linkedin.interfaces";



export class FindJobsUseCase {

    constructor(private webBrowser: WebBrowser) { }

    async execute(settings: ILinkedInFindJobsRequest): Promise<ILinkedInJobs[]> {
        const jobs: ILinkedInJobs[] = [];
        const { filterButton, query, quantity = 5 } = settings;

        await new SearchUseCase(this.webBrowser).execute(query);
        await new SelectFilterUseCase(this.webBrowser).execute(filterButton);

        while (jobs.length < quantity) {
            try {
                this._console('Extracting jobs...');

                await this.driver.wait(until.elementsLocated(By.className('jobs-search-results-list')), 10000)
                const content = await this.driver.findElements(By.className('jobs-search-results-list'));
                const jobsFromPage = await this._extractjobsFromPage(content);
                this._console(jobsFromPage);
                if (jobsFromPage.length) {
                    jobs.push(...jobsFromPage);
                }

                if (jobs.length >= quantity) break;

                // Wait
                await this.driver.sleep(5000);

                // Next Page
                this._console('Next page button...');
                await this.driver.executeScript("window.scrollTo(0, document.body.scrollHeight)");
                let nextButton = await this.driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Next')]")), 10000);
                if (!nextButton) { break; }
                nextButton = await this.driver.findElement(By.xpath("//button[contains(., 'Next')]"));
                await this.driver.wait(until.elementIsEnabled(nextButton), 5000);
                await nextButton.click();

                // Wait
                await this.driver.wait(
                    until.stalenessOf(content[content.length - 1]),
                    20000,
                    'Elements not found within the time limit.'
                );
            } catch (error: any) {
                console.error('LinkedIn Driver _extractjobs(): ' + error.message)
                break;
            }
        }

        if (jobs.length > quantity) jobs.splice(quantity, jobs.length - quantity);
        return jobs;
    }

    private async _extractjobsFromPage(content: WebElement[]) {
        this._console('Extracting jobs from page...');
        const jobs = [];
        for (const el of content) {
            try {
                this._console(content.length);
                const nameLinkElement = await el.findElement(By.className('job-card-list__title'))
                const name = (await nameLinkElement.getText()).split('\n')[0];
                const url = await nameLinkElement.getAttribute('href');
                const job: ILinkedInJobs = { name, url };
                jobs.push(job)
            } catch (error) { /* empty */ }
        }
        this._console(jobs);
        return jobs;
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