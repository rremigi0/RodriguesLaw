module.exports = {
    
// Perfil de Paralegal - Funcionário (Read, Create):

    eAdmin2: function(req, res, next){
        if(req.isAuthenticated() && req.user.eAdmin >= 2){
            return next ();
        }
        req.flash("error_msg", "Você não tem autorização")
        res.redirect("/admin/dashboard")
    }
}