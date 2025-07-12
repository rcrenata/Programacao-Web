import { Request, Response, NextFunction } from 'express';

export default function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    if (req.session && req.session.uid) { 
        next(); 
    } else {
        req.session.returnTo = req.originalUrl;
        res.redirect('/users/login');
    }
}