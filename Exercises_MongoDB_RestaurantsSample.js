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
