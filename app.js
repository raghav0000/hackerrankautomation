const puppeteer = require("puppeteer");
const loginLink = 'https://www.hackerrank.com/auth/login';
const email = 'raghvendraps9794@gmail.com';
const password = 'riTEsh9794HR';
const codeObj = require("./code");

//this will initialize puppeteer and open chromium browser
let browserOpen = puppeteer.launch({
    headless: false,//this will make our browser visible
    args: ['--start-maximized'],//chromium browser will be open on fullscreenmode
    defaultViewport: null,
})
let page;
browserOpen.then(function (browserObj){
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
}).then(function (newTab){
    page = newTab;
    let hackerRankOpenPromise = newTab.goto(loginLink);
    return hackerRankOpenPromise;
}).then(function (){
    let emailIsEntered = page.type("input[id='input-1']",email,{delay:50});//delay is added so that we can see the email at the login time
    return emailIsEntered;
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay:50});
    return passwordIsEntered;
}).then(function (){
    let loginButtonClick = page.click("button[data-analytics='LoginPassword']",{delay:30});
    return loginButtonClick;
}).then(function(){
    let clickOnAlgoPromise = waitAndClick("a[data-attr1='algorithms']",page);
    return clickOnAlgoPromise;
}).then(function(){
    let getToWarmUp = waitAndClick("input[value='warmup']",page);
    return getToWarmUp;
}).then(function(){
    let waitFor3seconds = page.waitForTimeout(3000);//wait for 3 seconds so that all questions will be get loaded on the page
    return waitFor3seconds;
}).then(function(){
    // $$ is a shorthand for document.querySelectorAll
    let allChallengesPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled",{delay:50});
    return allChallengesPromise;
}).then(function(questionsArr){
    let questionWillBeSolved = questionSolver(page,questionsArr[0],codeObj.answers[0]);
    return questionWillBeSolved;
})
.catch(function (err){
    console.log(err);
})


//this will find the selector and click on the element where is my selector
function waitAndClick(selector , cpage){
    return new Promise(function (resolve,reject){
        let waitForModePromise = cpage.waitForSelector(selector);
        waitForModePromise.then(function(){
            let clickModel = cpage.click(selector);
            return clickModel;
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click();
        questionWillBeClicked.then(function(){
            let waitFor3seconds = page.waitForTimeout(3000);
            return waitFor3seconds;
        }).then(function(){
            return waitAndClick(".checkbox-input",page);
        }).then(function(){
            return page.waitForSelector("textarea.custominput",page);
        }).then(function(){
            return page.type("textarea.custominput",answer,{delay:10});
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press("A",{delay:100});
            return AisPressed;
        }).then(function(){
            let XisPressed = page.keyboard.press("X",{delay:100});
            return XisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function(){
            let mainEditorInFocused = waitAndClick(".monaco-editor.no-user-select.vs",page);
            return mainEditorInFocused;
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down("Control");
            return ctrlIsPressed;
        }).then(function(){
            let AisPressed = page.keyboard.press("A",{delay:100});
            return AisPressed;
        }).then(function(){
            let VisPressed = page.keyboard.press("V",{delay:100});
            return VisPressed;
        }).then(function(){
            let ctrlIsUnpressed = page.keyboard.up("Control");
            return ctrlIsUnpressed;
        }).then(function(){
            return page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled",{delay:50});
        }).then(function(){
            resolve();
        }).catch(function(err){
            reject();
        })
    })
}
