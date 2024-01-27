import dotenv from "dotenv"
import  express  from "express"
import mongoose from "mongoose"
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config()

const app=express()
app.use(express.json()) ///json of the input of the server 

mongoose.connect(process.env.MONGO).then(()=>
{
    console.log("connected successFully ")
})
.catch((err)=>
{
    console.log(err)
})


app.listen(3000,()=>{
    console.log('port is running on 3000')
})

app.use('/Api/user',userRouter)
app.use('/Api/auth',authRouter)

app.use((err,req,res,next)=>
{
    const statusCode=err.statusCode||500
    const message=err.message||'Internal server error'
    return res.status(statusCode).json(
        {
            success:false,
            statusCode ,
            message
        }
    )
})