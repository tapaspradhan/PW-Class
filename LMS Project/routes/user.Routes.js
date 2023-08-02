import {Router} from "express"
import { register,login,logout,getprofile } from "../controller/user.controller.js";
import {isloginedIn} from "../middlewares/multer.middleware.js";
import upload from "../middlewares/multer.middleware.js";

const router=Router();

router.post("/register",upload.single("avatar"),register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isloginedIn,getprofile);

export default router;