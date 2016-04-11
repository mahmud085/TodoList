module.exports=function(app) {

var router=app.loopback.Router();
router.get('/',function (req,res) {
	res.render('index.ejs');
});
router.get('/signup',function(req,res){
	res.render('signup.ejs');
});
router.get('/login',function(req,res){
	res.render('login.ejs');
});
router.post('/login',function(req,res){
	console.log('Login req body = ',req.body);
	var User = app.models.User;
	var email = req.body.email;
    var password = req.body.password;
	User.login({
		email : email,
		password : password
	},'user',function(err,token){
		if(err){
			console.log("Login Failed!");
			res.render('signup.ejs');
		}else{
			//token = token.toJSON();
			console.log('Token = ',token.id);
			res.render('index.ejs',{
				username: token.user.username,
        		accessToken: token.id
			});
		}
	});
});
router.post('/signup',function(req,res){
	var User=app.models.User;
	var newUser={};
	newUser.username = req.body.username.trim();
	newUser.email = req.body.email.toLowerCase();
	newUser.password = req.body.password;
	User.create(newUser,function(err,result){
		if(err){
			console.log(err);
		}else{
			res.redirect('/login');
		}
	});
});



app.use(router);
};