 var http =  require('http');
const fs = require('fs');
const mssql = require('mssql')
const express = require('express');
const tedious = require('tedious');


const marks = JSON.parse( fs.readFileSync('fybeca/data/marks.json'));
const groups = JSON.parse( fs.readFileSync('fybeca/groups.json'));
const categories = JSON.parse(fs.readFileSync('category.json'))

// console.log(groups.find(element =>element.name ==='Animales de juguetefff'))//.find({name :'Animales de juguete'}))
// if(groups.find(element =>element.name =='Animales de juguete') ){
    
// console.log(' se  inserta')
// }else{
// console.log('no se  inserta')
// }

const config = {
    user: 'sa',
    password: '12345',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'BD_FYBECA',
   options :{encrypt:false, enableArithAbort:true,truestedConnection: true}
   
}
for(let  mark of marks){
    //crear(mark);
}
for(let category of categories){
    var l;
    const c = createCategoryMain(category.name,1)
    c.done(id=>{
        l=id;
    })
    console.log(c);
}


/* const abrirConexion =  new mssql.ConnectionPool(config).connect()
const cerrarConexion = mssql.close() */

//const c = createCategoryMain('categoriaPrueba3',1)
//var l;
//console.log(l);
async function createCategoryMain(name,level){
    try{
        let pool = await mssql.connect(config);
        let cat = await pool.request() 
                            .input('NAME',mssql.VarChar(200),name)
                            .input('LEVEL',mssql.Int,level)
                            .output('ID',mssql.Int)
                            .execute('I_CATEGORY_PRINCIPAL')
        return cat.output.ID
    }catch(err){
        console.log(err);
    }
}




 function createCategory(req ={},resp){
    const cosulta= new mssql.ConnectionPool(config).connect().then(pool=>{
            return pool.request()
                    .input('NAME',mssql.VarChar(200),req.name)
                    .input('LEVEL',mssql.Int,req.level)
                    .output('ID',mssql.Int)
                    .execute('I_CATEGORY_PRINCIPAL')
    
    
    
        })
        .then((result)=>{
            console.log(result)
            resp.status(200).send(result)

            
        }).catch(err=>{
            l=0;
            console.dir(err)
            
            mssql.close()
        });

        mssql.on('output', out => {
            
            console.dir(out);
            mssql.close()
        })
}

function   crearCategoriaPrincial(name,level){
    var resul;
    new mssql.ConnectionPool(config).connect().then(pool=>{
        return pool.request()
                .input('NAME',mssql.VarChar(200),name)
                .input('LEVEL',mssql.Int,level)
                .output('ID',mssql.Int)
                .execute('I_CATEGORY_PRINCIPAL')



    })
    .then((result)=>{
        resul=result.output.ID;
        mssql.close()
        
        
    }).catch(err=>{
        resul=0;
        console.dir(err);
        mssql.close()
    });
    return resul;
}

function  crearMarca(mark){
    new mssql.ConnectionPool(config).connect().then(pool=>{
        return pool.request().query(`insert into marca(name) values('${mark.name}')`)
    }).then(result=>{
        let rows =result.recordset
        console.log(result);
        mssql.close()
    }).catch(err=>{
        console.log(err);
        mssql.close();
    });
}



