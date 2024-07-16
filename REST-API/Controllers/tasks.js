import { TaskModel } from "../Models/task.js";

export class TaskController {
    static async GetAll (req, res) {
        const { projectId, sectionId } = req.query;
        try {
            const result = await TaskModel.GetALL(projectId, sectionId);
            return res.json(result);
        } catch(err) {
            console.error(`Error: ${err}, message: ${err.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async addTask (req, res) {
        const { title, description, sectionId } = req.body;
        try {
            const result = await TaskModel.addTask(title, description, sectionId);
            return res.json(result);
        } catch(err) {
            console.error(`Error: ${err}, message: ${err.message}`);
      return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}