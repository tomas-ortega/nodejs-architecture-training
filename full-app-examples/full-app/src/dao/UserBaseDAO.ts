import { IUserDAO } from "./interfaces/IUserDAO";
import { UserDTO } from "../domain/UserDTO";

export class UserBaseDAO extends IUserDAO {
    //abstract searchUsers(connectionReference: any): Promise<Array<UserDTO>>;
    public searchUsers(connectionReference: any, searchCriteria: UserDTO): Promise<Array<UserDTO>> {
        console.log("searchUser -> UserBaseDAO!");

        return null;
    }
}