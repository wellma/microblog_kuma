
/*
 * GET home page.
 */
//module.exports=function(app){
// app.get('/',function(req,res){
//     res.render('index',{title:'首页'});
//
// });
//
//   app.get('/reg',function(req,res){
//       res.render('reg',{title:'用户注册'});
//   });
//};
var User = require('../models/user.js');
var Post = require('../models/post.js');

exports.index = function(req, res){
//    res.render('index',{title:'首页'});
    Post.get(null, function(err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            title: '首页',
            posts : posts,
            user : req.session.user,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });
    });
};

exports.user = function (req, res) {
};
exports.post = function (req, res) {
};

exports.reg = function (req, res) {
    res.render('reg',{title:'用户注册'});
};

exports.doReg = function (req, res) {
};

exports.login = function (req, res) {
};

exports.doLogin = function (req, res) {
};

exports.logout = function (req, res) {
};

//exports.hello = function (req, res) {
//    res.end('The time is ' + new Date().toGMTString());
//};