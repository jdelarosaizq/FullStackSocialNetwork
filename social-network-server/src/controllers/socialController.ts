import { Request, Response } from "express";
import * as socialService from '../services/socialService';

export const getUnconnectedPeople = async (req: Request, res: Response) => {
    const { networks } = req.body;
    try {
        const unconnectedCount = await socialService.getUnconnectedPeople(networks);
        res.json({ unconnectedCount })
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

}

export const getSocialInfluence = async (req: Request, res: Response) => {
    const { person, networks } = req.body;

    try {
        const influence = await socialService.getSocialInfluence(person, networks);
        console.log("influence", influence)
        res.json(influence);        
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}