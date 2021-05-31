const puppeteer = require('puppeteer');

(async ()=>{
    const browser = await  puppeteer.launch({headless:false , args: ['--start-maximized']});
    const page = await browser.newPage();

    await page.goto('https://www.amazon.com/-/es/');
    await page.screenshot({path:'amazon1.jpg'});
    
    await page.type('#twotabsearchtextbox','Laptops');
    await page.screenshot({path:'amazon2.jpg'});
    await page.click('.nav-search-submit input')
    await page.waitForSelector('[data-component-type=s-search-result]');
    //await page.waitFor(2000);

    const enlaces =await page.evaluate(()=>{
        const  elements= document.querySelectorAll('[data-component-type=s-search-result] h2  a');
        const  links = [];

        for(let element of elements){
            links.push(element.href);
            
        }
   
        return links;
    });
    articulos=[];
    for(let enlace of enlaces){
        await page.goto(enlace);
        await page.waitForSelector('#productTitle');
        const articulo= await page.evaluate(()=>{
                const tmp = {}
                //console.log(document.querySelector('#productTitle'));
                //console.log(document.querySelector('#productTitle').textContent);
                tmp.title = document.querySelector('#productTitle').innerText;
                tmp.price = document.querySelector('div#olp-upd-new span.a-size-base.a-color-price , div#olp-upd-new-used span.a-size-base.a-color-price , span#priceblock_saleprice , span#price_inside_buybox').innerText;
                //tmp.mark = document.querySelector('td.a-span9 > span.a-size-base').textContent;

            return tmp;
        });
        articulos.push(articulo);

        //await page.waitFor(1000);
        
    }


    console.log(articulos);
    console.log(articulos.length);


    await browser.close();

})();
