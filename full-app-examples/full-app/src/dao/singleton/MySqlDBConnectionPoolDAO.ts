import { DatabaseConnectionDTO } from "../../domain/DatabaseConnectionDTO";
import * as mysql from "mysql";

export class MySqlDBConnectionPoolDAO {
    private static _instance:MySqlDBConnectionPoolDAO = new MySqlDBConnectionPoolDAO();

    private _connectionPool:any = null;

    public constructor() {
        if(MySqlDBConnectionPoolDAO._instance){
            throw new Error("Error: Instantiation failed: Use MySqlConnectionPoolDAO.getInstance() instead of new.");
        }
        MySqlDBConnectionPoolDAO._instance = this;
    } 

    public static getInstance(configurationPool: DatabaseConnectionDTO):Promise<MySqlDBConnectionPoolDAO>
    {
        return new Promise((resolve, reject) => {
            try {
                if (this._instance._connectionPool == null) {
                    this._instance._connectionPool = mysql.createPool({
                        connectionLimit : 10,
                        connectTimeout  : 3000,
                        host            : configurationPool.hostName,
                        user            : configurationPool.userName,
                        password        : configurationPool.password,
                        database        : configurationPool.databaseName});
    
                    console.log("POOL FIRST INSTANCE");
                    resolve(MySqlDBConnectionPoolDAO._instance);
                } else {
                    console.log("POOL FROM MEMORY");
                    resolve(MySqlDBConnectionPoolDAO._instance);
                }
    
            } catch(Exception) {
                reject(Exception);
            }
        });
    }

    public getConnectionPool(): any {
        return this._connectionPool;
    }
}