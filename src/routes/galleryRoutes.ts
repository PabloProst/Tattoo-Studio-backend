import {getGallery} from "../controllers/galleryControllers";
import { Router } from "express";

const router = Router()

// Get tattoo list
router.get('/gallery', getGallery);

export { router };