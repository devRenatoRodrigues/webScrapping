import { ChromeDriver } from "../utils/ChromeDriver.utils";

export default class LinkedinService {
    private driver: any;

    constructor(driver: any) {
        this.driver = driver;
    }

    async execute() {
        this.driver.get('https://www.linkedin.com');
    }

}


const chromedriver = new ChromeDriver();
const chrome = chromedriver.chrome();
console.log(chrome);

const service = new LinkedinService(chromedriver);

