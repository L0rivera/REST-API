import { Router } from "express";
import { ProjectControllers } from "../Controllers/projects.js";

export const Projectsrouter = Router();

Projectsrouter.get('/projects', ProjectControllers.GetAll);
Projectsrouter.post('/project', ProjectControllers.AddProject);