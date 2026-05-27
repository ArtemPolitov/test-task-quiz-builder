import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';


export default function errorHandler (err:any,req:Request,res:Response,next:NextFunction) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: err.issues.map(err => ({
        path: err.path,
        message: err.message
      }))
    });
  }

  console.error('--- INTERNAL SERVER ERROR ---');
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Server error';
  
  res.status(status).json({
    success: false, 
    message: message,
  });
}