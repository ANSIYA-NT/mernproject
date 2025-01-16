

import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // Remove "Bearer " from the token
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // Verify the token
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded email matches the admin email
    if (token_decode.email !== process.env.ADMIN_EMAIL) {
      return res.json({ success: false, message: "Not Authorized Login Again" });
    }

    // If all checks pass, proceed to the next middleware
    next();
  } catch (error) {
    console.error("Error in adminAuth middleware:", error.message);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
