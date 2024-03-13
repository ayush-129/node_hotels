const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const Person = require("./models/person");

passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    try {
      //   console.log("Received Credentials:", USERNAME, password);

      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const isPasswordMatch = await user.comparePassword(password);
      // const isPasswordMatch = user.password === password ? true : false;
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
