// on recupère l'id du user dans le token 

const getUserId = (req) => {
    return req.user.userId
};


module.exports = getUserId;