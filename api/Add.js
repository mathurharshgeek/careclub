const Add=(req,res) =>{
    let sum;
    // let aa=parseInt( req.query.a);let bb=parseInt( req.query.b);
    // sum=aa+bb;
    console.log(req.body);
    res.send(`the sum is `);
}
module.exports=Add