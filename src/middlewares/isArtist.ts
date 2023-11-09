import { NextFunction, Response } from "express";


const isArtist = (req: any, res: Response, next: NextFunction) => {
  
  if (req.token && req.token.role === "admin") {
   
    next();
  } else {
    return res.json(`You are not an artist`);
  }
}

export { isArtist }