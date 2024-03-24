import { WebBrowser } from "../drivers";

export class CloseUseCase {

    constructor(
        private driver: WebBrowser
    ) { }

    async execute() {
        await this.driver.close()
    }

}