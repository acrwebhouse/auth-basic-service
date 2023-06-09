let async=require('async');
let controlDB = null;
const config = require('../setting/config').config;
const { MongoClient } = require('mongodb');
const uri = config.mongoDBUri;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});

exports.init = function init(mongoDBName,callback) {
  client.connect(err => {
    if (!err) {
      controlDB = client.db(mongoDBName)
      callback(true);
    }else{
      callback(false);
    }
  });
}

exports.createIndex = function createIndex(collectionName,obj,option, callback) {
  if (controlDB != null) {
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.createIndex(obj,option,(err, data) => {
          if (err) {
            console.log('\x1b[31m createIndex error\x1b[37m');
            callback(false, err.message);
          } else {
            callback(true, data);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//collectionName : 'dashboard'
exports.getCollectionCount = function getCollectionCount(collectionName, callback) {
  if (controlDB != null) {
    // console.log('get ' + collectionName + ' count');
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.count((err, data) => {
          if (err) {
            console.log('\x1b[31m get ' + collectionName + ' count error\x1b[37m');
            callback(false, err.message);
          } else {
            callback(true, data);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//if exist insert invalid
//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb', 'filePath': '/demo_001/untitled_1' };
//obj : [{ '_id': 'CCC', 'filePath': '/demo_001/untitled_1' },{ '_id': 'DDD', 'filePath': '/demo_001/untitled_1' }];
exports.insert = function insert(collectionName, obj, callback) {
  // console.log(controlDB);
  // console.log(JSON.stringify( obj));
  if (controlDB != null) {
    // console.log('insert ' + JSON.stringify(obj) + ' to ' + collectionName);
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.insert(obj, (err, data) => {
          if (err!=null) {
            console.log('\x1b[31m insert ' + obj + ' error \x1b[37m');
            callback(false, err.message);
          } else {
            callback(true, data);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        console.log(err);
        console.log(data);
        console.log(obj);
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb', 'filePath': '/demo_001/untitled_1' };
//if(obj=='{}'){callback collection all item} 
exports.queryFindAll = function queryFindAll(collectionName, obj,SkipCount,limitCount,SortInfo, callback) {
  if (controlDB != null) {
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.find(obj).limit(limitCount).sort(SortInfo).skip(SkipCount).toArray(function(err, result) {
          if (err == null) {
            callback(true,result)
          }else{
            callback(false, err.message);
          }
      })
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb', 'filePath': '/demo_001/untitled_1' };
exports.queryFindOne = function queryFindOne(collectionName, obj, callback) {
  if (controlDB != null) {
    // console.log('query ' + JSON.stringify(obj) + ' from ' + collectionName);
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.findOne(obj, function(err, item) {
          if (!err) {
            callback(true, item);
          } else {
            console.log('\x1b[31m query ' + obj + ' error \x1b[37m');
            console.log(err);
            console.log(item);
            console.log(obj);
            callback(false, err.message);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb', 'filePath': '/demo_001/untitled_1' };
//updateData : { $set: { 'filePath': 'new  path' } }
//callback result.result:{ ok: 1, nModified: 0, n: 1 }
exports.update = function update(collectionName, obj, updateData, callback) {
  if (controlDB != null) {
    // console.log('update ' + JSON.stringify(obj) + ' do ' + updateData + ' from ' + collectionName);
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.update(obj,{$set: updateData}, function(err, result) {
          if (err) {
            console.log('\x1b[31m update ' + obj + ' error \x1b[37m');
            console.log(err);
            console.log(result);
            console.log(obj);
            callback(false, err.message);
          } else {
            callback(true, result.result);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

exports.updateMany = function updateMany(collectionName, obj, updateData, callback) {
  if (controlDB != null) {
    // console.log('update ' + JSON.stringify(obj) + ' do ' + updateData + ' from ' + collectionName);
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.updateMany(obj,{$set: updateData}, function(err, result) {
          if (err) {
            console.log('\x1b[31m update ' + obj + ' error \x1b[37m');
            console.log(err);
            console.log(result);
            console.log(obj);
            callback(false, err.message);
          } else {
            callback(true, result.result);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}


//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb' };
//callback result.result:{ ok: 1, n: 1 }
exports.remove = function remove(collectionName, obj, callback) {
  if (controlDB != null) {
    // console.log('remove ' + JSON.stringify(obj) + ' from ' + collectionName);
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.remove(obj, function(err, result) {
          if (err) {
            console.log('\x1b[31m remove ' + obj + ' error \x1b[37m');
            console.log(err);
            console.log(result);
            console.log(obj);
            callback(false, err.message);
          } else {
            callback(true, result.result);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//by_id judge
//collectionName : 'dashboard'
//obj : { '_id': 'fff_1469779683460_591fb', 'filePath': '/demo_001/untitled_1' };
exports.save = function save(collectionName, obj, callback) {
  if (controlDB != null) {
    controlDB.collection(collectionName, function(err, collection) {
      if (err == null) {
        collection.save(obj, function(err, data) {
          if (!err) {
            callback(true, data.result);
          } else {
            console.log('\x1b[31m save ' + obj + ' error \x1b[37m');
            console.log(err);
            console.log(data);
            console.log(obj);
            callback(false, err.message);
          }
        });
      } else {
        console.log('\x1b[31m mongodb ' + collectionName + ' open error \x1b[37m');
        callback(false, 'mongodb ' + collectionName + ' open error');
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}

//multi save
exports.saveArray = function saveArray(collectionName, objArray, callback) {
  let self = this;
  let cbs = [];
  for (let i = 0; i < objArray.length; i++) {
    cbs.push(function(callback) {
      self.save(collectionName, objArray[i], (result, data) => {
        callback(null, result);
      });
    });
  }
  async.series(cbs, function(err, results) {
    let result = true;
    for (let i = 0; i < results.length; i++) {
      if (!results[i])
        result = false;
    }
    callback(result);
  });
}

exports.queryJoinCollectionList = function queryJoinCollectionList(collectionName, lookup,match ,skip,limit,sort, callback) {
  if (controlDB != null) {
    // console.log('query ' + JSON.stringify(obj) + ' from ' + collectionName);
    controlDB.collection(collectionName).aggregate([
      { 
        $lookup:lookup
       },
       {
        $match:match
      },
       {
          $skip:skip
      },
      {
        $limit:limit
      },
      {
        $sort:sort
      }
      ]).toArray(function(err, res) {
      if (err) {
        callback(false, 'mongodb query error '+err);
      }else{
        callback(true,res)
      }
    });
  } else {
    console.log('\x1b[31m mongodb open error \x1b[37m');
    callback(false, 'mongodb open error');
  }
}
