module.exports = {

// Perfil de Gestor (Read, Create, Update, Delete):
eAdmin4: function(req, res, next){
    if(req.isAuthenticated() && req.user.eAdmin >= 4){
        return next ();
    }
    req.flash("error_msg", "Você não tem autorização")
    res.redirect("/admin/dashboard")
 }
}