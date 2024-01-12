function auth(req, res ,next) {
    let admin = true;
    if(admin){
        next();
    } else {
        res.render("no-admin");
    }
};

module.exports = auth;