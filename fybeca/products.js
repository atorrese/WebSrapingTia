const fs = require('fs'); 
const puppeteer = require('puppeteer');

(async()=>{
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'] });
    const page = await browser.newPage();

    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1280, height: 800 });
    
    let groups =JSON.parse(fs.readFileSync('fybeca/groupUrls.json','utf-8'));
    const productos = [];
    const marcas =[];
    for(let group of groups){
        for(let href of group.pageUrls){
            await page.goto(href);
            await page.waitForSelector('#container-result');
            
            const prod = await page.evaluate(()=>{
                        const elements = document.querySelectorAll('li.product-tile');
                        const products=[];
                        const marks=[];
                        for (let [key,element] of elements.entries()) {
                            if(key != elements.length-1){
                                const tmp ={};
                                const elementsmarks = document.querySelectorAll('[data-action="show-result-category"]');

                                elementsmarks.forEach((elemmark,markkey)=>{
                                    if(elemmark.href.search('&b=') != -1){
                                        marks.push(elemmark.innerText.split(' (')[0]);//elemmark.innerText.split(' (')[0]);
                                    } 
                                    });

                                tmp.name = element.getAttribute('data-name');
                                tmp.prices = JSON.parse(element.getAttribute('data-price'));
                                tmp.unit = element.getAttribute('data-unit');
                                tmp.presentation = element.getAttribute('data-presentation');
                                
                                products.push(tmp);
                            }

                        }
                        return {products:products,marks:marks};
                        });
        
        let result = prod.marks.filter((item,index)=>{
            return prod.marks.indexOf(item) === index;
          });  
        
        result.forEach((mark,key)=>{
                if(marcas.indexOf(mark) == -1){
                    marcas.push(mark);
                }

        });
        console.log(marcas);
        prod.products.forEach((element,index)=>{
            element.group=group.name;
            let el = "S/M";
            marcas.forEach((mark ,key)=>{
                        if(element.name.search(mark.toUpperCase()) != -1){
                            el=mark;
                        }
                        });
            element.mark =el;
            prod[index] = element;
            productos.push(element);
        })
        console.log(productos);
        }
    };
    let marksProducts=[];
    marcas.forEach((element,key)=>{
        marksProducts.push({name:element});
    });
    console.log(productos);
    fs.writeFileSync('fybeca/data/products.json',JSON.stringify(productos));
    fs.writeFileSync('fybeca/data/marks.json',JSON.stringify(marksProducts));
    await browser.close();
})();
