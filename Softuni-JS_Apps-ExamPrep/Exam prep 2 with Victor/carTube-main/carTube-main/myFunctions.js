function createHtmlElement(elementType, textContent, attributes) {
    //createHtmlElement("div","testElement",[["class","testClass"],["id","testId"]]);
    //createHtmlElement("div","",["class","testClass"]).appendChild(createHtmlElement("div","",["class","appendedClass"]))
    const element = document.createElement(elementType);
    if (textContent) {
        element.textContent = textContent;
    }
    for (let i = 0; i < attributes.length; i++) {
        element.setAttribute(attributes[i][0], attributes[1]);
    }
    return element;
}

function getOptions(method, body, token) {
    if (token) {
        switch (method) {
            case "delete":
                return {
                    method: "delete",
                    headers: { /*'Content-Type': 'application/json', */'X-Authorization': token }
                };

            case "post":
                return {
                    method: "post",
                    headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "put":
                return {
                    method: "put",
                    headers: { 'Content-Type': 'application/json', 'X-Authorization': token },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "get":
                return {
                    method: "get",
                    headers: { 'Content-Type': 'application/json','X-Authorization': token }
                }
        }
    } else {
        switch (method) {
            case "delete":
                return {
                    method: "delete"//,
                    //headers: { 'Content-Type': 'application/json' }
                };

            case "post":
                return {
                    method: "post",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "put":
                return {
                    method: "put",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body) //BODY MUST BE AN OBJECT
                };

            case "get":
                return {
                    method: "get"//,
                    //headers: { 'Content-Type': 'application/json' }
                }
        }
    }
}
export async function request(url, method, body, tokenAuth) {
    let options = getOptions(method, body, tokenAuth);
    let response = await fetch(url, options);

    if (response.ok != true) {
        const error = await response.json();
        alert(error.message);
        throw new Error(error.message);
    }

    try{
    const data = await response.json();
    return data;
    } catch(err){
        return;
    }
}

function end2endTesting() {
    //*This is not a function
    //*This is the format for End To End Testing using playwright and chai
    //*Copy+Paste the code below everytime you will be doing a playwright test and follow the instructions below

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Start copying from here

    //*First -> npm init -y
    //*Second -> npm install --save-dev playwright-chromium
    //*Third -> start lite-server on one terminal
    //*Fourth -> run test on a second terminal with mocha test.js
    //*Everything must be executed in the integrated terminal of the application's folder

    const { chromium } = require('playwright-chromium');
    const { expect } = require('chai');

    let browser, page; //Declare reusable variables

    describe('E2E tests', function () {
        this.timeout(6000);
        before(async () => {
            browser = await chromium.launch(/*{headless: false, slowMo: 500}*/ /*<---Remove these comments if you want to visualize the tests*/);
        });

        after(async () => {
            await browser.close();
        });

        beforeEach(async () => {
            page = await browser.newPage();
        });

        afterEach(async () => {
            await page.close();
        });

        //*Add all of your tests here in this format
        // it('name of test', async () => {
        //     test...
        //     test...
        // });

        //*Example
        it('loads static page', async () => {
            await page.goto('http://localhost:3000/');  //MAKE SURE YOU ALWAYS ADD "await page.goto('')" before every test!!!!
            await page.screenshot({ path: `index.png` });
        });


        it('Gets all elements matching the css selector and maps them to the array elements and then checks if the array tokens equal to the desired values', async () => {
            await page.goto('http://localhost:3000/'); //MAKE SURE YOU ALWAYS ADD "await page.goto('')" before every test!!!!
            const elements = await page.$$eval("div.head > span" /* "ADD CSS SELECTOR HERE" */, (a) => a.map(x => x.textContent));
            console.log(elements); //you can console log them to see what is the output array
            expect(elements).deep.to.equal(["Scalable Vector Graphics", "Open standard", "Unix", "ALGOL"]);
        });




    });

    //Stop copying here

}