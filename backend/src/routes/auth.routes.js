const express=require('express'); 
const { registerController, loginController, logoutController, getCurrentUserController } = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware'); // Assuming this is your verifyJWT middleware

const router=express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

// ✅ NEW: Logout Route
router.post('/logout', authMiddleware, logoutController);

// ✅ NEW: Route to get current user data
router.get('/me', authMiddleware, getCurrentUserController);

module.exports=router;
