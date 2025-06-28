import { Request, Response } from "express";
import { heatmap } from "../data"; //fetch from db later

export const heatmapController = {
  getHeatmap: async (req: Request, res: Response) => {
    try {
      const { start_date, end_date } = req.query;
      if (!start_date || !end_date) {
        res.status(400).json("Starting and Ending dates required");
        return;
      }
      res.json({
        message: "Heatmap",
        data: heatmap, start_date, end_date
      });
    } catch (error: any) {
      res.status(400).json({
        message: error.message,
      });
    }
  },
};
