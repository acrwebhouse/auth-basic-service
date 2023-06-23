const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const collectionName = config.mongoDBCollection.accessTokenCollection;
const refreshTokenCollection = config.mongoDBCollection.refreshTokenCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const accessTokenTime = config.accessTokenTime

const accessTokenDoc = {
    token : '',
    userId : '',
    devices : 0 ,
    refreshTokenId : '',
    exp : '',
    iat : ''
    // createTime:
    // updateTime:
}

function newAccessTokenDoc(){
    const doc = JSON.parse(JSON.stringify(accessTokenDoc))
    const date = new Date();
    doc.exp = new Date(date.getTime()+accessTokenTime).getTime();
    doc.iat = date.getTime()
    doc.updateTime = date;
    return doc;
}

function addAccessToken(token,userId,devices,refreshTokenId,exp,iat,callback) {
    const doc = newAccessTokenDoc()
    doc.token = token
    doc.userId = ObjectId(userId)
    doc.devices = devices
    doc.refreshTokenId = ObjectId(refreshTokenId)
    doc.exp = exp
    doc.iat = iat
    mongoDB.insert(collectionName, doc, callback);
}

function removeAccessToken(ids,callback){
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

function getAccessTokens(token,userId,devices,refreshTokenId,exp,iat,callback){
    const queryInfos = {}
    if(utilsValue.isValid(token)){
        queryInfos.token = token
    }
    if(utilsValue.isValid(userId)){
        queryInfos.userId = ObjectId(userId)
    }
    if(utilsValue.isValid(devices)){
        let devicesArr = [];
        if(utilsValue.isValid(devices) && devices.indexOf(',')>0){
            devicesArr = devices.split(',')
        }else if(utilsValue.isValid(devices)){
            devicesArr = [devices]
        }
        if(devicesArr.length > 0){
            for(let i = 0 ;i<devicesArr.length;i++){
                devicesArr[i] = devicesArr[i]*1
            }
            queryInfos.devices = { $in: devicesArr}
        }
    }
    if(utilsValue.isValid(refreshTokenId)){
        queryInfos.refreshTokenId = ObjectId(refreshTokenId)
    }
    if(utilsValue.isValid(exp)){
        queryInfos.exp = exp
    }
    if(utilsValue.isValid(iat)){
        queryInfos.iat = iat
    }
    const lookup =
    {
        from: refreshTokenCollection,
        localField : 'refreshTokenId',
        foreignField : '_id',
        as: 'refreshTokenData',
    }
    mongoDB.queryJoinCollectionList(collectionName,lookup,queryInfos,0,9999999, {updateTime:-1} , (result, msg) => {
        callback(result, msg);
    })
}

function removeAccessTokenByUserId(userId,callback){
    if(userId.length==24){
        const searchDoc = {
            'userId': ObjectId(userId)
        }
        mongoDB.remove(collectionName, searchDoc, callback)
    }else{
        callback(false, 'userId is invalid')
    }
}

exports.addAccessToken = addAccessToken
exports.removeAccessToken = removeAccessToken
exports.getAccessTokens = getAccessTokens
exports.removeAccessTokenByUserId = removeAccessTokenByUserId
