import { UserDTO } from './../domain/UserDTO';
import { IUserDAO } from '../dao/interfaces/IUserDAO';
import { UserMongoDbDAO } from '../dao/UserMongoDbDAO';
import { UserMySqlDAO } from '../dao/UserMySqlDAO';
import { DatabaseConnectionDTO } from '../domain/DatabaseConnectionDTO';
import { DbConnection } from './DbConnection';

export class UserBS {

    public searchSingleUser(searchCriteria: UserDTO): Promise<UserDTO> {
        return new Promise(async(resolve, reject) => {
            await this.searchUsers(searchCriteria)
            .then((userFoundList) => {
                if (userFoundList) {
                    resolve(userFoundList[0]);
                } else {
                    resolve(null);
                }
            });
        });
    }

    public searchUsers(searchCriteria: UserDTO): Promise<Array<UserDTO>> {
        let connectionReference: any;
        let engineDbType: string;
        let iUserDAO: IUserDAO;
        let databaseInfoConnection: DatabaseConnectionDTO;

        return new Promise(async(resolve, reject) => {
            try {
                connectionReference = await DbConnection.getDbConnection()
                .catch((error) => {
                    reject(error);
                });

                engineDbType = process.env.DATABASE_TYPE;
                engineDbType = "MONGODB";
                //databaseInfoConnection = new DatabaseConnectionDTO();

                if (engineDbType === 'MONGODB') {
                   // databaseInfoConnection.getMongoDbConnectionData();
                    iUserDAO = new UserMongoDbDAO();
                } else if (engineDbType === 'MYSQL') {
                    //databaseInfoConnection.getMySqlConnectionData();
                    console.log("MYSQL DATA: ", databaseInfoConnection);
                    iUserDAO = new UserMySqlDAO();
                }

                iUserDAO.sayHelloInAllDbEngines(connectionReference);
                iUserDAO.searchUsers(connectionReference, searchCriteria)
                    .then((userFoundList) => {
                        resolve(userFoundList);
                    }); 
            } catch(Error) {
                reject(Error);
            } finally {
                DbConnection.closeConnection(connectionReference);
            }
        });
    }
}
