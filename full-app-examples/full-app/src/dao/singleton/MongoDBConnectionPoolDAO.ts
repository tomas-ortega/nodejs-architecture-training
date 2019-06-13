import * as mongoDb from "mongodb";
import { DatabaseConnectionDTO } from "../../domain/DatabaseConnectionDTO";

export class MongoDBConnectionPoolDAO {
    private static _instance:MongoDBConnectionPoolDAO = new MongoDBConnectionPoolDAO();

    private _connectionPool:any = null;
    private _firstInstance:boolean = false;

    public constructor() {
        if(MongoDBConnectionPoolDAO._instance){
            throw new Error("Error: Instantiation failed: Use MongoDBConnectionPoolDAO.getInstance() instead of new.");
        }
        MongoDBConnectionPoolDAO._instance = this;
    }

    public static getInstance(configurationPool: DatabaseConnectionDTO):Promise<MongoDBConnectionPoolDAO>
    {
        let uri: string;

        return new Promise((resolve, reject) => {
            try {
                if (MongoDBConnectionPoolDAO._instance._connectionPool == null) {
                    uri = "mongodb://";
                    uri += configurationPool.hostName;
                    uri += ":";
                    uri += configurationPool.port;
                    uri += "/";
                    uri += configurationPool.databaseName;
    
    
                    let promise = mongoDb.MongoClient.connect(uri, configurationPool);
    
    
                    MongoDBConnectionPoolDAO._instance._firstInstance = true;
                    MongoDBConnectionPoolDAO._instance._connectionPool = promise;
    
                    console.log("MONGODB POOL FIRST INSTANCE");
    
                    resolve(MongoDBConnectionPoolDAO._instance);
    
                } else {
                    console.log("MONGODB POOL FROM MEMORY");
                    MongoDBConnectionPoolDAO._instance._firstInstance = false;
                    resolve(MongoDBConnectionPoolDAO._instance);
                }
    
            } catch(Exception) {
                reject(Exception);
            }
        });
    }

    public getFirstInstance(): boolean {
        return this._firstInstance;
    }


    public getConnectionPool(): any {
        return this._connectionPool;
    }
}