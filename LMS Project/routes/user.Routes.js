import {Router} from "express"
import { register,login,logout,getprofile } from "../controller/user.controller";

const router=Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",getprofile);

export default router;