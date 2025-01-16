

import jwt from 'jsonwebtoken';

const authUser = async (req, res, next) => {
  try {
    // Extract token from the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('Authorization header missing or incorrect:', authHeader);
      return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    // Extract the token
    const token = authHeader.split(' ')[1];
    console.log('Extracted Token:', token);

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decodedToken);

    // Attach user ID to the request
    req.body.userId = decodedToken.id;

    next();
  } catch (error) {
    console.error('Error in token verification:', error.message);
    res.json({ success: false, message: 'Token is invalid or expired. Please log in again.' });
  }
};

export default authUser;

