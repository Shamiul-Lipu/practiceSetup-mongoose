import httpStatus from 'http-status';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // Check if user sent any token or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your are not authoraized!');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { userId, role, iat } = decoded;

    const user = await User.isUserExistsByCustomId(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'User does not exists');
    }

    if (user?.isDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'User is deleted');
    }

    if (user?.status === 'blocked') {
      throw new AppError(httpStatus.NOT_FOUND, 'User is blocked');
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your role does not Authorized for this',
      );
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'Your role does not Authorized for this',
      );
    }

    req.user = decoded;

    next();

    // Check if user sent the verified/right token or not
    //// using call function to verify access token ////
    // jwt.verify(
    //   token,
    //   config.jwt_access_secret as string,
    //   function (err, decoded) {
    //     if (err) {
    //       throw new AppError(
    //         httpStatus.UNAUTHORIZED,
    //         'You are not authorized here!',
    //       );
    //     }

    //     // console.log({ decoded });
    //     const role = (decoded as JwtPayload).role;

    //     if (requiredRoles && !requiredRoles.includes(role)) {
    //       throw new AppError(
    //         httpStatus.UNAUTHORIZED,
    //         'Your role does not Authorized for this',
    //       );
    //     }

    //     req.user = decoded as JwtPayload;
    //   },
    // );
  });
};

export default auth;
