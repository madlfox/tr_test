import AbstractView from "./AbstractView.js";
import { signIn } from "../scripts/signIn.js";

export default class SignInView extends AbstractView {
    constructor() {
        super();
        this.setTitle("satori - sign in");
    }

    async getHtml(): Promise<string> {
        const res = await fetch("static/html/signIn.html");
        if (!res.ok) {
            throw new Error(`Failed to load view: ${res.statusText}`);
        }
        return res.text();
    }
    loadJS(): any{
        // Wait for the next paint cycle
// Wait for the next render cycle
requestAnimationFrame(() => {
    signIn();
});
            // signIn();
    }
    
    
        // await signIn(); // <-- Await the execution
    

    stopJS(): void {
        // No loop in this view
        // window.removeEventListener("DOMContentLoaded", signIn);
    }
}
