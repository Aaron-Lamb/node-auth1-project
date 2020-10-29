function unauthorized() {
    return async (req, res, next) => {
        try{
            if(!req.session || !req.session.user) {
                return res.status(401).json({
                    errorMessage: "Invalid Credentials"
                })
            }
            next()
        } catch(error) {
            next(error)
        }
    }
}

module.exports = {
    unauthorized
}