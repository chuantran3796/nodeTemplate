import { NextFunction, Request, Response } from "express";
import onFirebaseMessenger from "../../../core/firebase";

export default {
  send: async (req: any, res: Response, next: NextFunction) => {
    const { fcmToken, data } = req.body;
    onFirebaseMessenger(fcmToken, data)
      .then((response: Response) => {
        return res.status(200).json({
          message: "Successfully sent message",
          response,
        });
      })
      .catch((error: any) => {
        return res.status(404).json({
          message: error,
        });
      });
  },
};
