const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  //read the token from header or url
  const token = req.headers["x-access-token"] || req.query.token;
  //token does not exist
  if (!token) {
    console.log("헤더에 토큰이 없습니다.");
    return res.status(403).json({
      success: false,
      message: "not logged in"
    });
  }

  //create a promise that decodes the token
  const p = new Promise((resolve, reject) => {
    jwt.verify(token, req.app.get("jwt-secret"), (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });

  try {
    const decoded = await p;
    req.decoded = decoded; //다음 라우터에서 req.decoded하면 정보가 나온다
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = authMiddleware;
