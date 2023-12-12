const passport = require('passport');
const local = require('passport-local');
const jwt = require('passport-jwt');

const { usersService} = require('../repositories/index.js');
const { createHash, isValidPassword } = require('../helpers/Encrypt.js');
const { SECRET_KEY } = require('../config/config.js');
const { generateUserErrorInfo } = require('../services/errors/info.js');
const { CustomError } = require('../services/errors/customError.js');
const { EErrors } = require('../services/errors/enums.js');

const localStrategy = local.Strategy;
const JwtStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use('register', new localStrategy(

        { passReqToCallback: true, usernameField: "email" }, async (req, username, password, done) => {

            const { firstName, lastName, email, age, rol } = req.body
            
            if (!firstName || !lastName || !email || !age || !rol) {
                CustomError({
                    name:'User creation error',
                    cause: generateUserErrorInfo({firstName, lastName, email, age, rol}),
                    messsagge: 'Error trying to create user',
                    code: EErrors.INVALID_TYPES_ERROR
                })
            }

            try {
                let user = await  usersService.getUserByEmail(email)
                if (user) {
                    console.log("El usuario ya existe")
                    return done(null, false)
                }
                const newUser = {
                    firstName,
                    lastName,
                    email,
                    age,
                    password: createHash(password),
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
        let user = await usersService.getUserById(id);
        done(null, user);
    });

    passport.use('login', new localStrategy({ usernameField: "email" }, async (username, password, done) => {

        try {
            const user = await usersService.validateUser(username)
            if (!user) {
                console.log("El usuario no existe")
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                return done(null, false)
            }
            return done(null, user)
            
        } catch (error) {
            return done(error) 
        }
    }))

    const jwtOptions = {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY
    }

    new JwtStrategy(jwtOptions, (jwt_payload, done) => {
        const user = usersService.getUserByEmail((user) => user.email === jwt_payload.email)
        if (!user) { return done(null, false, { message: "Usuario no encontrado" }) }
        return done(null, user)
    })

    const cookieExtractor = req => {
        let token = null;
        if (req && req.cookies) {
            token = req.cookies["token"]
        }
        return token
    }
    
    passport.use("jwt", new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: SECRET_KEY,
    }, async(jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error)
        }
    }))
    
}

const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if (err) return next(err)
            if (!user) {
                return res.status(401).send({ error: info.messages ? info.messages : info.toString() })
            }
            req.user = user
            next()
        })(req, res, next)
    }
}

const authorization = (role) => {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send({ error: "Unauthorized" })
        if(req.user.rol != role) return res.status(403).send({ error: "No permissions" })
        next()
    }
}

module.exports =  { 
    initializePassport, 
    passportCall, 
    authorization 
}