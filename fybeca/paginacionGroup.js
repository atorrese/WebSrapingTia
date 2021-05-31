
const fs = require('fs'); 

let groups =JSON.parse(fs.readFileSync('fybeca/groups.json','utf-8'));

for(let [key,group] of groups.entries()){
    const num =parseInt( group.countresult.replace(' ',''));
    group.countresult=num;
    group.pageUrls =[];
    if(num >25){
        for(let i = 0;i<num;i +=25){
            'https://www.fybeca.com/FybecaWeb/pages/search-results.jsf?cat=769&s=25&pp=25'
            const cadena = `s=${i}`;
            group.pageUrls.push(group.url.replace('s=0',cadena));
        }
    }else{
        group.pageUrls.push(group.url);
    }
    groups[key]= group;
}

console.log(groups);

fs.writeFileSync('fybeca/groupUrls.json',JSON.stringify(groups));