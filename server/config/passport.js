// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// require('dotenv').config();

// module.exports = function(passport) {
//   passport.use(
//     new GoogleStrategy(
//       {
//         clientID:
//           '343873122331-554k1urv7koadivfqikh0v8dgjedntdk.apps.googleusercontent.com',
//         clientSecret: 'mS3Ul1n4bY8HhkTEZb5f0dB0',
//         callbackURL: 'login/callback'
//       },
//       function(accessToken, refreshToken, profile, done) {
//         console.log('accessToken', accessToken);
//         console.log('refreshToken', refreshToken);
//         console.log('profile', profile);
//         return done('', '');
//       }
//     )
//   );

//   //   passport.serializeUser((user, done) => {
//   //     done(null, user.user_id);
//   //   });

//   //   passport.deserializeUser((id, done) => {
//   //     userModel.findUserById(id).then(rows => {
//   //       done(null, rows[0]);
//   //     });
//   //   });
// };
