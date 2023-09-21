import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import prisma from "../db/prisma";
import { PassportStatic } from "passport";

// IT REVICES THE PASSPORT INSTANCE AS PARAMETER SO THAT WE ARE EDITING THE SAME INSTANCE
const initPassportJwt = (passport: PassportStatic) => {
  var opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET!,
  };
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      console.log(jwt_payload);

      try {
        const user = await prisma.user.findUnique({ where: { email: jwt_payload.email } });

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        if (error) {
          return done(error, false);
        }
      }
    })
  );
};
export default initPassportJwt;
