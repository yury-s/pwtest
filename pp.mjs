import puppeteer from "playwright";

export async function WaitForTimeout(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

let url = "https://laptop.bg/"; // or any other page with cf protection on
var browser = await puppeteer.firefox.launch({
    headless:false,
    ignoreHTTPSErrors: true
});

const page = await browser.newPage();
let response = await page.goto(url, {waitUntil: "domcontentloaded", timeout: 40000});
await WaitForTimeout(6000);

//parsing iframe src
let pageContent = await page.content();
let iframeString = pageContent.substring(pageContent.indexOf("<iframe"), pageContent.indexOf(">",pageContent.indexOf("<iframe"))+1);
let iframeSrc = iframeString.substring(iframeString.indexOf('src="')+5, iframeString.indexOf('"',iframeString.indexOf('src="')+5));
console.log("parsed src: "+iframeSrc+"")

// print all iframe urls on the page, that is main and one child of main
// notice that no url is found for the actual iframe
console.log("all iframe srcs found via frame.url(), only main has src")
let allFrames = page.frames();
for (const singleFrame of allFrames) {
    console.log("url "+singleFrame.url());
}

await new Promise(resolve => setTimeout(resolve, 2000));

let iframe = page.frame({url:iframeSrc}); // returns null when firefox is used, but it works with WebKit and Chromium
console.log('found: ' + !!iframe);
