const OnlyAdminCanAccess = async(req, res, next) => {

    try {

       console.log(req.user); 

        
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: 'Something Went Wrong!'
        });
    }

    return next();

};

module.exports = {
    OnlyAdminCanAccess
}