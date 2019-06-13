import { UserBS } from "../bs/UserBS";
import { UserDTO } from "../domain/UserDTO";

export class UserService {
	private app: any;

	public constructor(app: any) {
		this.app = app;
        this.initializeUserServiceRoutes();
	}

	public initializeUserServiceRoutes() {
        this.searchUserById();
	}

	private searchUserById() {
        let userBS: UserBS;
        let userSearcher: UserDTO;
        let userFound: UserDTO;

	  this.app.get('/user/:id', async(req, res) => {
	    try {

            if (!req.params.id) {
                    res.status(500).send('Invalid User Id');
            } else {
                userBS = new UserBS();
                userSearcher = new UserDTO();
                userSearcher.id = parseInt(req.params.id);
                
                await userBS.searchSingleUser(userSearcher)
                .then((userFound) => {
                    if (userFound) {
                        res.status(200).send(userFound);
                    } else {
                        res.status(404).send('User Not Found!');
                    }
                });
	        }

	    } catch(Exception) {
            console.log(Exception);
     		res.status(500).send('Server Error!');
	    }
	  });
	}
}
