// recupération du userId dans le token

const getUserId = (req) => {
    return req.user.userId
};

module.exports = getUserId;
