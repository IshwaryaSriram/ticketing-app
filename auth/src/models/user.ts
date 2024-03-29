import mongoose from "mongoose";
import { Password } from "../services/password";

interface UserSchemaInterface {
    email: string,
    password: string
}

interface UserModel extends mongoose.Model<UserDocument> {
    build(attrs: UserSchemaInterface) : UserDocument;
}

interface UserDocument extends mongoose.Document {
    email: string, password: string
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(done) {
    if( this.isModified('password')) {
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed);
    }
    done();
})

userSchema.statics.build = (user: UserSchemaInterface) => {
    return new User(user);
};

const User = mongoose.model<UserDocument, UserModel>('User', userSchema);


export { User };