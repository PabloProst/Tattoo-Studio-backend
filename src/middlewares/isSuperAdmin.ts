import { NextFunction, Response } from "express";


const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {
  
  if (req.token && req.token.role === "superadmin") {
   
    next();
  } else {
    return res.json(`You are not the boss`);
  }
}

export { isSuperAdmin }