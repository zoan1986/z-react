import { Route } from "./core/interfaces";
import express from "express";
import mongoose from "mongoose";

class App{
    public app: express.Application;
    public port: string | number;

    constructor(routes: Route[]){
        this.app = express();
        this.port = process.env.PORT || 6000;

        this.initializeRoutes(routes);
        this.connectToDatabase();
    }

    public listen(){
        this.app.listen(this.port, () => { 
            console.log(`Server is listening on port ${this.port}`)
        });
    }
    
    private initializeRoutes(routes: Route[]){
        routes.forEach((route)=> {
            this.app.use('/', route.router);
        });
    }

    private connectToDatabase(){ 
        try {
            const connectString = process.env.MONGODB_URI;
            if(!connectString){
                console.log('Connection string is invalid');
                return;
            }
            mongoose.connect(connectString);
            console.log('DB connected');
        } catch (error){
            console.log('Connect BD error');
        }
    }

}

export default App; 