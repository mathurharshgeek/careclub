const getDetailsFile=(req,res)=>{
// res.send("details");
console.log(req.session.user._id)
res.render("details",{msg:req.flash()});
}
const addDetails=(userData)=>async(req,res)=>{
    const {u_city,u_phone,LIC_NO}=req.body;

    if(!u_city || !u_phone ){
        req.flash("error","Please Fill All Details")
        res.render("details",{msg:req.flash()})
    }else{

        let result= await userData.updateOne({ _id: req.session.user._id }, { $set: { u_city:req.body.u_city,u_phone:req.body.u_phone,LIC_NO:req.body.LIC_NO} })
        if(result.modifiedCount == 1){
            
            res.redirect('/events')
        }else{
            req.flash("error","An Error Occured")
            res.redirect('/details')
        }

        
    }
    };
module.exports = {
    getDetailsFile,
    addDetails
  };