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
            const connectString = 'mongodb+srv://gredo:123Phuong456@master.vntghuv.mongodb.net/z-react?retryWrites=true&w=majority';
            mongoose.connect(connectString);
            console.log('DB connected');
        } catch (error){
            console.log('Connect BD error');
        }
        // const { MongoClient, ServerApiVersion } = require('mongodb');
        // const uri = "";
        // // Create a MongoClient with a MongoClientOptions object to set the Stable API version
        // const client = new MongoClient(uri, {
        // serverApi: {
        //     version: ServerApiVersion.v1,
        //     strict: true,
        //     deprecationErrors: true,
        // }
        // });
        // async function run() {
        // try {
        //     // Connect the client to the server	(optional starting in v4.7)
        //     await client.connect();
        //     // Send a ping to confirm a successful connection
        //     await client.db("admin").command({ ping: 1 });
        //     console.log("Pinged your deployment. You successfully connected to MongoDB!");
        // } finally {
        //     // Ensures that the client will close when you finish/error
        //     await client.close();
        // }
        // }
        // run().catch(console.dir);
    }

}

export default App; 