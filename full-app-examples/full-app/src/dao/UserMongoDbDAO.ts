import { UserBaseDAO } from "./UserBaseDAO";
import { UserDTO } from "../domain/UserDTO";

export class UserMongoDbDAO extends UserBaseDAO{
    public searchUsers(connectionReference: any, searchCriteria: UserDTO): Promise<Array<UserDTO>> {
        console.log("searchUsers -> Mongo Db DAO!");

        return new Promise((resolve, reject) => {

            const database = connectionReference.db('hosting');

            const collection = database.collection('user');

            collection.find({id: searchCriteria.id}).toArray((err, docs) => {
                resolve(docs);
            });
 
            

            //resolve(null); 

            /*collection.find({id: searchCriteria.id}).toArray((error, docs) => {
                resolve(docs);
            });*/
        });
    }
}