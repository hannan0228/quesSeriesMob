var express = require('express');
var router = express.Router();
var User = require('../models/user');
// const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const SECRET_KEY = 'qwertyuiop';
router.get('/', function (req, res, next) {
	return res.send("Please signup or login first!")
});


router.post('/', async (req, res) => {
	var personInfo = req.body;
	if(!personInfo.email || !personInfo.username || !personInfo.password){
		res.send("Please provide email,username and password");
	} else {

			await User.findOne({email:personInfo.email},async (err,data) =>{
				if(!data){
					var c;
					await User.findOne({},async (err,data) =>{

						if (data) {
							c = data.unique_id + 1;
						}else{
							c=1;
						}
						const password = await bcrypt.hash(personInfo.password, 10)

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: password
						});

						await newPerson.save()

					}).sort({_id: -1}).limit(1);
					res.json({message:"Sign Up Succesfully,You can login now."});
				}else{
					res.json({message:"Email is already used."});
				}

			});
		
	}
});


router.post('/login', async (req, res, next) => {
	//console.log(req.body);
	await User.findOne({email:req.body.email}, async(err,data) => {
		if(data){
			const passwordMatch = await bcrypt.compare(req.body.password, data.password);
			if(passwordMatch){
				const token = jwt.sign({ email: data.email}, SECRET_KEY, { expiresIn: '1h' });

				res.status(200).send({"message":"Successfully login!",token});
				
			}else{
				res.status(401).send({"message":"Wrong password!"});
			}
		}else{
			res.status(401).send({"message":"Email not exists!"});
		}
	});
});


const authenticateToken = async (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
	  return res.status(401).send({message:'Unauthorized'});
	}
  
	 await jwt.verify(token, SECRET_KEY, (err, user) => {
	  if (err) {
		return res.status(401).send({message:'token expired!'});
	  }
  
	  req.user = user;
	  next();
	});
  }

router.get('/homepage', authenticateToken, async (req, res) => {
	await User.findOne({email:req.user.email}, (err,data) => {
		if(data){
			res.send({message:"Welcome to the home page!",username:data.username,email:data.email});
		}else{
			res.status(400).send({message:'Email does not exists!'});
		}
	})
  });


module.exports = router;