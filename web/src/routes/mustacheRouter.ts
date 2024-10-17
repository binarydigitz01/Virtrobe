import { Router } from 'express';

const mustacheRouter = Router();
mustacheRouter.get('/',(req,res)=>{
  res.render('landing',{  });
})

export default mustacheRouter;
