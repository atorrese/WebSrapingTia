const puppeteer = require('puppeteer');







const fs = require('fs'); 
(async ()=>{
    const browser = await puppeteer.launch({ headless: true, args: ['--start-maximized'] });
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1296, height: 800 });

    let archivo=fs.readFileSync('category.json','utf-8');

    //console.log(archivo);

    //console.log(JSON.parse(archivo));
    const categories =  JSON.parse(archivo);
    groups = [];
    for(let category of categories){
        for(let subcategory of category.subcategory){
            for(let subgroup of subcategory.subgroup){
                groups.push(subgroup);
            }
        }
    }
    console.log(groups.length);

    for(let [i,group] of groups.entries()){
        console.log(i,group.url);
        await page.goto(group.url);
        await page.waitForSelector('#container-result');
        //console.log(subgroup.url);
        const results = await page.evaluate(()=>{
            const count =  document.getElementById("itemsCount").innerText.replace('resultado(s) de búsqueda','');
            return count;
        });
        group.countresult = results; 
        groups[i]=group;
        
    }
    console.log(groups);
    fs.writeFileSync('fybeca/groups.json',JSON.stringify(groups));
   /* const categories =  JSON.parse(archivo);
    var totalsearch = [];

    for(let category of categories){
        for(let subcategory of category.subcategory){
            for(let subgroup of subcategory.subgroup){
                await page.goto(subgroup.url);
                await page.waitForSelector('#container-result');
                console.log(subgroup.url);
                const results = await page.evaluate(()=>{
                    const count =  document.getElementById("itemsCount").innerText.replace('resultado(s) de búsqueda','');
                    return count;
                });
                totalsearch.push(results);
            }
        }
    }


    console.log(totalsearch);*/
})();