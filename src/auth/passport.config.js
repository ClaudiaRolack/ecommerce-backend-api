const passport = require('passport');
const local = require('passport-local');
const jwt = require('passport-jwt');

const { UsersMongo } = require('../dao/mongo/users.mongo.js')

const localStrategy = local.Strategy;
const jwtStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use("/register", new localStrategy(

        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {

            const { firstName, lastName, email, age, rol } = req.body

            try {
                let user = await  UsersMongo.findByEmail({ email: username })
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password,
                    rol
                }
                return done(null, newUser)
            } catch (error) {
                return done("Error al obtener el usuario" + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user);
    });

    passport.deserializeUser(async (id, done) => {
        let user = await userModel.findById(id);
        done(null, user);
    });

    // passport.use("login", new localStrategy({ usernameField: "email" }, async (username, password, done) => {

    //     try {
    //         const user = await userModel.findOne({ email: username })
    //         if (!user) {
    //             console.log("El usuario no existe")
    //             return done(null, false)
    //         }
    //         if (!isValidPassword(user, password)) {
    //             return done(null, false)
    //         }
    //         return done(null, user)
    //     } catch (error) {
    //         return done(error)
    //     }
    // }))

    // const jwtOptions = {
    //     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    //     secretOrKey: "Secret-key"
    // }

    // new JwtStrategy(jwtOptions, (jwt_payload, done) => {
    //     const user = userModel.find((user) => user.email === jwt_payload.email)

    //     if (!user) {
    //         return done(null, false, { message: "Usuario no encontrado" })
    //     }

    //     return done(null, user)
    // })

}

// const cookieExtractor = req => {
//     let token = null;
//     if (req && req.cookies) {
//         token = req.cookies["token"]
//     }
//     return token
// }

// passport.use("jwt", new jwtStrategy({
//     jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
//     secretOrKey: "Secret-key",
// }, async(jwt_payload, done) => {
//     try {

//         return done(null, jwt_payload);
//     } catch (error) {
//         return done(error)
//     }
// }))


module.exports =  { initializePassport }