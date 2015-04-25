var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
    authID: String,
    username: String, //{ type: String, index: { unique: true }},
    password: String,
    email: { type: String, unique: true, lowercase: true }
});

userSchema.pre('save', function(next){
    var user = this;
    
    if(!user.isModified('password')) { return next(); }
 
    //Specifying a number automatically generates a salt. No need for genSalt()
    bcrypt.hash(user.password, 10, function(err, hash){
        if(err){ return next(err); }
        
        user.password = hash;
        next();
    });
});

//Method to compare passwords for login
userSchema.methods.comparePassword = function(candidate, cb){ 
    bcrypt.compare(candidate, this.password, cb);
};

userSchema.statics.findByUsername = function(username, callback){
    this.findOne({ username: { $regex : username, $options: 'i' }}, callback);
};

module.exports = mongoose.model('User', userSchema);