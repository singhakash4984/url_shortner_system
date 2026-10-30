import { Router } from "express";
import urlRouter from "../modules/url/url.route.js";
import authRouter from "../modules/auth/auth.route.js";
import userRouter from "../modules/user/user.route.js";



const router = Router() ;

router.use('/auth', authRouter) ;
router.use('/user', userRouter) ;
router.use('/url', urlRouter) ;
router.get('/',(_req,res)=>{
    res.status(200).json({
        success: true,
        message: "Ok"
    })
})

export default router ;