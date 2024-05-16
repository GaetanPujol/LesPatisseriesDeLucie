import query from "../databases/init.db.js";

const checkAdmin = async (req, res, next) => {

  const userId = req.body.userId;

  const userSql = `
    SELECT user_id, role
    FROM users
    WHERE user_id = ?
  `;

  const userRes = await query(userSql, [userId]);

  if (userRes.length === 0) {
    return res.status(401).json({ message: `User not found` });
  }



  const user = userRes[0];

  if (!user || !user.role) {
    return res.status(401).json({ message: `User not found or missing role` });
  }

  const role = user.role;

  if (role !== "admin") return res.status(401).json({ message: `you don't have permission` });

  next();

};

export default checkAdmin;
