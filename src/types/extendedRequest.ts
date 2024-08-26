import { Express,Request,Response } from "express";

// Extend the Express Request interface
export interface ExtendedReq extends Request {
    user?: {
      _id: any;
      // add other user properties
    };
  }