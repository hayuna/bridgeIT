import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

class User {
    static getUserById(userId) {
        return this.findOne({ _id: Mongoose.mongo.ObjectID(userId) }).exec();
    }
    
    static getAllUsers() {
        return this.findOne({}).exec();
    }

    static insertUser(username, email) {
        const user = this({
            username,
            email
        });
        return user.save();
    }
}

userSchema.loadClass(User);
export default mongoose.model('User', userSchema);