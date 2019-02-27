import {
  Request,
  Response,
  Router
} from 'express';
import {
  User
} from '../models/User';
import * as request from 'request';
import * as mongoose from 'mongoose';

export class UserController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public all(req: Request, res: Response): void {
    User.find()
      .then((data) => {
        return res.status(200).json({
          data
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
        return error;
      });
  }

  public one(req: Request, res: Response): void {
    const {
      username
    } = req.params;

    User.findOne({
        username
      })
      .then((data) => {
        res.status(200).json({
          data
        });
      })
      .catch((error) => {
        res.status(500).json({
          error
        });
      });
  }

  public async updateAvatar(req:Request, res:Response) {
    console.log("router hit------->");
    let data = req.body;

    if (!data.userId){
      res.send({'message':'userId not found'});
    } else {
      console.log(mongoose.connection.db.databaseName);
      if(mongoose.connection.db.databaseName == 'master') {
       
  
      } else {
        const MONGO_URI: string = 'mongodb://localhost/master';
        await mongoose.connect(MONGO_URI || process.env.MONGODB_URI);
  
      }
  
     let  query = {id:data.userId};
       let   updateQuery = {
            $set: {
                  'avatar':data.avatar ? data.avatar:'',
                }
          };

        try{

            let data = await User.find(query);
            if(data && data.length > 0) {
               data =   await User.update(query,updateQuery);

               res.send({'message':'Avatar successfully updated'});
            }
        } catch(err){
            console.log(err);
            throw new Error(err);
        }

    }

   


  }

  
  public async fetchAllUsers(req: Request, res: Response) {
    console.log("router hit");
    let options: any = {
      headers: {
        'User-Agent': 'request'
      },
      json: true
    }
    let counter = 0;
    request.get('https://jsonplaceholder.typicode.com/users', options, async (error: any, response: any, body: any) => {

      for (let item of body) {
        const user = new User({
          'id': item.id,
          'name': item.name,
          'username': item.username,
          'email': item.email,
          'avatar': ''
        });
        try {
          let data = await user.save();

          if (data) {
            counter = counter + 1;
            console.log('One data saved');
          } else {
            console.log('Data not saved');
          }

        } catch (error) {
          console.log('error');

        }

      }
      console.log('Total data saved',counter);
      res.send({'message':'All users Fetched'});
    });

  }

  // set up our routes
  public routes() {
    this.router.get('/', this.all);
    this.router.post('/fetch-users', this.fetchAllUsers);
    this.router.get('/:username', this.one);
    this.router.post('/update-avatar', this.updateAvatar);
  }
}