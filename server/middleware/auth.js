import jwt from "jsonwebtoken";

// this middleware is going to be used in routes and is used to verify a user, the normal way i do verify_user in python

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    let decodedData;
    if (token) {
      decodedData = jwt.verify(token, process.env.SECRET);
      req.userId = decodedData?.id;
      // this means that from the controllers, the req will have a req.userId which means the user is authenticated
      // before running controller logic for any action that needs to be validated, run
      // if(!req.userId) return res.status(401).json({message:'Unauthenticated'})
      // this is similar to django's IsAuthenticated decorator
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
