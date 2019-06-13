import { UserBaseDAO } from './UserBaseDAO';
import { UserDTO } from '../domain/UserDTO';
import * as mysql from 'mysql';

export class UserMySqlDAO extends UserBaseDAO{
    public searchUsers(connectionReference: any, searchCriteria: UserDTO): Promise<Array<UserDTO>> {
        console.log("searchUsers -> MySql DAO!");

        return new Promise((resolve, reject) => {
            let sqlQuery: string;
            let formattedQuery: any;
            let preparedStatement: Array<any>;
            let userFoundList: Array<UserDTO>;
            let singleUser: UserDTO;

            try {
                preparedStatement = new Array<any>();
                userFoundList = new Array<UserDTO>();

                sqlQuery = "SELECT ";

                sqlQuery += "user.id,";
                sqlQuery += "user.name,";
                sqlQuery += "user.surname";

                sqlQuery += " FROM ";
                sqlQuery += "user";

                sqlQuery += " WHERE ";
                sqlQuery += "(1=1)";

                //SQL Query Area
                if (searchCriteria.id != null) {
                    sqlQuery += " AND (";
                    sqlQuery += "user.id = ?";
                    sqlQuery += ")";
                }

                //PreparedStatement Area
                if (searchCriteria.id != null) {
                    preparedStatement.push(searchCriteria.id);
                }

                formattedQuery = mysql.format(sqlQuery, preparedStatement);

                //Query Execution & ResultSet
                connectionReference.query(formattedQuery, (error, results, fields) => {
                    if (error) {
                        reject(error);
                    }

                    results.map((singleRow) => {
                        singleUser = new UserDTO();

                        singleUser.id = singleRow.id;
                        singleUser.name = singleRow.name;
                        singleUser.surname = singleRow.surname;

                        userFoundList.push(singleUser);
                    });

                    if (userFoundList.length == 0) {
                        userFoundList = null;
                    }

                    resolve(userFoundList);
                });

            } catch(Exception) {
                reject(Exception);
            }
        });
    }
} 