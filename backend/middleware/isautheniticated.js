import jwt from "jsonwebtoken"; 

 const isauthenticated  = async(req,res,next )=>{
    try{
 const token =
    req.cookies?.token ||
    (req.headers?.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.slice("Bearer ".length)
      : null);

 if(!token){
    return res.status(401).json({message:"Unauthorized access",
       success:false
    });
 }
    if (!process.env.SECRET_KEY) {
        console.error("SECRET_KEY is not set");
        return res.status(500).json({
            message:"Server misconfigured",
            success:false
        });
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    if(!decoded){
        return res.status(401).json({
            message:"Unauthorized access",
            success:false
        });
    }
     
    
    req.userId = decoded.userId;
    req.id = decoded.userId; // backward compat
    if (!req.userId) {
        return res.status(401).json({
            message:"Unauthorized access",
            success:false
        });
    }
    next();
    }
    catch(error){
        const name = error?.name;
        if (name === "TokenExpiredError" || name === "JsonWebTokenError" || name === "NotBeforeError") {
            return res.status(401).json({
                message:"Unauthorized access",
                success:false
            });
        }

        console.log("Error in authentication middleware:",error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        });
    }
 }

 export default isauthenticated;
