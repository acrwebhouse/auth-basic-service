const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const collectionName = config.mongoDBCollection.refreshTokenCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const refreshTokenTime = config.refreshTokenTime

const refreshTokenDoc = {
    userId : '',
    devices : 0 ,
    exp : '',
    iat : ''
    // createTime:
    // updateTime:
}

function newRefreshTokenDoc(){
    const doc = JSON.parse(JSON.stringify(refreshTokenDoc))
    const date = new Date();
    doc.exp = date+refreshTokenTime;
    doc.iat = date
    doc.updateTime = date;
    return doc;
}

function addRefreshToken(userId,devices,exp,iat,callback) {
    const doc = newRefreshTokenDoc()
    doc.userId = ObjectId(userId)
    doc.devices = devices
    doc.exp = exp
    doc.iat = iat
    mongoDB.insert(collectionName, doc, callback);
}

function removeRefreshToken(ids,callback){
    let isValid = true;
    for(let i = 0;i<ids.length;i++){
        if(ids[i].length!=24){
            isValid = false;
        }
    }
    if(isValid == true){
        const objectIds = []
        for(let i = 0 ;i<ids.length;i++ ){
            objectIds.push(ObjectId(ids[i]))
        }
        const searchDoc = {
            '_id': {$in : objectIds}
        }
        mongoDB.remove(collectionName, searchDoc, callback)
    }else{
        callback(false, 'ids is invalid')
    }
}

function getRefreshTokens(userId,devices,exp,iat,callback){
    const queryInfos = {}
    if(utilsValue.isValid(userId)){
        queryInfos.userId = ObjectId(userId)
    }
    if(utilsValue.isValid(devices)){
        queryInfos.devices = devices
    }
    if(utilsValue.isValid(exp)){
        queryInfos.exp = exp
    }
    if(utilsValue.isValid(iat)){
        queryInfos.iat = iat
    }
    mongoDB.queryFindAll(collectionName, queryInfos , 0, 9999999, {updateTime:-1} ,(result, msg) => {
        callback(result, msg);
    })
}

exports.addRefreshToken = addRefreshToken
exports.removeRefreshToken = removeRefreshToken
exports.getRefreshTokens = getRefreshTokens