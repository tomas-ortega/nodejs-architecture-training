import { MainServices } from "./src/rest-api/MainServices";
import * as express from "express";

let app = express();

let router = express.Router();

function startServerAndServices() {
	app.use('/api', router);

	//Server Configuration
	let server = app.listen(3000, () => {
		let host: string = (server as any).address().address;
		let port: number = (server as any).address().port;

		console.log(`App Listening at http://${host}:${port}`);

	});


	//Routes objects instances
	new MainServices(router);

	//Export for testing purpose
	module.exports = app;
}

startServerAndServices();
