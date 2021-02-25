module.exports = {

// Perfil de Advogado (Read, Create, Update):

eAdmin3: function(req, res, next){
    if(req.isAuthenticated() && req.user.eAdmin >= 3){
        return next ();
    }
    req.flash("error_msg", "Você não tem autorização")
    res.redirect("/admin/dashboard")
    }
}