import query from "../databases/init.db.js";

const checkUserOwnership = async(req, res, next) => {
    const userId = req.body.userId;

    const userSql = `
        SELECT user_id
        FROM users
        WHERE user_id = ?
    `;

    try {
        const userRes = await query(userSql, [userId]);
       
        const user = userRes[0];
      

        if (!user || !user.user_id) {
            return res.status(401).json({ message: `User not found` });
        }

        if (user.user_id !== req.user.userId) { // Assurez-vous de vérifier req.user.userId
            return res.status(401).json({ message: `You are not authorized to modify this user's account` });
        }

        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Internal server error` });
    }
};

export default checkUserOwnership;
