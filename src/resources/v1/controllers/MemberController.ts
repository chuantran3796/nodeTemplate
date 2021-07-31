import { NextFunction, Request, Response } from "express";
import { Member } from "../../../models";

export default {
  createMember: async (req: Request, res: Response, next: NextFunction) => {
    const { name, avatar, id, fcm_token, email, student_code } = req.body;

    console.log(name, avatar, id, fcm_token, email, student_code);
    const member = new Member({
      name: name,
      avatar: avatar,
      lms_id: id,
      fcm_token: fcm_token,
      student_code: student_code,
      email: email,
    });

    return member
      .save()
      .then(async (data: any) => {
        const member = JSON.parse(JSON.stringify(data));
        delete member.id;
        delete member.student_code;
        delete member.email;
        delete member.name;
        delete member.avatar;
        delete member.lms_id;
        delete member.fcm_token;
        delete member.__v;
        delete member.createdAt;
        delete member.updatedAt;
        return res.json({
          data,
        });
      })
      .catch((error: any) =>
        res.status(500).json({
          message: error.message,
          error,
        })
      );
  },
  getMember: async (req: Request, res: Response, next: NextFunction) => {
    const { keyword } = req.query;

    console.log(keyword);

    // return Member.find({ name:{$regex: `/${keyword}/` }})
    return Member.find()

      .then(async (data: any) => {
        return res.json({
          data,
        });
      })
      .catch((error: any) =>
        res.status(500).json({
          message: error.message,
          error,
        })
      );
  },
};
