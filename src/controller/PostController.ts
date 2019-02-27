import {
  NextFunction,
  Request,
  Response,
  Router
} from 'express';
import {
  Post
} from '../models/Post';
import * as rp from 'request-promise';
import * as mongoose from 'mongoose';




export class PostController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public async all(
    _: Request,
    res: Response,
    next: NextFunction,
  ): Promise < Response | void > {
    try {

      await mongoose.connection.close();
      const userId = _.body.userId
      const MONGO_URI: string = 'mongodb://localhost/user_' + userId;
      await mongoose.connect(MONGO_URI || process.env.MONGODB_URI);


      const data = await Post.find();
      await mongoose.connection.close();
      return res.status(200).json({
        data,
        message: 'success'
      });
    } catch (error) {
      next(error);
    }
  }

  
  public async fetchPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    let counter = 0;

    try {
      let options: any = {
        headers: {
          'User-Agent': 'request'
        },
        json: true
      }
      try {
        // mongoose.disconnect();
        let posts = await rp.get('https://jsonplaceholder.typicode.com/posts', options);


        for (let item of posts) {

          await mongoose.connection.close();
          let comments = await rp.get(`https://jsonplaceholder.typicode.com/comments?postId=${item.id}`, options);

          console.log("========>");


          const MONGO_URI: string = 'mongodb://localhost/user_' + item.userId;
          await mongoose.connect(MONGO_URI || process.env.MONGODB_URI);


          let postData = new Post({
            'userId': item.userId,
            'id': item.id,
            'body': item.body,
            'title': item.title,
            'comments': comments
          });

          let userData = await postData.save();

          await mongoose.connection.close();


          if (userData) {
            counter = counter + 1;
            console.log("data saved");
          }
          res.send({'message':`${counter} records saved`});


        }

      } catch (error) {
        res.send(error);

      }


    } catch (error) {
      return next(error.message);
    }
  }



  public routes() {
    this.router.post('/get-user-post', this.all);
    this.router.post('/fetch-posts', this.fetchPosts);
  }
}