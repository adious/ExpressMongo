var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/userlist', function(req,res){
	var db = req.db;
	var collection = db.get('usercollection');
	collection.find({},{},function(err,docs){
		res.render('userlist',{
			"userlist":docs
		});	
	});
});


router.get('/newuser',function(req,res){
	res.render('newuser',{title: 'Add New User'});
});

router.post('/adduser',function(req,res){
	var db = req.db;

	var username = req.body.username;
	var email = req.body.useremail;

	var collection = db.get('usercollection');

	collection.insert({
		"username": username,
		"email" : email
	},function(err,doc){
		if(err){
			res.send('Error',500);
		}
		else{
			res.redirect("userlist");
		}
	});
});

module.exports = router;
