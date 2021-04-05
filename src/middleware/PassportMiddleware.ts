import { IUser } from "../interfaces/IUser";
import passport from "passport";

var key = require("../config/key");
var LocalStrategy = require("passport-local").Strategy;
var GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
var FacebookStrategy = require("passport-facebook").Strategy;

var User = require("../models/user");

export default function () {
  passport.serializeUser(function (user: any, done: any) {
    done(null, user.id);
  });
  passport.deserializeUser(function (id: string, done: any) {
    User.findById(id, function (err: any, user: any) {
      done(err, user);
    });
  });

  passport.use(
    new LocalStrategy(function (username: string, password: string, done: any) {
      User.findOne(
        { username: new RegExp(username, "i"), socialId: null },
        function (err: any, user: IUser) {
          if (err) {
            return done(err);
          }

          if (!user) {
            return done(null, false, {
              message: "Incorrect username or password.",
            });
          }
          //   user.validatePassword(password, function (err, isMatch) {
          //     if (err) {
          //       return done(err);
          //     }
          //     if (!isMatch) {
          //       return done(null, false, {
          //         message: "Incorrect username or password.",
          //       });
          //     }
          //     return done(null, user);
          //   });
        }
      );
    })
  );

  passport.use( 
    new GoogleStrategy(
      {
        consumerKey: key.GOOGLE.clientID,
        consumerSecret: key.GOOGLE.clientSecret,
        callbackURL: "/auth/google/callback",
      },
      function (token: any, tokenSecret: string, profile: any, done: any) {
        console.log(profile);
        User.findOrCreate(
          { "google.id": profile.id },
          function (err: any, user: any) {
            return done(err, user);
          }
        );
      }
    )
  );
  passport.use(
    new FacebookStrategy(
      {
        clientID: key.FACEBOOK.clientID,
        clientSecret: key.FACEBOOK.clientSecret,
        callbackURL: "auth/facebook/callback",
      },
      function (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ) {
        User.findOrCreate(
          { facebokId: profile.id },
          function (err: any, user: IUser) {
            if (err) {
              return done(err);
            }
            done(null, user);
          }
        );
      }
    )
  );

  return passport;
}
