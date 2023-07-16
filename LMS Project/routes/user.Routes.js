import {Router} from "express"
import { register,login,logout,getprofile } from "../controller/user.controller.js";

const router=Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isloginedIn,getprofile);

export default router;