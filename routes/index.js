var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/:version/parse', function(req, res, next) {

  if(req.params.version == 'v1'){
    var code = req.body.data;
    var firstName, lastName,id;
      try {
        //take first name
        firstName = code.match(/[A-Z]*[0]*/)[0];
        code = code.replace(firstName,'');

        //take last name
        lastName = code.match(/[A-Z]*[0]*/)[0];
        id = code.replace(lastName,'');

        res.send({statusCode:200,data:{'firstName':firstName,'lastName':lastName,clientId:id}})
      } catch (error) {
        res.send({statusCode:500,data:{"Error":'Invalid User Code'}})
      }
  }else if(req.params.version == 'v2'){
    var code = req.body.data;
    var firstName, lastName,id;
      try {
        //take first name
        firstName = code.match(/[A-Z]*[0]*/)[0];
        code = code.replace(firstName,'');
        //remove zeros
        firstName = firstName.match(/[A-Z]*/)[0];

        //take last name
        lastName = code.match(/[A-Z]*[0]*/)[0];
        id = code.replace(lastName,'');
        //remove zeros
        lastName = lastName.match(/[A-Z]*/)[0];
        
        //set "-" after 3 digit
        id = [id.slice(0, 3), '-', id.slice(3)].join('');


        res.send({statusCode:200,data:{'firstName':firstName,'lastName':lastName,clientId:id}})
      } catch (error) {
        res.send({statusCode:500,data:{"Error":'Invalid User Code',"error":error}})
      }
  }
  
});

module.exports = router;
