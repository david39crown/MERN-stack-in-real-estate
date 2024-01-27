import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup=async(req,res,next)=>
{
    const{ username, email,password }=req.body
    const hashPassword=bcryptjs.hashSync(password,10)
    const newUser=new User({username,email,password:hashPassword})
            try 
            {        
                    await newUser.save()
                    res.status(201).json('User created succesfully!!!!') ///201 somethig is created in server
                
            }
             catch (error) 
            {
                next(error)
            }
}

//npm i bcryptjs --for  password hash