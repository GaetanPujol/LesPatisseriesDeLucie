import jwt from "jsonwebtoken";

const jwtOptions = { expiresIn: `28800000` };
const secret = process.env.JWT_SECRET || "T0P_S3CRet";

const jwtMdlwr = (req, res, next) => {

  const token = req.headers.authorization;
  const userId = jwtVerify(token);

  if (!userId) {

    return res.status(401).json({ message: "Invalid Token" });

  }

  req.body.userId = userId;

  next();

};

const jwtVerify = (token) => {

  try {

    const decoded = jwt.verify(token, secret);
    const userId = decoded.data;

    return userId;

  }
  catch (err) {

    console.error(`jwt.mdlwr.js - jwtVerify - error => `, err.message);

    return null;

  }
};
export const jwtSign = (data) => jwt.sign({ data }, secret, jwtOptions);
export default jwtMdlwr;
