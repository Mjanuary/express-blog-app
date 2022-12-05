import { Request, Response } from "express";
import Blogs from '../imports/models/Blogs';


export const AllBlogs = async (req: Request, res: Response) => {
    try {
        let data = await Blogs.find();

           console.log(data);
    
    return res.send({data:data})
    } catch (error) {
        
    }
 
} 