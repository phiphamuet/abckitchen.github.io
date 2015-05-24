/**
 * Created by PHI on 5/24/2015.
 */
function userNotLoggedIn(req,res,next){
    if(!req.session.admin){
        res.redirect('/admin');
    }else{
        next();
    }
}
module.exports=userNotLoggedIn;