import { Router } from 'express';

import Paths from '../common/Paths';
import {register, login, fetchUser, like, fetchOutfit, db} from '../repos/SqlRepo';
import { spawn } from 'child_process';

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

apiRouter.post("/like",(req,res)=>{
  console.log(`/like: ${req.body.userToken} ${req.body.outfit}`)
  let user = fetchUser(req.body.userToken);
  console.log(`/like: ${JSON.stringify(user)}`)
  let outfit = fetchOutfit(req.body.outfit);
  console.log(outfit);
  like(user,outfit);
})

apiRouter.get("/chatbot",(req,res)=>{
  let user: any;
    db.serialize(() => {
      db.get("select ID from authentication where token=?", req.query.token, (err, res: any) => {
      console.log(`fetchUser: ${JSON.stringify(res)}`)
      db.get("select * from users where ID=?", res.ID, (err, res2) => {
        if (err) {
          console.log(err);
          throw new Error("Invalid ID");
        }
        if (res) {
          console.log(`fetchUser2: ${JSON.stringify(res2)}`);
          user = res2;
        }
      });

    })
    })
  let proc = spawn("python", ["../AI/app.py"]);
  proc.stdin.write(req.query.data+"\n");
  proc.stdin.end();
  proc.stdout.on('data',(data: Buffer)=>{
    if(res)
      res.json(data.toString());
  })
  proc.stderr.on('data',(data: Buffer)=>{
    console.log(data.toString());
  })

})
// ** Add UserRouter ** //

// Init router
const userRouter = Router();

// Get all users
// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);
// **** Export default **** //

export default apiRouter;
