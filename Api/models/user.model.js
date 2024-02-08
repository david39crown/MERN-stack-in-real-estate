import mongoose from 'mongoose'

const userSchema=new mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true,
            unique:true,
        },
       email:
        {
            type:String,
            required:true,
            unique:true,
        },
        password:
        {
            type:String,
            required:true,
            
        },
        avatar:
        {
            type:String,
            default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dreamstime.com%2Fdefault-avatar-profile-icon-vector-social-media-user-image-image182145777&psig=AOvVaw1iCnDzAdQGxXxhPB_gqgYe&ust=1707355812179000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNCh4Z_AmYQDFQAAAAAdAAAAABAE'
        }
    },{timestamps : true }
)
const User= mongoose.model('user',userSchema)

export default User