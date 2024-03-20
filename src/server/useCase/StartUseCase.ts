import { BrowserType } from "../interfaces";
import { WebBrowser } from "../drivers";

export class StartUseCase {

  async execute(browser: BrowserType) {
    const webBrowser = new WebBrowser();
    await webBrowser.start({ browser, headless: false })
    return webBrowser;
  }

}