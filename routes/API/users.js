const express = require('express');
const router = express.Router();

// User Model 
const Users    = require('../../models/user');


// update superior
const updateSuperior =  async (superiorID, subordinateID, level = 0) => {

        Users.find({ _id: superiorID}, (err,user) =>{
           if(err){   res.status(404).end(); console.log(err); return;};
          
                user[0].subordinates = user[0].subordinates ?   [...user[0].subordinates, subordinateID] :  [subordinateID] ;

                if(level===0){
                    user[0].DS = parseInt(user[0].DS) + 1;
                }
                level++;
     
                user[0].save(function(err){
                    if(err){ res.status(204).end();console.log(err); return;};
                    if(user[0].superiorID){
                        updateSuperior(user[0].superiorID,subordinateID,level) ;
                    }
                })

        })

}

//delete subordinates

const deleteSubordinates= async ( superiorID, subordinateID, level = 0 ) => {


    Users.find({ _id: superiorID},(err,user) =>{
        if(err){   res.status(404).end(); console.log(err); return;};
        
        //if(user[0]){
            user[0].subordinates =  user[0].subordinates.filter(function(sub) {

            if(JSON.stringify(sub) !== JSON.stringify(subordinateID)){
                    return sub;
            }
            });

            if(level===0){
                user[0].DS = parseInt(user[0].DS) - 1;
            }
            level++;
       
            user[0].save(function(err){
                if(err){ res.status(204).end();console.log(err); return;};
                if(user[0].superiorID){
                    deleteSubordinates(user[0].superiorID,subordinateID,level) ;
                }
            })
        //}

        
    })

}


// update superior

const deleteSuperiorAll = async function(userData){


    Users.find({ superiorID: userData.id }, async function (err,user){
        if(err){   res.status(404).end(); console.log(err); return;};
        await user.map( async (row) => {

            row.superiorID= userData.superiorID;
            row.superior= userData.superior;
            console.log('deleteSuperiorAll');
            await row.save(function(err){
                if(err){ res.status(204).end();console.log(err); return;};
                console.log(row._id );
                console.log(userData.superiorID);
                if(userData.superiorID){
                    updateSuperior(userData.superiorID, row._id, 0 ) ;
                }
               
              
            })
        });
    
    
    })
  

/*     Users.updateMany({superiorID: userData.id}, 
        {$set: { superiorID: userData.superiorID, 
                 superior : userData.superior 
               }},
        (err) =>{ 
           if(err){ res.status(204).end();console.log(err); return;};
    }) */
}

// get all users
const getAll = (req, res) => {
        //parameters
        const pageNo = req.query.pageNo ? parseInt(req.query.pageNo) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 10;
        const sort = req.query.sort ? JSON.parse(req.query.sort) : { modifyDate : -1};
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

                if(err){  res.status(404).end(); console.log(err); return;};
                totalPage = Math.ceil(count / pageSize);
             
                Users.find(query,(err,dataList) =>{
                    if(err){   res.status(404).end(); console.log(err); return;};
                    res.status(200).json({dataList, count, totalPage, record:dataList.length, pageNo});
                }).sort(sort).limit(pageSize).skip(skipPage);
              
            }); 
        }else{
           res.status(404).end();
        }
};
  
// create user
const createUser = (req, res) => {

    
    let user = {
        ...req.body,
    }; 

    Users.create(user, async function(err, users) {
        if(err) { res.status(404).end(err); return console.log(err);}
        user.superiorID &&
        await updateSuperior(user.superiorID, users._id);
        res.status(201).json({id : users._id});
    });
    
   
}


// get one user
const getOne = (req, res) =>{

    
    if(req.query.superiorType){

        Users.find({ superiorID: req.params.userId},(err,dataList) =>{
            if(err){ res.status(204).end(); console.log(err); return;};
            res.status(200).json({dataList, count :dataList.length , totalPage : 1, record:dataList.length, pageNo: 1});
        });

    }else{

        Users.find({_id: req.params.userId},(err,dataList) =>{
            if(err){ res.status(204).end(); console.log(err); return;};
            res.status(200).json({dataList, count : 1, totalPage : 1, record:dataList.length, pageNo: 1});
        });
    }


}

// modify user
const  modifyUser = async (req, res) =>{

 

    Users.findById({ _id: req.params.userId}, async function (err, data) {
          if(err){ res.status(204).end();console.log(err); return;};
          
      
          
          if((data.superiorID.toString() !== req.body.superiorID.toString())){
                if(data.superiorID){
                    //delete Superior Subordinates
                    await deleteSubordinates(data.superiorID, data._id)
                    
                }

                if(req.body.superiorID){
                    //update Superior Subordinates
                    await updateSuperior(req.body.superiorID, data._id)
                    console.log('updateSuperior');
               }

          }

 
          data.firstName = req.body.firstName;
          data.lastName = req.body.lastName;
          data.sex = req.body.sex;
          data.age = req.body.startDate;
          data.startDate = req.body.startDate;
          data.phone = req.body.phone;
          data.email = req.body.email;
          data.superiorID = req.body.superiorID;
          data.superior = req.body.superior;
          data.image = req.body.image;
          
          data.modifyDate = Date.now();

          await data.save(function(err){
              if(err){ res.status(204).end();console.log(err); return;};
              res.status(200).json({id : req.params.userId});
          })
    })

    

}




//delete user
const deleteUser = (req, res) =>{

    Users.find({ _id: req.params.userId},async function (err,user) { 

        if(err){ res.status(204).end();console.log(err); return;};

        const userData = { id:  user[0]._id,  
            superiorID: user[0].superiorID ? user[0].superiorID : null, 
            superior:  user[0].superior ? user[0].superior : '', 
        }

        // delete superior subordinates
        if(userData.superiorID){ 
            await deleteSubordinates(userData.superiorID, userData.id);
        }

        // delete superior all
        await deleteSuperiorAll(userData);

        
        await Users.deleteOne({ _id: userData.id}, function (err, data) {
            if(err){ res.status(204).end(err);console.log(err); return;}
            res.json({code: 200, msg: data._id +' Deleted'});
        })

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




module.exports = router;
