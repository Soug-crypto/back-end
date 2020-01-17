const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) return res.status(401).send("You need to be connected");

  const verified = jwt.verify(
    token,
    process.env.JWT_SECRET || "SoSecretThatYouWantToKnowIt",
    (err, user) => {
      if (err) return res.status(401).send("You need to be connected");
      req.user = user;
      next();
    }
  );
};

module.exports = verifyToken;
