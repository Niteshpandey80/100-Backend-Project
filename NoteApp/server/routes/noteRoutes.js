import express from 'express'
import Note from '../models/Note.js'

const router = express.Router();

router.get('/' , async (req,res)=>{
    const notes = await Note.find() ; 
    res.json(notes)
})
router.post('/add' , async(req,res)=>{
    const {title , value} = req.body ;
    const note = await Note.create({
        title , value
    })
    res.json(note)
})
router.put('/update/:id' , async(req,res)=>{
    try {
        const {title , value} = req.body;
        const note = await Note.findByIdAndUpdate(
            req.params.id,{
                title , value
            },
            {
                new:true,
            }
        )
        res.json(note)
    } catch (error) {
        
    }
})
router.delete('/delete/:id' , async(req,res)=>{
    try {
        await Note.findByIdAndDelete(req.params.id) ; 
        res.json({message: "Note deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

export default router ;