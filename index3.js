const puppeteer = require('puppeteer');
const fs = require('fs'); 
(async () => {
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'] });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://www.fybeca.com/FybecaWeb/pages/search-results.jsf?s=0&pp=25&cat=205&b=-1&ot=0');
    await page.waitForSelector('[id="container-result"]');

    const categorias = await page.evaluate(() => {
        const elements = document.querySelectorAll('li.dd');
        const categories = [];
        for (let [index, element] of elements.entries()) {
            const tmp = {};
            if (index != 1) {
                const c = element.querySelector('div.dd-menu > div.row-fluid ,ul.nav-list ').querySelectorAll('div.span4 , div.span3 , div.span6, li.more-category');
                tmp.name = element.firstElementChild.innerText;
                const subcateg = [];
                tmp.subcategory = [];
                c.forEach((element, key) => {
                    const t = element.querySelectorAll('ul.nav-list > li > a');
                    console.log(t.length);
                    if(t.length>1){
                    t.forEach((e, k) => {
                        console.log(e.parentElement.classList.contains( 'nav-header' ));
                        if(e.parentElement.classList.contains( 'nav-header' )){
                            const esub = {};
                            esub.name = e.innerText;
                            esub.url = e.href;
                            esub.subgroup =[];
                            
                            tmp.subcategory.push(esub);
                        }else{ 
                            const subgroup = {};
                            subgroup.name = e.innerText ;
                            subgroup.url = e.href;
                            if( tmp.subcategory.length>0){
                                console.log(tmp.subcategory);
                                tmp.subcategory[tmp.subcategory.length - 1].subgroup.push(subgroup);
                            }else{
                                console.log(tmp.subcategory);
                                tmp.subcategory[0].subgroup.push(subgroup); 
                            }
                           
                        }                
                    });
                }


                });

                categories.push(tmp);
            }

        }
        return categories;
        
    });
    const productos = await page.evaluate(() => {
        const elements = document.querySelectorAll('li.product-tile');

        const products = [];
        for (let element of elements) {
            const tmp = {};
            tmp.name = element.getAttribute('data-name');
            tmp.prices = JSON.parse(element.getAttribute('data-price'));
            tmp.unit = element.getAttribute('data-unit');
            tmp.presentation = element.getAttribute('data-presentation');
            if (products.length <= 24) {
                products.push(tmp);
            }
        }
        return products;
    });
    //products.push(productos);

    // for(let e of categorias){
    //     console.log(e);
    //     //console.log(e.name);
    //     //console.log(e.subcategory);
    // }
    fs.writeFileSync('category3.json',JSON.stringify(categorias));
    console.log(JSON.stringify(categorias));


    //await page.click('input#buscarButton')

    //await browser.close();

})();
