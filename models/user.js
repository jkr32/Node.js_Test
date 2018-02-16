var mongoose = require ('mongoose');
var bcrypt = require ('bcrypt-node.js');
var Scheme = mongoose.Schema;

// The user schema attributes / characteristics / fields
var UserSchema = new mongoose.Schema ({
  email: { type: String, unique; true, lowercase: true},
  password: String,

  profile: {
    name { type: String, default: ''},
    picture: { type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: { type: Number, default: 0},
    //item: ( type: Schema.Types.ObjectId, ref: '')
  }]
});

//Hash the password before we even save it to the database
UserSchema.pre ('save', function (next) {
  var user = this;
  if (!user.isModified ('paswword')) return next ();
  bcrypt.genSalt (10, function (err, salt) {
    if (err) return next (err);
    bcrypt.hash (user.password, salt, null, function (err, hash) {
      if (err) return next (err);
      user.password = hash;
      next ();
    });
  });
});

//compare password in the database and the one that the user types in
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync (password, this.password);
}
