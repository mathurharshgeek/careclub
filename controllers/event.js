
const { getStorage, ref, uploadBytesResumable,getDownloadURL } = require("firebase/storage");
const { default: mongoose } = require("mongoose");

const getEventFile=(req,res)=>{
res.render("event",{msg:req.flash()});
}
const getAllEvent=async(req,res,eventData)=>{
    let result=await eventData.find();
    res.render("AllEvents",{tittle:"events will work",events:result});
}
const createEvent=(eventData,storage)=>async(req,res)=>{
    var today = new Date();
    const {e_name,e_desc,e_location,e_city,e_type,e_date,e_time,e_timezone,e_hashtags}=req.body;
    var d=new Date(e_date)
    console.log(req.body)
    if(!e_name || !e_desc || !e_location || !e_city || !e_type || !e_date || !e_time || !e_timezone || !e_hashtags){
    req.flash("error","please fill all details")
    return res.render("event",{msg:req.flash()})
}
else{
 var valid =true;
 if(e_time >12 || e_time <=0){
    valid=false
    req.flash("error","Time should be in 12 hour format");
    res.render("event",{msg:req.flash()});
 }
 if(d<today){
    valid=false

    req.flash("error","Date Should Be in Future")
    res.render("event",{msg:req.flash()});

 }
 if(valid){
console.log("here")
     const storageRef = ref(storage, `events/${+Math.floor((Math.random() * 1000) + 1)+"-"+req.file.originalname}`);
     const metaData={
         contentType:req.file.mimetype,
        };
        uploadBytesResumable(storageRef, req.file.buffer,metaData).then((snapshot) => {
      })
      const snapshot=await uploadBytesResumable(storageRef, req.file.buffer,metaData)
      const downloadurl=await getDownloadURL(snapshot.ref);

    var response=[];
    
    let tmp=req.body.e_hashtags
      toString(tmp);
      let hastags=[]
       hastags=tmp.split(',');
       let newEvent= new eventData({
           e_name:req.body.e_name,
           e_date:req.body.e_date,
           e_desc:req.body.e_desc,
           e_location:req.body.e_location,
           e_city:req.body.e_city,
           e_type:req.body.e_type,
           e_image:downloadurl,
           e_time:req.body.e_time,
           e_timezone:req.body.e_timezone,
           e_org_id:req.session.user._id,
           e_org_contact:req.session.user.u_phone,
           e_hashtags:hastags
        });
        
        newEvent.save().then((result)=>{
            
            return res.redirect('/organised-events');
            
        }).catch((err)=>{
            console.log(err);
            req.flash("error","Error in creating event")
                return res.render("event",{msg:req.flash()});  
            });
        }
    }
    };
    const joinEvents=async(req,res,eventData)=>{
            let result1=await eventData.findOne({_id:req.params.id})
            
            // let result=await eventData.updateOne({_id:req.params.id},{$push: { e_joinies: req.session.user._id }})
    var flag=false;
    let check=result1.e_joinies;
    check.forEach(element => {
        if (element.equals(req.session.user._id)) {
            flag=true;
        }
        
    });
    if(!flag){
    let result=await eventData.updateOne({_id:req.params.id},{$push: { e_joinies: req.session.user._id }})
        console.log(result)
    if(result.modifiedCount == 1){
        res.redirect('/joined-events');
    }else{
        req.flash("error","An Error Occured")
        res.redirect('/events')

    }//you can even check if result is true or not
    }
    else{
        req.flash("error","you have  already joined")
        res.redirect('/events')
    }
}
const getJoinedEventsFile=async (req,res,eventData)=>{
    console.log(req.session.user._id)
 
let result=await eventData.find({e_joinies:req.session.user._id})
 console.log(result)   
 if(result.length > 0){

     res.render("joinedEvents",{msg:req.flash(),events:result});
 }
 else{
    req.flash("error","You Have Not Joined Any Event")
    res.render("joinedEvents",{msg:req.flash(),events:null})
 }
}
const organisedEvents=async(req,res,eventData)=>{
    console.log(req.session.user._id)
    let result=await eventData.find({e_org_id:req.session.user._id})
    console.log(result);
    if(result.length >0){
        res.render("orgnaisedEvents",{msg:req.flash(),events:result});
    }else{
        req.flash("error","You Have Not Created Any Event")
        res.render("orgnaisedEvents",{msg:req.flash()})
    }//you can even check if result is true or not
    
   }

module.exports={
    getEventFile,
    createEvent,
    getAllEvent,
    joinEvents,
    getJoinedEventsFile,
    organisedEvents
}
