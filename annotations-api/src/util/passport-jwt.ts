import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import prisma from "../db/prisma";
import { PassportStatic } from "passport";
import dotenv from "dotenv";
import { Request } from "express";
dotenv.config();

const cookieExtractor = (req: Request) => {
  var token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

// IT REVICES THE PASSPORT INSTANCE AS PARAMETER SO THAT WE ARE EDITING THE SAME INSTANCE
const initPassportJwt = (passport: PassportStatic) => {
  var opts: StrategyOptions = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET!,
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email: jwt_payload.email } });

        if (user) {
          const { password, ...userNew } = user;
          return done(null, userNew);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    })
  );
};
export default initPassportJwt;
