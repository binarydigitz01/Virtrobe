import { Router } from 'express';

import Paths from '../common/Paths';
import {register, login} from '../repos/SqlRepo';

// **** Variables **** //

const apiRouter = Router();

apiRouter.post("/register",(req,res)=>{
  console.log(req.body);
  try{
    // username: String = req.body.username;
    // password: String = req.body.password;
    // email: String = req.body.email;
    // gender: String = req.body.gender;
    // sa: String = req.body.sa;
    register(req.body.username,req.body.email,req.body.password, req.body.gender, req.body.sa);
    let uuid = login(req.body.username, req.body.password);
    res.json({uuid}).status(200);
  } catch(e){
    res.sendStatus(400);
  }
})

apiRouter.post("/login",(req,res)=>{
  try {
    let uuid = login(req.body.username, req.body.password);
    res.json({uuid});
  }catch(e){
    res.status(400);
    res.send("Invalid Login Data!");
  }
})
// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);


// **** Export default **** //

export default apiRouter;
