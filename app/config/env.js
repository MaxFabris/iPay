var env = {
    development: {
        express: {
            port: 12345
        },
        db: {
            host: 'mongodb://localhost/iPay'
        },
        auth: {
            secret: 'fdjklslkdjhskljhsdfkljhdfkljgfldkj'
        }
    },
    testing: {
        express: {
            port: 12345
        },
        db: {
            host: 'mongodb://localhost/iPay'
        },
        auth: {
            secret: 'fdjklslkdjhskljhsdfkljhdfkljgfldkj'
        }
    },
    production: {
        express: {
            port: 12345
        },
        db: {
            host: 'mongodb://localhost/iPay'
        },
        auth: {
            secret: 'fdjklslkdjhskljhsdfkljhdfkljgfldkj'
        }
    }
}

module.exports = env[process.env.NODE_ENV || 'development'];
