import { getSession } from "../config.js";
import { v4 as uuidv4 } from 'uuid';

export class TaskModel {

    static async GetALL (projectId, sectionId) {
        const session = getSession();

        try {
            const result = await session.run(`
                 MATCH (p:Project {id: $projectId})-[:HAS_SECTION]->(ts:TaskState {id: $sectionId})
            MATCH (ts)-[:HAS_TASK]->(t:Task)
            RETURN t
                `, { projectId: projectId, sectionId: sectionId})
            const tasks = result.records.map(record => record.get('t').properties);
            return tasks;
        } catch(err) {
             console.log(`Error: ${err}, Error message: ${err.message}`);
        } finally {
            session.close();
        }
    }

    static async addTask (title, description, sectionId) {
       const session = getSession();
       const Taskid = uuidv4();
       try {
        const result = await session.run(`
            CREATE (t:Task {id: $Taskid, title: $title, description: $description, start_date: 'Unset', due_date: 'Unset', importance: 'unset'}) WITH t
            MATCH (ts:TaskState {id: $sectionId})
            MERGE (ts)-[:HAS_TASK]->(t)
            RETURN t
            `, {Taskid: Taskid, title: title, description: description, sectionId: sectionId})

            const task = result.records.map(record => record.get('t').properties);
            return task;
       } catch(err) {
             console.log(`Error: ${err}, Error message: ${err.message}`);
       } finally {
        session.close();
       }
    }
}