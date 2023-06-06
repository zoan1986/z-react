import 'dotenv/config';
import App from "./app";
import { IndexRoute } from "@module/index";
import { validateEnv } from "@core/utils";
import UsersRoute from '@module/users/users.route';

validateEnv();
const routes = [ new IndexRoute(), new UsersRoute()];

const app = new App(routes);

app.listen();