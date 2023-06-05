exports.on = function(app) {
    const preRestApi = '/house';
    const house = require('../role/house');
    const utilsValue = require('../utils/value');
    const { ObjectId } = require('mongodb'); // or ObjectID 

    app.post(preRestApi + '/addHouse', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a house',
            schema: {
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                totalFloor:20,
                floor:3,
                floor2:1,
                room:"1001",
                price:6666,
                hostName:"host name",
                hostPhone:"0909636123",
                hostGender:true,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1,
                    devices : [true,false,false,false,true,false,false,false,true,false,false,false,false]
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test',
                belongType:1,
                belongId:'61ed2777f5178ce385654350',
                isRoofAnnex: false
            }
        }*/ 

        
        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const totalFloor = req.body.totalFloor
        const floor = req.body.floor
        const floor2 = req.body.floor2
        const room = req.body.room
        const price = req.body.price
        const config = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const hostName = req.body.hostName
        const hostPhone = req.body.hostPhone
        const hostGender = req.body.hostGender
        const belongType = req.body.belongType
        const belongId = req.body.belongId
        const isRoofAnnex = req.body.isRoofAnnex
        const response = {
            'status':true,
            'data':''
        }
        house.addHouse(name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editHouse', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Edit a house',
            schema: {
                id:'61ed2777f5178ce385654350',
                name:'文山區好房子',
                city:'台北市',
                area:'文山區',
                owner: '61ed2777f5178ce385654350',
                address:'台北市文山區興隆路四段',
                houseNumber:{
                    lane:96,
                    alley:2,
                    number1:5,
                    number2:1
                },
                totalFloor:20,
                floor:3,
                floor2:1,
                room:"1001",
                price:6666,
                hostName:"host name",
                hostPhone:"0909636123",
                hostGender:true,
                config:{
                    room:2,
                    livingRoom:1,
                    balcony:1,
                    bathroom:1,
                    buildingType:1
                },
                ping:30,
                parking:true,
                traffic:[{
                    name:'萬芳醫院站',
                    distance:20,
                    type:1
                }],
                life:[{
                    name:'景美夜市',
                    distance:200,
                    type:1
                }],
                educate:[{
                    name:'景美幼稚園',
                    distance:200,
                    type:1
                }],
                saleType:1,
                saleInfo:{
                    pet: true,
                    manager: true,
                    garbage: true,
                    managerPrice:200,
                    garbagePrice:200,
                    smoke:true,
                    cook:true,
                    typeOfRental:1,
                    devices : [true,false,false,false,true,false,false,false,true,false,false,false,false]
                },
                photo:['1.jpg','2.jpg'],
                annex:['1.jpg'],
                remark:'test',
                belongType:1,
                belongId:'61ed2777f5178ce385654350',
                transactionId:'61ed2777f5178ce385654350',
                isRoofAnnex: false
            }
        }*/ 

        const id = req.body.id
        const name = req.body.name
        const city = req.body.city
        const area = req.body.area
        const owner = req.body.owner
        const address = req.body.address
        const houseNumber = req.body.houseNumber
        const totalFloor = req.body.totalFloor
        const floor = req.body.floor
        const floor2 = req.body.floor2
        const room = req.body.room
        const price = req.body.price
        const config = req.body.config
        const ping = req.body.ping
        const parking = req.body.parking
        const traffic = req.body.traffic
        const life = req.body.life
        const educate = req.body.educate
        const saleType = req.body.saleType
        const saleInfo = req.body.saleInfo
        const photo = req.body.photo
        const annex = req.body.annex
        const remark = req.body.remark
        const hostName = req.body.hostName
        const hostPhone = req.body.hostPhone
        const hostGender = req.body.hostGender
        const belongType = req.body.belongType
        const belongId = req.body.belongId
        const isRoofAnnex = req.body.isRoofAnnex
        const transactionId = req.body.transactionId
        const response = {
            'status':true,
            'data':''
        }
        house.editHouse(id,name,city,area,owner,address,houseNumber,totalFloor,floor,floor2,room,price,hostName,hostPhone,hostGender,config,ping,parking,traffic,life,educate,saleType,saleInfo,photo,annex,remark,belongType,belongId,isRoofAnnex,transactionId,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.put(preRestApi + '/editHousesNoCheckUniqueAddress', function(req, res) {
        /*#swagger.parameters['obj'] = {
             in: 'body',
             description: 'Edit a houses',
             schema: {
                 searchDoc:{
                    belongType:1,
                    belongId:'61ed2777f5178ce385654350'
                 },
                 updateData:{
                    owner:'61ed2777f5178ce385654350'
                 }
                 
             }
         }*/ 
         
         const searchDoc = req.body.searchDoc
         const updateData = req.body.updateData

         const response = {
             'status':true,
             'data':''
         }
         house.editHousesNoCheckUniqueAddress(searchDoc,updateData,(result,data)=> {
             response.status = result;
             response.data = data
             res.send(response);
         })
     });

    app.delete(preRestApi + '/removeHouse', function(req, res) {
       /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Remove a housees',
            schema: {
                ids: ['61ed2777f5178ce385654350','61ed2777f5178ce385654353']
            }
        }*/ 
        const ids = req.body.ids
        const response = {
            'status':true,
            'data':''
        }
        house.removeHouse(ids,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        })
    });

    app.get(preRestApi + '/getHouses', function(req, res) {
       /*
        #swagger.parameters['isDelete'] = {
            in: 'query',
            type: 'boolean',
        }
        #swagger.parameters['sort'] = {
            in: 'query',
            type: 'string',
            schema: '{\"updateTime\":1}'
        }
        */ 
        let isDelete = req.query.isDelete
        let skip = req.query.skip
        let limit = req.query.limit
        let minPrice = req.query.minPrice
        let maxPrice = req.query.maxPrice
        let minPing = req.query.minPing
        let maxPing = req.query.maxPing
        let minRoom = req.query.minRoom
        let maxRoom = req.query.maxRoom
        let minFloor = req.query.minFloor
        let maxFloor = req.query.maxFloor
        let buildingType = req.query.buildingType
        const city = req.query.city
        const area = req.query.area
        //特色
        const parking = req.query.parking
        const pet = req.query.pet
        const manager = req.query.manager
        const garbage = req.query.garbage
        const smoke = req.query.smoke
        const cook = req.query.cook
        const textQuery = req.query.textQuery
        const owner = req.query.owner
        let isShowTransaction = req.query.isShowTransaction

        //類型
        let typeOfRental = req.query.typeOfRental
        minPrice = minPrice*1
        maxPrice = maxPrice*1
        minPing = minPing*1
        maxPing = maxPing*1
        minRoom = minRoom*1
        maxRoom = maxRoom*1
        minFloor = minFloor*1
        maxFloor = maxFloor*1
        typeOfRental = typeOfRental*1
        buildingType = buildingType*1

        //歸屬
        const belongType = req.query.belongType
        const belongId = req.query.belongId

        skip = skip*1;
        limit = limit*1
        if(isDelete == 'true'){
            isDelete = true
        }else{
            isDelete = false
        }

        if(isShowTransaction == 'true'){
            isShowTransaction = true
        }else{
            isShowTransaction = false
        }
        
        const ownerArray = []
        if(utilsValue.isValid(owner)){
            ownerArray.push(owner)
        }
        const queryInfos = house.getHouseListQueryInfos(isDelete,ownerArray,[],city,area,minFloor,maxFloor,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,buildingType,typeOfRental,parking,pet,manager,garbage,smoke,cook,belongType,belongId,textQuery,'','')
        let sort;
        try{
            sort = JSON.parse(req.query.sort)
        }catch(e){
            sort = {}
        }
        const response = {
            'status':true,
            'data':''
        }

        house.getHouseList(queryInfos,skip,limit,sort,isShowTransaction,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
    });

    app.get(preRestApi + '/getHouse', function(req, res) {
        /*
         #swagger.parameters['isDelete'] = {
             in: 'query',
             type: 'boolean',
         }
         */
         const response = {
            'status':true,
            'data':''
        }
         const id = req.query.id
         const isDelete = req.query.isDelete
         house.getHouse(id,isDelete,(result,data)=> {
            response.status = result;
            response.data = data
            res.send(response);
        }) 
     });

    app.post(preRestApi + '/getHousesByBody', function(req, res) {
        /*#swagger.parameters['obj'] = {
            in: 'body',
            description: 'Add a house',
            schema: {
                isDelete:false,
                skip:0,
                limit:500,
                minPrice: 500,
                maxPrice:50000,
                minPing:5,
                maxPing:20,
                floor:3,
                floor2:1,
                minRoom:1,
                maxRoom:5,
                minFloor:2,
                maxFloor:50,
                buildingType:2,
                city : "台北市",
                area:"文山區",
                parking:true,
                pet:false,
                manager:false,
                garbage:false,
                smoke:false,
                cook:false,
                textQuery:"text",
                ownerArray:["64369fe07a2cd7001fa881dd","64369fe07a2cd7001fa881d2"],
                creatorArray:["64369fe07a2cd7001fa881dd","64369fe07a2cd7001fa881d2"],
                typeOfRental:1,
                belongType:1,
                belongId:"64369fe07a2cd7001fa881dd",
                sort:{},
                minCreateTime : '2022/05/11',
                maxCreateTime : '2022/10/11'
            }
        }*/ 
         let isDelete = req.body.isDelete
         let skip = req.body.skip
         let limit = req.body.limit
         let minPrice = req.body.minPrice
         let maxPrice = req.body.maxPrice
         let minPing = req.body.minPing
         let maxPing = req.body.maxPing
         let minRoom = req.body.minRoom
         let maxRoom = req.body.maxRoom
         let minFloor = req.body.minFloor
         let maxFloor = req.body.maxFloor
         let buildingType = req.body.buildingType
         const city = req.body.city
         const area = req.body.area
         //特色
         const parking = req.body.parking
         const pet = req.body.pet
         const manager = req.body.manager
         const garbage = req.body.garbage
         const smoke = req.body.smoke
         const cook = req.body.cook
         const textQuery = req.body.textQuery
         const minCreateTime = req.body.minCreateTime
         const maxCreateTime = req.body.maxCreateTime
 
         //類型
         let typeOfRental = req.body.typeOfRental
         minPrice = minPrice*1
         maxPrice = maxPrice*1
         minPing = minPing*1
         maxPing = maxPing*1
         minRoom = minRoom*1
         maxRoom = maxRoom*1
         minFloor = minFloor*1
         maxFloor = maxFloor*1
         typeOfRental = typeOfRental*1
         buildingType = buildingType*1

        let ownerArray = req.body.ownerArray
        if(!utilsValue.isValid(ownerArray)){
            ownerArray = []
        }

        let creatorArray = req.body.creatorArray
        if(!utilsValue.isValid(creatorArray)){
            creatorArray = []
        }

         //歸屬
         const belongType = req.body.belongType
         const belongId = req.body.belongId

         skip = skip*1;
         limit = limit*1
         if(isDelete == 'true'){
             isDelete = true
         }else{
             isDelete = false
         }
         
        const queryInfos = house.getHouseListQueryInfos(isDelete,ownerArray,creatorArray,city,area,minFloor,maxFloor,minPrice,maxPrice,minPing,maxPing,minRoom,maxRoom,buildingType,typeOfRental,parking,pet,manager,garbage,smoke,cook,belongType,belongId,textQuery,minCreateTime,maxCreateTime)

         let sort;
         try{
             sort = JSON.parse(req.body.sort)
         }catch(e){
             sort = {}
         }
         const response = {
             'status':true,
             'data':''
         }
 
         house.getHouseList(queryInfos,skip,limit,sort,false,(result,data)=> {
             response.status = result;
             response.data = data
             res.send(response);
         }) 
     });
}