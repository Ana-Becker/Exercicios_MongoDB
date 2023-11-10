/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('sales').insertMany([
  { 'item': 'abc', 'price': 10, 'quantity': 2, 'date': new Date('2014-03-01T08:00:00Z') },
  { 'item': 'jkl', 'price': 20, 'quantity': 1, 'date': new Date('2014-03-01T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 10, 'date': new Date('2014-03-15T09:00:00Z') },
  { 'item': 'xyz', 'price': 5, 'quantity': 20, 'date': new Date('2014-04-04T11:21:39.736Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 10, 'date': new Date('2014-04-04T21:23:13.331Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 5, 'date': new Date('2015-06-04T05:08:13Z') },
  { 'item': 'def', 'price': 7.5, 'quantity': 10, 'date': new Date('2015-09-10T08:43:00Z') },
  { 'item': 'abc', 'price': 10, 'quantity': 5, 'date': new Date('2016-02-06T20:20:13Z') },
]);

// Run a find command to view items sold on April 4th, 2014.
const salesOnApril4th = db.getCollection('sales').find({
  date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
}).count();

// Print a message to the output window.
console.log(`${salesOnApril4th} sales occurred in 2014.`);

// Here we run an aggregation and open a cursor to the results.
// Use '.toArray()' to exhaust the cursor to return the whole result set.
// You can use '.hasNext()/.next()' to iterate through the cursor page by page.
db.getCollection('sales').aggregate([
  // Find all of the sales that occurred in 2014.
  { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
  // Group the total sales for each product.
  { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
]);

//Selecionar Banco de Dados 
use('sample_restaurants');

//1. Mostrar todos documentos da Collection 'restaurants'
db.restaurants.find();

//2. Query para mostrar os campos restaurant_id, name, borough e cuisine em todos os docs 
//da collection restaurants
db.restaurants.find({}, {"restaurant_id" : 1,
                         "name" : 1,
                         "borough" : 1,
                         "cuisine" : 1 
                        });

//3. Mostrar todos os campos acima sem o campo _id apareça
db.restaurants.find({}, {
                      "restaurant_id" : 1,
                      "name" : 1,
                      "borough" : 1,
                      "cuisine" : 1, 
                      "_id":0 
                    });

//4. Mostrar os campos restaurant_id, name, borough e zip code mas excluir o _id em todos os docs 
//da collection restaurants
db.restaurants.find({}, {"restaurant_id":1,
                         "name":1,
                         "borough":1,
                         "address.zipcode":1,
                         "_id":0});

//5. Mostrar todos os restaurantes no bairro Bronx
db.restaurants.find({"borough":"Bronx"});

//6. Mostrar os 5 primeiros restaurantes que estão no bairro Bronx
db.restaurants.find({"borough":"Bronx"}).limit(5);    

//7. Mostrar os próximos 5 restaurantes após os primeiros 5 que estão no Bronx  
db.restaurants.find({"borough":"Bronx"}).skip(5).limit(5);     

//8. Escreva uma query para mostrar os restaurantes que obtiveram um score > 90
db.restaurants.find({"grades" : {$elemMatch: {"score": {$gt : 90}}}});      

//9. Agora os restaurantes com score > 80 e < 100
db.restaurants.find({grades : { $elemMatch:{"score":{$gt : 80 , $lt :100}}}});
//OU
db.getCollection('restaurants').aggregate([{$match: {
  $and : [{"grades.score" : {$gt : 80}}, {"grades.score" : {$lt : 100}}]
}}]);

//10. Escreva uma query para mostrar os restaurantes que estão na latitude 
//de valor menor que -95.754168
db.restaurants.find({"address.coord" : {$lt:-95.754168}});

//11. Mostrar os restaurantes que não possuem cozinha 'American' e que o seu score
//seja > 70 e lat. < -65.754168
db.restaurants.find({$and:[
                            {"cuisine" : {$ne : "American"}}, 
                            {"grades.score" : {$gt : 70}}, 
                            {"address.coord": {$lt : -65.754168}}
                         ]
});

//12. Igual o 11 sem usar o operador %and
db.getCollection('restaurants').aggregate([{$match: {
    $and : [
            {"cuisine" : {$ne:"American"}}, 
            {"grades.score" : {$gt : 70}}, 
            {"address.coord": {$lt : -65.754168}}
           ]
}}]);
//OU
db.restaurants.find(
    {
      "cuisine" : {$ne : "American "},
      "grades.score" :{$gt: 70},
      "address.coord" : {$lt : -65.754168}
    }
);

//13. Encontrar os restaurantes que não preparam culinária 'American' e 
//obtiveram nota 'A' que não pertence ao bairro Brooklyn. Apresentar de acordo 
//com a culinária em ordem decrescente
db.restaurants.find(
    {
        "cuisine":{$ne : "American"},
        "grades.grade":"A",
        "address.borough":{$ne : "Brooklyn"}
    }
).sort({"cuisine":-1});

//14. Encontrar o ID, nome, bairro e a culinária dos restaurantes que contêm 
// 'Wil' como as três primeiras letras de seu nome.
db.restaurants.find ({name : /^Wil/},
                     {
                        "restaurant_id" : 1,
                        "name" : 1,
                        "borough" : 1,
                        "cuisine" : 1
                     }
);

//15. Encontrar o ID, nome, bairro e culinária dos restaurantes que contêm 
// 'ces' como as últimas três letras de seu nome.
db.restaurants.find(
    {name: /ces$/},
    {
        "restaurant_id":1,
        "name":1,
        "borough":1,
        "cuisine":1

    }
);

db.restaurants.find({
                        "borough" : "Queens",
                        "borough" : "Staten Island",
                        "borough" : "Bronxor",
                        "borough" : "Brooklyn"}, {"restaurant_id":1,
    "name":1,
    "borough":1,
    "cuisine":1
}
);

//16. Encontrar o ID, nome, bairro e a culinária dos restaurantes que contêm 'Reg' em algum lugar do nome.
db.restaurants.find({name:/.*Reg.*/},
                    {"restaurant_id":1,
                     "name":1,
                     "borough":1,
                     "cuisine":1
                    }
);

//17. Encontrar os restaurantes que pertencem ao bairro Bronx e preparam pratos americanos ou chineses.
db.restaurants.find({"borough":"Bronx",
                     "cuisine":{$in:["American","Chinese"]}
                    }
);

//19. Encontrar o nome e o bairro dos restaurantes que não pertencem aos bairros Staten Island, Queens, Bronxor e Brooklyn
db.restaurants.find({"borough":{$nin: ["Staten Island","Queens","Bronx","Brooklyn"]}},{"name":1, "borough":1, "_id":0});

//20. Encontrar o ID, nome, bairro e culinária dos restaurantes que obtiveram uma pontuação não superior a 10.
db.restaurants.find({"grades.score":{$not:{$gt:10}}},{"restaurant_id":1, "name":1, "borough":1, "cuisine":1, "grades.score":1});
