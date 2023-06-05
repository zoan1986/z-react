import 'dotenv/config';
import App from "./app";
import { IndexRoute } from "./module/index";


const routes = [ new IndexRoute()];

const app = new App(routes);

app.listen();