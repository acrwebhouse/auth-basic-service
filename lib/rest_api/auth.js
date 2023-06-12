exports.on = function(app) {
    const preRestApi = '/auth';
    const accessToken = require('../role/accessToken');
    const refreshToken = require('../role/refreshToken');
    const utilsValue = require('../utils/value');

    app.post(preRestApi + '/addAccessToken', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a access token',
            schema: {
                token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTEyNmQyNGFiYWZiMGZhNjY3NzdlZSIsImVtcGxveWVlcyI6eyJjb21wYW55SWQiOiI2M2UxMjZkMjRhYmFmYjBmYTY2Nzc3MTEiLCJyYW5rIjo1LCJzdGF0ZSI6Mn0sInJvbGVzIjpbNCwyLDNdLCJleHAiOiIyMDIzLTA1LTMxVDE1OjU4OjU3LjMzN1oiLCJpYXQiOiIyMDIzLTA1LTMxVDE0OjU4OjU3LjMzN1oifQ.-D11eiJ0Q755leXba6NvNz8VHc4XnlFg_gWUt2_h0Hg',
                userId: '63e126d24abafb0fa66777ee',
                devices: 1 ,
                refreshTokenId: '63e126d24abafb0fa6677722',
                exp:'',
                iat:''
            }
        }*/ 

        
        const token = req.body.token
        const userId = req.body.userId
        const devices = req.body.devices
        const refreshTokenId = req.body.refreshTokenId
        const exp = req.body.exp
        const iat = req.body.iat
        const response = {
            'status':true,
            'data':''
        }
        accessToken.addAccessToken(token,userId,devices,refreshTokenId,exp,iat,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
    });

    app.get(preRestApi + '/getAccessTokens', function(req, res) {
        const userId = req.query.userId
        const token = req.query.token
        const devices = req.query.devices
        const exp = req.query.exp
        const iat = req.query.iat
        const refreshTokenId = req.query.refreshTokenId
        const response = {
             'status':true,
             'data':''
         }
         accessToken.getAccessTokens(token,userId,devices,refreshTokenId,exp,iat,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
     });

    app.delete(preRestApi + '/removeAccessTokens', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a access tokens',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        accessToken.removeAccessToken(ids,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
    });

    app.post(preRestApi + '/addRefreshToken', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a refresh token',
            schema: {
                userId: '63e126d24abafb0fa66777ee',
                devices: 1 ,
            }
        }*/ 

        const userId = req.body.userId
        const devices = req.body.devices
        const response = {
            'status':true,
            'data':''
        }
        refreshToken.addRefreshToken(userId,devices,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
    });

    app.get(preRestApi + '/getRefreshTokens', function(req, res) {
        const userId = req.query.userId
        const devices = req.query.devices
        const exp = req.query.exp
        const iat = req.query.iat
        const response = {
             'status':true,
             'data':''
         }
         refreshToken.getRefreshTokens(userId,devices,exp,iat,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
     });

    app.delete(preRestApi + '/removeRefreshTokens', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a refresh tokens',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        refreshToken.removeRefreshToken(ids,(result,data)=>{
            response.result = result;
            response.data = data;
            res.send(response)
        });
    }); 

}