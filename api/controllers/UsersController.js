/**
 * UsersController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  
  index: function (req, res) {
    Users.find().exec(function (err, users) {
      return res.view({ users: users });
    });
  },

  cool: function (req, res){
    Users.find().exec(function(err,users){
      return res.view({users: users});
    });
  },

  create: function (req, res) {
    var body = req.body;
    if (body != undefined) {
      console.log(body.Users);
      Users.create(body.Users).exec(function (err, users) {
        //return res.view({ user: users });
         return res.redirect('/');
      });
    } else {
      return res.view();
    }
  },

  view: function (req, res) {
    var id = req.params.id;
    console.log(id);
    Users.find(id).exec(function (err, users) {
      console.log(users[0]);
      return res.view({ user: users[0] });

    });
  },

  edit: function (req, res) {
    var id = req.params.id;
    console.log(id);
    Users.find(id).exec(function (err, users) {
      console.log(users[0]);
      return res.view({ user: users[0] });
    });
  },

  
  update: function (req, res) {
    var params = _.extend(req.query || {}, req.params || {}, req.body || {});
    var id = params.id;

    if(!id) return res.redirect("/error",500);

    var userupdate = {
      username : params.username,
      password : params.password
    };

    //Users.update({id:params.id},{username:params.Users['username'],password:params.Users['password']}).exec(function (err, user) {
    //Users.update({id:params.id},{username:params.username,password:params.password}).exec(function (err, user) {
    //Users.update(id,params).exec(function (err, user) {
    Users.update(id,userupdate).exec(function (err, user) {
      if(err){
        console.log("Error "+ err);
        res.redirect('users/edit/'+id);
      }
      else if(!user){
        res.view('users/edit/'+id);  
    }
      else{
        res.redirect('users/view/'+id);
      }
    });
  },

  destroy: function (req, res) {
    var id= req.params.id;
    Users.destroy(id).exec(function(err,user){
      res.redirect('/');
    });
  }
  
};