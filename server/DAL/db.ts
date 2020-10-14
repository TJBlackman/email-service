import { MongoClient } from "https://deno.land/x/mongo@v0.12.1/mod.ts";

const client = new MongoClient();
client.connectWithUri("mongodb://localhost:27017");

export const db = client.database("email-service"); 