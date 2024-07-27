import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

export async function insertQuestions(req, res) {
    try {
        // Insert the documents
        const data = await Questions.insertMany({ questions, answers });

        // Send a success response
        res.json({ msg: "Data Saved Successfully!", data });
    } catch (error) {
        // Send an error response
        res.json({ error });
    }
}

export async function dropQuestions(req, res){
   // res.json("drop qn")
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

export async function getResult(req, res){
    //res.json("get res")
    try {
        const r = await Results.find();
        res.json(r)
    } catch (error) {
        res.json({ error })
    }
}

export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achieved } = req.body;
        if (!username || result === undefined) throw new Error('Data Not Provided...!');

        // Find existing user
        const existingUser = await Results.findOne({ username });

        if (existingUser) {
            // Update the score only if the new score is higher
            if (points > existingUser.points) {
                existingUser.result = result;
                existingUser.attempts = attempts;
                existingUser.points = points;
                existingUser.achieved = achieved;
                await existingUser.save();
                res.json({ msg: "High Score Updated Successfully...!", data: existingUser });
            } else {
                res.json({ msg: "No new high score. Existing score remains the same.", data: existingUser });
            }
        } else {
            // Create new record if user does not exist
            const data = await Results.create({ username, result, attempts, points, achieved });
            res.json({ msg: "Result Saved Successfully...!", data });
        }
    } catch (error) {
        res.json({ error: error.message });
    }
}

export async function dropResult(req, res){
    // res.json("insert")
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}
