require('dotenv').config()
exports.config = {
    'serverIp':process.env.SERVER_IP || '127.0.0.1',
    'serverPort': process.env.SERVER_PORT || 23000,
    'mongoDBUri': process.env.DB_URI || '',
    'swaggerIp':process.env.SWAGGER_IP || '127.0.0.1',
    'mongoDBName': 'ACR',
    'mongoDBCollection': {
        'accessTokenCollection': 'accessToken',
        'refreshTokenCollection': 'refreshToken',
    },
    accessTokenTime : 3600000, // 1 h
    refreshTokenTime : 604800000, // 7 d
}