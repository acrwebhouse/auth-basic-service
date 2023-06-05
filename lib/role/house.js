const mongoDB = require('../db/mongoDB');
const config = require('../setting/config').config;
const utilsValue = require('../utils/value');
const path = require('path');
const collectionName = config.mongoDBCollection.houseCollection;
const { ObjectId } = require('mongodb'); // or ObjectID 
const houseDoc = {
    name:'',
    city:'',
    area:'',
    owner: null,
    address:'',
    houseNumber:{},
    totalFloor : 0 , 
    floor:0,
    floor2: null,
    room:'0000',
    price:0,
    hostName:'',
    hostPhone:'',
    hostGender:true,
    config:{
        room:0,
        livingRoom:0,
        balcony:0,
        bathroom:0,
        buildingType:0
    },
    ping:0,
    parking:false,
    traffic:[],
    life:[],
    educate:[],
    saleType:0,
    saleInfo:{},
    photo:[],
    annex:[],
    remark:'',
    belongType:0,
    belongId:null,
    isRoofAnnex:false,
    transactionId : '',
    creator:null,
    isDelete:false,
    // createTime:
    // updateTime:
}
const transactionCollection = config.mongoDBCollection.transactionCollection;

function newHouseDoc(){
    const doc = JSON.parse(JSON.stringify(houseDoc))
    const date = new Date();
    doc.createTime = date;
    doc.updateTime = date;
    return doc;
}

function addHouse(name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,callback) {
    if (utilsValue.isValid(address)){
        //阻擋相同地址不讓新增
        const queryDoc = {
            address,
            houseNumber,
            floor,
            floor2,
            room,
            isRoofAnnex,
            'isDelete' : false
        }

        mongoDB.queryFindOne(collectionName, queryDoc, (result,data)=>{
            if(result){
                if(utilsValue.isValid(data)){
                    callback(false,'house address is exist:'+data._id)
                }else{
                    const doc = newHouseDoc()
                    doc.name = name
                    doc.city = city
                    doc.area = area
                    doc.owner = ObjectId(owner)
                    doc.address = address
                    doc.houseNumber = houseNumber
                    doc.floor = floor
                    doc.room = room
                    doc.price = price*1
                    doc.config = config
                    doc.ping = ping*1
                    doc.parking = parking
                    doc.traffic = traffic
                    doc.life = life
                    doc.educate = educate
                    doc.saleType = saleType
                    doc.saleInfo = saleInfo
                    doc.photo = photo
                    doc.annex = annex
                    doc.remark = remark
                    doc.hostName = hostName
                    doc.hostPhone = hostPhone
                    doc.hostGender = hostGender
                    doc.isRoofAnnex = isRoofAnnex
                    doc.creator = ObjectId(owner)
                    if(utilsValue.isValid(totalFloor)){
                        doc.totalFloor = totalFloor
                    }
                    if(utilsValue.isValid(floor2)){
                        doc.floor2 = floor2
                    }
                    if(utilsValue.isValid(belongType)){
                        doc.belongType = belongType
                    }
                    if(utilsValue.isValid(belongId)){
                        doc.belongId = ObjectId(belongId)
                    }
                    mongoDB.insert(collectionName, doc, callback);
                }
            }else{
                callback(false,'db query error')
            }
        })
    }else {
        callback(false, 'address invalid')
    }
}

function removeHouse(ids,callback){
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
        const updateData = {
            isDelete:true,
            updateTime: new Date()
        }
        mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
            if(result && data.nModified>0){
                callback(true,data)
            }else{
                callback(false,data)
            }
        });
    }else{
        callback(false, 'ids is invalid')
    }
}

function editHouse(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,transactionId, callback) {
    
    const queryDoc = {
        address,
        houseNumber,
        floor,
        floor2,
        room,
        isRoofAnnex,
        'isDelete' : false
    }
    mongoDB.queryFindOne(collectionName, queryDoc, (result,data)=>{
        if(result){
            if(utilsValue.isValid(data) && data._id === id){
                callback(false,'house address is exist:'+data._id)
            }else{
                if (id.length == 24){
                    const updateData = {
                        name,
                        city,
                        area,
                        owner:ObjectId(owner),
                        address,
                        houseNumber,
                        totalFloor,
                        floor,
                        floor2,
                        room,
                        price,
                        hostName,
                        hostPhone,
                        hostGender,
                        config,
                        ping,
                        parking,
                        traffic,
                        life,
                        educate,
                        saleType,
                        saleInfo,
                        photo,
                        annex,
                        remark,
                        belongType,
                        belongId:ObjectId(belongId),
                        isRoofAnnex,
                        transactionId:ObjectId(transactionId),
                        updateTime: new Date()
                    }
                    const searchDoc = {
                        '_id': ObjectId(id)
                    }
                    mongoDB.update(collectionName, searchDoc, updateData, (result,data)=>{
                        if(result && data.nModified>0){
                            callback(true,data)
                        }else{
                            callback(false,data)
                        }
                    });
            
                }else{
                    callback(false, 'id or accout invalid')
                }
            }
        }else{
            callback(false,'db query error')
        }
    })
    
    
    
    
}

function editHousesNoCheckUniqueAddress(searchDoc,updateData, callback) {

    if(utilsValue.isValid(searchDoc._id)){
        searchDoc._id = ObjectId(searchDoc._id)
    }

    if(utilsValue.isValid(searchDoc.owner)){
        searchDoc.owner = ObjectId(searchDoc.owner)
    }

    if(utilsValue.isValid(searchDoc.belongId)){
        searchDoc.belongId = ObjectId(searchDoc.belongId)
    }

    if(utilsValue.isValid(updateData.owner)){
        updateData.owner = ObjectId(updateData.owner)
    }

    if(utilsValue.isValid(updateData.belongId)){
        updateData.belongId = ObjectId(updateData.belongId)
    }

    mongoDB.updateMany(collectionName, searchDoc, updateData, (result,data)=>{
        if(result && data.nModified>0){
            callback(true,data)
        }else{
            callback(false,data)
        }
    });    
}


function getHouseListQueryInfos(isDelete,ownerArray,creatorArray,city,area,minFloor,maxFloor,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,buildingType,typeOfRental,parking,pet,manager,garbage,smoke,cook,belongType,belongId,textQuery,minCreateTime,maxCreateTime){
    const queryInfo = {
        isDelete
    }

    let queryInfos = []
    
    for(let i = 0 ;i<ownerArray.length;i++){
        ownerArray[i] = ObjectId(ownerArray[i])
    }
    if(ownerArray.length > 0){
        const searchOwner = {}
        searchOwner['$in'] = ownerArray
        queryInfo.owner = searchOwner
    }

    for(let i = 0 ;i<creatorArray.length;i++){
        creatorArray[i] = ObjectId(creatorArray[i])
    }
    if(creatorArray.length > 0){
        const searchCreator = {}
        searchCreator['$in'] = creatorArray
        queryInfo.creator = searchCreator
    }

    if(utilsValue.isValid(city)){
        queryInfo.city = city
    }

    if(utilsValue.isValid(area)){
        queryInfo.area = area
    }

    if(utilsValue.isNumber(minFloor) && utilsValue.isNumber(maxFloor)){
        queryInfo.floor = {
            $lte : maxFloor,
            $gte : minFloor
        }
    }
    
    if(utilsValue.isNumber(minPrice) && utilsValue.isNumber(maxPrice)){
        queryInfo.price = {
            $lte : maxPrice,
            $gte : minPrice
        }
    }

    if(utilsValue.isNumber(minPing) && utilsValue.isNumber(maxPing)){
        queryInfo.ping = {
            $lte : maxPing,
            $gte : minPing
        }
    }

    if(utilsValue.isNumber(minRoom) && utilsValue.isNumber(maxRoom)){
        queryInfo['config.room'] = {
            $lte : maxRoom,
            $gte : minRoom
        }
    }
    
    if(utilsValue.isNumber(buildingType)){
        queryInfo['config.buildingType'] = buildingType
    }

    if(utilsValue.isNumber(typeOfRental)){
        queryInfo['saleInfo.typeOfRental'] = typeOfRental
    }

    if(utilsValue.isTrueStr(parking)){
        queryInfo.parking = true
    }

    if(utilsValue.isTrueStr(pet)){
        queryInfo['saleInfo.pet'] = true
    }

    if(utilsValue.isTrueStr(manager)){
        queryInfo['saleInfo.manager'] = true
    }

    if(utilsValue.isTrueStr(garbage)){
        queryInfo['saleInfo.garbage'] = true
    }

    if(utilsValue.isTrueStr(smoke)){
        queryInfo['saleInfo.smoke'] = true
    }

    if(utilsValue.isTrueStr(cook)){
        queryInfo['saleInfo.cook'] = true
    }
    
    if(utilsValue.isValid(belongType)){
        queryInfo.belongType = belongType*1
    }

    if(utilsValue.isValid(belongId)){
        queryInfo.belongId = ObjectId(belongId)
    }

    if(utilsValue.isValid(minCreateTime) && utilsValue.isValid(maxCreateTime) ){
        queryInfo.createTime = {
            $gte: getSaveDate(minCreateTime),
            $lte: getSaveDate(maxCreateTime),
        }
    }

    if(utilsValue.isValid(textQuery)){
        const textQueryExp = []
        const queryAddress = {'address':new RegExp(textQuery),isDelete}
        const queryTraffic = {isDelete}
        queryTraffic['traffic.name'] = new RegExp(textQuery)
        const queryLife = {isDelete}
        queryLife['life.name'] = new RegExp(textQuery)
        const queryEducate = {isDelete}
        queryEducate['educate.name'] = new RegExp(textQuery)
        textQueryExp.push(queryAddress)
        textQueryExp.push(queryTraffic)
        textQueryExp.push(queryLife)
        textQueryExp.push(queryEducate)
        const textQueryObj = { '$or' : textQueryExp}
        queryInfos = {'$and':[queryInfo,textQueryObj]}
    }else{
        queryInfos = queryInfo
    }
    return queryInfos;
}

function getHouseList(queryInfos,skip,limit,sort,isShowTransaction,callback){
    const maxLimit = 300

    if (!utilsValue.isNumber(skip)){
        skip = 0;
    }
    if (!utilsValue.isNumber(limit)){
        limit = maxLimit;
    }
    if (!utilsValue.isValid(sort)){
        sort = {updateTime:-1}
    }
    if(isShowTransaction === true){
        const lookup =
        {
            from: transactionCollection,
            localField : 'transactionId',
            foreignField : '_id',
            as: 'transactionData',
        }
        mongoDB.queryJoinCollectionList(collectionName,lookup,queryInfos,skip,limit, sort , (result, msg) => {
            callback(result, msg);
        })
    }else{
        mongoDB.queryFindAll(collectionName, queryInfos , skip, limit, sort ,(result, msg) => {
            callback(result, msg);
        })
    }
}

function getHouse(id,isDelete,callback){
    if(isDelete == 'true'){
        isDelete = true
    }
    if(isDelete == 'false'){
        isDelete = false
    }
    const queryInfo = {
        isDelete,
        '_id':ObjectId(id)
    }
    mongoDB.queryFindOne(collectionName, queryInfo, (result, msg) => {
        callback(result, msg);
    })
}

//sample time : 2022/10/11
function getSaveDate(time){
    let result = new Date()
    if(utilsValue.isValid(time)){
        const calcu = time.split('/')
        if(calcu.length == 3){
            result.setFullYear(calcu[0], calcu[1]-1, calcu[2]);
            result.setHours(8, 0, 0);
        }
    }
    return result
}

exports.addHouse = addHouse
exports.editHouse = editHouse
exports.editHousesNoCheckUniqueAddress = editHousesNoCheckUniqueAddress
exports.removeHouse = removeHouse
exports.getHouseList = getHouseList
exports.getHouse = getHouse
exports.getHouseListQueryInfos = getHouseListQueryInfos