const puppeteer = require('puppeteer');
const fs = require('fs'); 
const { count } = require('console');

(async ()=>{
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized'] });
    const page = await browser.newPage();
    
    await page.setDefaultNavigationTimeout(0);
    await page.setViewport({ width: 1296, height: 800 });
    await page.goto('https://www.fybeca.com/FybecaWeb/pages/search-results.jsf?s=0&pp=100&cat=205&ot=0#');

    //await page.waitForSelector('[id="container-result"]');
    /*
    const categorias = await page.evaluate(()=>{
        const elements = document.querySelectorAll('li.dd');
        const categories =[];
        for (let [index,element] of elements.entries()){
            const tmp = {};
            if(index!=1 || index !=9){
                tmp.name = element.firstElementChild.innerText;
                tmp.url  = element.firstChild.href;
                tmp.subcategory =[];
                const hijos=element.querySelector('div.dd-menu > div.row-fluid ,ul.nav-list ').querySelectorAll('div.span4 , div.span3 , div.span6, li.more-category');//.querySelectorAll('span');//querySelectorAll('span');//firstElementChild.querySelectorAll('li');
                console.log(hijos);
                for(let [i,elem] of hijos.entries()){
                    if(i != 1 || elem != []  ){
                        console.log(elem);
                    }
                }
/*                 for(let [i,elem] of hijos.entries()){
                    console.log(elem);
                     if(elem.classList.contains( 'nav-header' )){
                        const  sub ={};
                        sub.name = elem.firstElementChild.innerText;
                        sub.url = elem.firstElementChild.href;
                        sub.subgroup =[];
                        tmp.subcategory.push(sub); 
                    }else{
                        const  subgroup ={};
                        subgroup.name = elem.firstElementChild.innerText;
                        subgroup.url = elem.firstElementChild.href;
                        
                        if (tmp.subcategory.length == 0){
                            tmp.subcategory[0].subgroup.push(subgroup);
                        }else{
                            tmp.subcategory[tmp.subcategory.length -1].subgroup.push(subgroup);
                        }
                    }
                } 
            }
            categories.push(tmp);
        }
        return categories;
    });*/
  /* const productos =await page.evaluate(()=>{
    if (document.readyState === "complete") {



        var ispage=true;
        var elements ;
        document.querySelectorAll('div#divFlipperPopup').item(0).firstElementChild.click();
        elements = document.querySelectorAll('li.product-tile ');   
        var cargador = document.querySelector('div#container-result');
        console.log(cargador);
        //while(ispage == true ){    //|| ispage === undefined 
    
            document.querySelectorAll('div#divFlipperPopup').item(0).firstElementChild.click();
            ispage =false;
            for(let [index,element] of elements.entries()){
                 if(element.firstElementChild.classList.contains('nextPageButton') && element.firstElementChild.style.display != 'none'){
                    element.firstElementChild.firstElementChild.click();
                    ispage =true;
                }else{
                    console.log(ispage);
                   
                }
            }
           
            for(let [i,element] of elements.entries()){
               console.log(element);
            }
            console.log(ispage);
            setTimeout(()=>{
               ;
               elements = document.querySelectorAll('li.product-tile ');   
           },3000); 
          
           for(let [i,element] of elements.entries()){
               console.log(element);
            }
        
       // }
    }
    

   })*/
   /*
   const productos = await page.evaluate(() => {
    if (document.readyState === "complete") {
    document.querySelectorAll('div#divFlipperPopup').item(0).firstElementChild.click();
    const categoria = document.querySelector('div#content-header').firstElementChild.lastElementChild.innerText; 
    console.log(categoria);
    const select=document.getElementById("slt-ipp-top");
    select.value=100;
    const products = [];
    const count =  document.getElementById("itemsCount").innerText.replace('resultado(s) de búsqueda','');
    console.log(count);
    const elements = document.querySelectorAll('li.product-tile');
    //const
    for (let element of elements) {
        const tmp = {};
        tmp.name = element.getAttribute('data-name');
        tmp.subgroup=categoria;
        tmp.prices = JSON.parse(element.getAttribute('data-price'));
        tmp.unit = element.getAttribute('data-unit');
        tmp.presentation = element.getAttribute('data-presentation');
        if (products.length <= 24) {
            products.push(tmp);
        }
    }
    return products;
} 
return;
});
console.log(productos);
console.log(productos.length);*/



    //fs.writeFileSync('category2.json',JSON.stringify(categorias));
    //await browser.close();

    let archivo=fs.readFileSync('category.json','utf-8');

    //console.log(archivo);
    //console.log(JSON.parse(archivo));
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