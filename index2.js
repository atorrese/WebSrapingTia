const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await  puppeteer.launch({headless:false , args: ['--start-maximized']});
    const page = await browser.newPage();

    await page.goto('https://www.tia.com.ec/supermercado');
    await page.screenshot({path:'tia1.jpg'});
    
    //await page.type('input#buscarText','leche');
    await page.screenshot({path:'tia2.jpg'});
    await page.waitForSelector('[id="menu-mobile"]');
    await page.evaluate(()=>{
        const elements = document.querySelector('');
    });
    //await page.click('input#buscarButton')

    await browser.close();

})();
