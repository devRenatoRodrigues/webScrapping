import { WebDriver } from "selenium-webdriver";

export type BrowserType = 'chrome';

export interface IWebBrowserOptions {
  browser?: BrowserType;
  proxy?: boolean;
  headless?: boolean;
}

export interface IWebBrowser {
  options: IWebBrowserOptions;
  driver: WebDriver;
  timeoutMS: number;

  start(options?: IWebBrowserOptions): Promise<IWebBrowser>;
  close(): Promise<void>;
}
