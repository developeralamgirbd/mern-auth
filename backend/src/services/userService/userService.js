const User = require('../../models/User');
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.registerService = async(userData)=>{
	const user = new User(userData);
	await user.save();
	return user;
};


exports.getUserByEmailService = async (email)=>{
	const user = await User.aggregate(  [
		{$match: {email } }
	] );
	return user[0]
};



exports.passwordUpdateService = async (email, hashPassword)=>{
	const result = await User.updateOne(
		{email: email},
		{$set: {
				password: hashPassword
			}}
	);
	return result;
}

exports.userProfileUpdateService = async (_id, firstName, lastName)=>{
	 const result = await User.updateOne({_id: ObjectId(_id)}, {$set: {
			 firstName,
			 lastName,
		 }}, {runValidators: true});

	 return result;
}




