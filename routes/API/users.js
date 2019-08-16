const express = require('express');
const router = express.Router();

// User Model 
const Users    = require('../../models/user');


// get all users
const getAll = (req, res) => {
        //parameters
        const pageNo = req.query.pageNo ? parseInt(req.query.pageNo) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        const sort = req.query.sort ? JSON.parse(req.query.sort) : { create_date : -1};
        const query = req.query.query ? { $or: [ { lastName: { "$regex": req.query.query, "$options": "i" }},
                                                 { firstName: { "$regex": req.query.query, "$options": "i" }},
                                                 { sex: { "$regex": req.query.query, "$options": "i" }},
                                                 { rank: { "$regex": req.query.query, "$options": "i" }},
                                                 { phoneNum: { "$regex": req.query.query, "$options": "i" }},
                                                 { email: { "$regex": req.query.query, "$options": "i" }},
                                                 { superopr: { "$regex": req.query.query, "$options": "i" }}
                                                ]
                                        }  : {};

     
        if(pageNo > 0 && pageSize>0){

             //skip page for the limitaion
             const skipPage = pageSize * (pageNo - 1);

             //find the user data
             Users.find(query).countDocuments((err,count) => {

                if(err){  res.status(404).end(); console.log(err); return 0;};
                totalPage = Math.ceil(count / pageSize);
             
                Users.find(query,(err,dataList) =>{
                    if(err){   res.status(404).end(); console.log(err); return 0;};
                    res.status(200).json({dataList, count, totalPage, record:dataList.length });
                }).sort(sort).limit(pageSize).skip(skipPage);
              
            }); 
        }else{
           res.status(404).end();
        }
};
  
// create user
const createUser = (req, res) => {

    let user = {
        ...req.body
    }; 

    Users.create(user, function(err, users) {
        if(err) { res.status(404).end(err); console.log(err);return 0;}
        res.status(201).json({id : users._id});
    });

}


// get one user
const getOne = (req, res) =>{

    Users.find({_id: req.params.userId},(err,dataList) =>{
        if(err){ res.status(204).end(); console.log(err); return 0;};
        res.status(200).json(dataList);
    });

}

// modify user
const modifyUser = (req, res) =>{

    Users.findById({ _id: req.params.userId}, function (err, data) {
        if(err){ res.status(204).end();console.log(err); return 0;};
          data.firstName = req.body.firstName;
          data.lastName = req.body.lastName;
          data.sex = req.body.sex;
          data.age = req.body.age;
          if(req.body.passwd !== ''){
              data.passwd = req.body.passwd;
          }
          
          data.create_date = Date.now();
          data.save(function(err){
              if(err){ res.status(204).end();console.log(err); return 0;};
              res.status(200).json({id : req.params.userId});
          })
    })

}

//delete user
const deleteUser = (req, res) =>{

    Users.deleteOne({ _id: req.params.userId}, function (err, data) {
        if(err){ res.status(204).end();console.log(err); return 0;}
        res.json({code: 200, msg: data._id +' Deleted'});
    })


}




// RESTful API Router
// get, create
router.route('/')
    .get(getAll)
    .post(createUser);



// ID get ,update ,delete
router.route('/:userId')
    .get(getOne)
    .put(modifyUser)
    .delete(deleteUser);






// Test Unit
/*

    let user = {

        firstName: 'MEK',
        lastName: 'Wang',
        sex: 'Male',
        rank: 'Colonel',
        startDate: '2017/04/03',
        phoneNum: '902-341-6789',
        email: 'mark@usarmy.gov',
        superopr: 'Douglas Chan',
        superoprID: '5d44ef142a9d981a1b6e9d53',
        subordinates: [
            '5d44efcf745b451a41bc4f1d','5d44f04f745b451a41bc4f1e'
        ],
        DS: 0

    }

*/




module.exports = router;
