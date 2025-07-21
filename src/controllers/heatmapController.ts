import { Request, Response } from "express";
import { heatmap } from "../data"; //fetch from db later

export const heatmapController = {
  getHeatmap: async (req: Request, res: Response) => {
    try {
      const { id: userId, role } = (req as any).user;
      if (role !== "coder") {
        res.status(403).json("User must be coder to see this content");
        return;
      }
      const { start_date, end_date } = req.query;

      let setStartDate: Date;
      if (start_date) {
        setStartDate = new Date(start_date as string);
      } else {
        setStartDate = new Date(
          new Date().setFullYear(new Date().getFullYear() - 1)
        );
      }
      let setEndDate: Date;
      if (end_date) {
        setEndDate = new Date(end_date as string);
      } else {
        setEndDate = new Date(new Date());
      }
    } catch (error: any) {}
  },
};
