A simple CRUD Express App

Heroku Link - [https://zuri-express-app.herokuapp.com/]
Github Link - [https://github.com/tamsay/zuri_express_crud_api]
## Route Documentation 
(NB: The examples below are done with JAVASCRIPT - FETCH)

## GET
Gets all entries

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

fetch("https://zuri-express-app.herokuapp.com/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


## GET
Gets a single entry from the database
https://zuri-express-app.herokuapp.com/1

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};
 
fetch("https://zuri-express-app.herokuapp.com/1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


## POST
Creates a new entry
https://zuri-express-app.herokuapp.com/

Bodyraw (json)
JSON
{
  "name": "mike",
  "country": "canada",
  "email": "mike@zuri.com"
}

var raw = "  {\n        \"name\" : \"mike\",\n        \"country\": \"canada\",\n        \"email\": \"mike@zuri.com\"\n    }\n    ";

var requestOptions = {
  method: 'POST',
  body: raw,
  redirect: 'follow'
};

fetch("https://zuri-express-app.herokuapp.com/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


## PUT
Updates an entry
Bodyraw (json)
JSON
{
  "name": "tolu",
  "country": "ghana",
  "email": "tolu@zuri.com"
}
var raw = "  {\n        \"name\" : \"tolu\",\n        \"country\": \"ghana\",\n        \"email\": \"tolu@zuri.com\"\n    }\n    ";

var requestOptions = {
  method: 'PUT',
  body: raw,
  redirect: 'follow'
};

fetch("https://zuri-express-app.herokuapp.com/1", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

## DEL
Deletes an entry
https://zuri-express-app.herokuapp.com/2

var requestOptions = {
  method: 'DELETE',
  redirect: 'follow'
};

fetch("https://zuri-express-app.herokuapp.com/2", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

