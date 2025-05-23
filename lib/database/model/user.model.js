import {Schema, model, models, Document} from "mongoose";

const UserSchema = new Schema({
     username: {
        type: String,
        required: true
     },
     email: {
        type: String,
        required: true,
        unique: true
     },
     password: {
        type: String,
        required: false,
     }
})

const User = models.User || model('User', UserSchema)

export default User