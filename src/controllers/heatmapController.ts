import { Request, Response } from "express";
import { heatmap } from "../data"; //fetch from db later

export const heatmapController = {
  getHeatmap: async (req: Request, res: Response) => {
    try {
      res.json({
        message: "List of trending Categories",
        data: heatmap,
      });
    } catch (error) {}
  },
};
