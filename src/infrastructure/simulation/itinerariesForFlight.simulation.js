const puppeteer = require("puppeteer");
const fs = require("fs");

const ItinerariesForFlight = async({ origin, destination }) => {

    let browser;
    let itineraries = [];

    try {

        // Launch browser
        browser = await puppeteer.launch({
            ignoreHTTPSErrors: true,
            headless: true,
            defaultViewport: null,
            args: [
                '--start-maximized',
                '--no-sandbox',
                '--disable-setuid-sandbox',
            ],
        });

        // Set browser
        let blankPage;
        let page = await browser.newPage();
        await page.goto(process.env.URL_GOOGLE_FLIGHT , { waitUntil: 'networkidle2', timeout: 0 });
        ([ blankPage, page ] = await browser.pages());
        if (blankPage) await blankPage.close();

        // Check DOM is available for scraping
        let scrapingHasStarted = await page.evaluate(() => {

            let inputOrigin = document.querySelector("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(1)");
            let inputDestination = document.querySelector("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(4)");

            return inputOrigin && inputDestination;

        });

        if (scrapingHasStarted) {

            // Input origin
            await page.click("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(1) > div");
            await page.type("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(1) > div", origin, { delay: 500 });
            await page.click("div[role=search] ul[role=listbox][jsaction] > li");

            // Input destination
            await page.click("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(4) > div");
            await page.type("div[role=search] > div[jscontroller] > div[class]:nth-child(2) > div[class]:first-child > div[class]:not([jsname]):nth-child(4) > div", destination, { delay: 500 });
            await page.click("div[role=search] ul[role=listbox][jsaction] > li");

            // Search
            await page.click("div[role=search] > div:last-child button");

            // Wait DOM load and open Price Graph
            await page.waitForSelector("div[role=main] div[role=region] > div[jsname] > div[jscontroller] div[jsaction]:not([jsname]) > button");
            await page.click("div[role=main] div[role=region] > div[jsname] > div[jscontroller] div[jsaction]:not([jsname]) > button");
            await page.waitForSelector("span[jsslot] div[jsmodel] div[jscontroller] > div[jsaction] svg");

            let quantityOfItineraries = 300;
            let quantityOfPaths = await page.evaluate(() => Array.from(document.querySelectorAll("span[jsslot] div[jsmodel] div[jscontroller] > div[jsaction] svg path")).length)

            do {

                let partialsItineraries = [];

                for (let i = 0; i < quantityOfPaths; i++) {

                    let { date, positionX, positionY } = await page.evaluate((i) => {

                        let paths = Array.from(document.querySelectorAll("span[jsslot] div[jsmodel] div[jscontroller] > div[jsaction] svg path"));
                        let path = paths[i];
                        let date = path.getAttribute("data-id");
                        let { x: positionX, y: positionY } = path.getBoundingClientRect();
                        return { date, positionX, positionY };

                    }, i);

                    await page.mouse.click(positionX, positionY);

                    let price = await page.evaluate(() => {

                        let price = document.querySelector("span[jsslot] div[jsmodel] div[jscontroller] div[jsaction] > div:last-child span");
                        if (price) price = price.innerHTML.replace(/&nbsp;/g, ' ');
                        
                        return price;
    
                    });

                    if (!itineraries.find(itinerary => itinerary.date == date && price)) partialsItineraries = [ ...partialsItineraries, { date, price } ];

                }

                await page.click("span[jsslot] div[jsmodel] > div[data-is-touch-wrapper] > button");
                itineraries = [ ...itineraries, ...partialsItineraries ];
                quantityOfItineraries -= partialsItineraries.length;

            } while (quantityOfItineraries > 0);

        }
        
    } catch (e) {

        console.log("Error in infrastructure/simulation/itinerariesForFlight");
        console.log(e.message);
        
    }

    if (browser) await browser.close();
    return itineraries;

}

module.exports = ItinerariesForFlight;