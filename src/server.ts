import "dotenv/config";
import App from "./app";
import { IndexRoute } from "@module/index";
import { validateEnv } from "@core/utils";
import UsersRoute from "@module/users/users.route";
import AuthRoute from "@module/auth/auth.route";
import ProfileRoute from "@module/profile/profile.route";
import postsRoute from "@module/posts/posts.route";

validateEnv();
const routes = [
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProfileRoute(),
  new postsRoute(),
];

const app = new App(routes);

app.listen();
