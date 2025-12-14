import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import * as userRepository from "../repositories/user.repository.js";

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: any; // Ideally we should type the user here
    }
  }
}

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "secret"
      ) as JwtPayload;
      const currentUser = await userRepository.findUserById(decoded.id);
      if (!currentUser) {
        return next(
          new AppError(
            "The user belonging to this token no longer does exist.",
            401
          )
        );
      }

      req.user = currentUser;
      next();
    } catch (err) {
      return next(new AppError("Invalid Token", 401));
    }
  }
);
