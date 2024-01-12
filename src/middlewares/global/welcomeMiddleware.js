function welcome(req,res,next) {
    console.log("Welcome!");
    next();
};

module.exports = welcome;