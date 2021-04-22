import { NextFunction, Request, Response } from "express";
var firebase = require("firebase-admin");
firebase.initializeApp({
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  credential: firebase.credential.cert({
    projectId: "englishtown-28cbc",
    clientEmail:
      "firebase-adminsdk-fcbm2@englishtown-28cbc.iam.gserviceaccount.com",
    privateKey:
      "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQaVnz5KPzZ3Uq\nWDjpIrMiucdcdiADfJRiSvT3HgdFTVcYSQ92rse3kdfJM2mCz9gksPCRH/Esj0+V\nYEAfqrCrlRfUH2YQkNeJVfWefpJQed2Hlzv0t5nDNE2qS1DyMrdxhX+cnKDKqhAm\nf5kHxHykH6neeDD8hYjSLABX36L9d9J0Dlij4slBtZorZ5vRScGGtJ1g5axfhOAa\n7O7vb5Gu0yCKWYwVbTrndTGFuZPU+0l7GGFF9VkdTTAovOXWVw7BaX2Id2Y9ydZb\nMRoFy4B7swhHkBOvmA7Hj7DD6BpFPgBIsIyOLQWzy9OFPdodLmi7bt4pSFHf8BVy\nHrREXL4dAgMBAAECggEACh3obUZ0DvoUCJzaZmF2K1a0BButLNN8qyjTALacc74a\ntDsXsmiERAz4WfP88zSpBrRFeUYBAcC92ZUf3RRUGdWASp5w6JefXt36sQRD5f7Z\nxMiP8y6BGvthqcVDhf5K7rUkSgibEDt2fT1Ebcluo35F/glSQhqEAcUmXx2kCS8U\nCWuvKWWJRsZ0VXhpb2e5PQNejO31OL/vC1tEsgzLeibKLLd4Gsahh9PkSkGy3KTc\ns0ERobV+1MnyCKWzRgulRO81fWKSvvPWt3d2C6jyVPa/KnsMzQPERXhGezxTVbPI\nV6y5rISAXap/c0QkCZQzCXKOhaJNzrBl2kEtD9cuoQKBgQD4cnCj09acq66mHX5G\n6sREzY7dPdltigxJ03p2JAp4hkiTSkzawrIfai5jWevdZi1UL1GGydltei9lo0us\nTyukcCzV8fjf6TBUbxmbHfoKkoktPyvQMAXfKNsb/+8CHjE1zZV+AnJWPH1ParqI\nbAGLh2mQlHSGnaleAy9fSQ8k1wKBgQDWv1TqQ8KSKsGbVFe3aOVa3eZgMX3NbB/D\n737p4c5xpvbIn2hcmJKiKIIg73PRmpoikGivxf8fYgjbQ8z3WVXZ2trSx2og7GzY\nxx19XevNM1K5PoDcfgX1Xi2347hnmbWctexiIkzao0fhoMTS11ozAxMJ+MHry8FO\n7noCSNsiKwKBgHaHEln2XHLOLTou4+mtYwl4D+pY8Xwi2g32iHwIYb5yQfmS/ut2\n60e1foADjFVJw+Jf2MM3VTW3jxksOJPyCV4f7iP7lsIsG9SMVGj+eiXFFxCxDJP7\n9TEr6qyHA129TbjfZayCOk4N+bKDto4TCQGqDqDdUmJOoViqqFULI+BtAoGBAJFW\n7x6Z+563h08cVz2PpeLI2flypYUZT6ppdgjOxc0Pxmhj0tsQe/V52xB1X3qV2wnX\nmLKWG6Pe0sWrbpZdhQgr4fvT8RUVTlms8V1+6m93893h2o7gUCIPunuBiLW9Rzgn\nvDNyqXc0GRswluVn0OlDhGg0TvLKdSt5pWPUcVL/AoGBAIe8+3HEd0e123DKXofR\nyHex4fVFkxPuIqs1Uu7e1nj/bnhn60uAfCeEA8Y5Uv2/hDYN6hx9s9Ia2iCttTWa\nn92DbU1BD5enULTAM5MXqPkpWsZNeq/0/Y6kENyWRiZ2ebh6Bc7Fru5qvS9QIJxM\npJR4SwHuVjsDo34Xxvz96T9c\n-----END PRIVATE KEY-----\n",
  }),
});

export default {
  send: async (req: any, res: Response, next: NextFunction) => {
    // This registration token comes from the client FCM SDKs.
    var registrationToken =
      "dgyLLgo5Q_OwaLYxCHcphs:APA91bGb3hlUIv6hYUEo13J_Dl-9qSUS7MhGiQS_pkAytgEo2iRuBil5IDSRkF2cAXzGGDjzCaIfjkPvVWfsR1UzkD3DpQ9I6r3YyQ9cJK8Riu2MYHrgS0GeDWgtcBtQkj6Ya_nFZUpL";
    var condition = "'stock-GOOG' in topics || 'industry-tech' in topics";

    var message = {
      notification: {
        title: "$FooCorp up 1.43% on the day",
        body:
          "$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.",
      },
      data: {
        deepLink: "chich",
      },
      // condition: condition,
      android: {
        notification: {
          icon: "stock_ticker_update",
          color: "#7e55c3",
          image: "https://foo.bar.pizza-monster.png",
        },
      },
      token: registrationToken,
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    firebase
      .messaging()
      .send(message)
      .then((response: Response) => {
        return res.status(200).json({
          message: "Successfully sent message",
        });
      })
      .catch((error: any) => {
        return res.status(404).json({
          message: error,
        });
      });
  },
};
