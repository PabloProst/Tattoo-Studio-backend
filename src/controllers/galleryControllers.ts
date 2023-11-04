import { Request, Response } from "express";
import { Gallery } from "../models/Gallery";

// Get tattoo list
const getGallery = async (req: Request, res: Response) => {
    try {
        const gallery = await Gallery.find();

        return res.json({
            gallery
        });

    } catch (error) {
        return res.json({
            success: false,
            message: `Gallery can't be retrieved`,
            error: error
        });
    }
};

  export { getGallery };