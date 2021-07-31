import { NextFunction, Request, Response } from "express";
import { Member, Room } from "../../../models";

export default {
  createRoom: async (req: Request, res: Response, next: NextFunction) => {
    const { name, author, avatar, members } = req.body;

    const member = await Member.insertMany(members);

    const room = new Room({
      name: name,
      author: author,
      avatar: avatar,
      members: member,
    });

    return room
      .save()
      .then(async (data: any) => {
        const room = JSON.parse(JSON.stringify(data));
        delete room.id;
        delete room.author;
        delete room.members;
        delete room.name;
        delete room.__v;
        delete room.createdAt;
        delete room.updatedAt;
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
  getRoom: async (req: Request, res: Response, next: NextFunction) => {
    const { page, size } = req.params;

    let perPage = 10 || size; // số lượng sản phẩm xuất hiện trên 1 page
    let pageCurrent: number | any = page || 1;
    return Room.find()
      .populate("Member")
      .skip(perPage * pageCurrent - perPage) // Trong page đầu tiên sẽ bỏ qua giá trị là 0
      .limit(perPage)
      .exec()
      .then(async (data: any) => {
        return res.json({
          data,
          pagination: {
            totalItems: 8,
            totalPages: 3,
            currentPage: 1,
          },
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
