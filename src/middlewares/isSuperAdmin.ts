import { NextFunction, Request, Response } from "express";

const isSuperAdmin = (req: any, res: Response, next: NextFunction) => {
    if (!req.token || req.token.role !== "superadmin") {
      return res.json(`You are not the boss`)
    }
  
    next();
  }
  
  export { isSuperAdmin }
  