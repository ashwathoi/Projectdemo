import{Locator,Page} from"@playwright/test";

export class LoginPage{
    readonly page:Page;
    readonly usernameinput:Locator;
    readonly passwordinput:Locator;
    readonly submitbutton:Locator;




    constructor(page:Page){
this.page=page;
this.usernameinput=page.locator("#username");
this.passwordinput=page.locator("#password");
this.submitbutton=page.locator("#submit");
    }

    async login(username:string,password:string){
await this.usernameinput.fill(username);
await this.passwordinput.fill(password);
await this.submitbutton.click();

    }

}