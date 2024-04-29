import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("662a61da6824b9c5f45a");

export const account = new Account(client);
export const database = new Databases(client);
export default client;
