import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6627978b0e3308c33a1c");

// This is the Project Id with dummy Questions and Answers
// client
//   .setEndpoint("https://cloud.appwrite.io/v1")
//   .setProject("662a61da6824b9c5f45a");

export const account = new Account(client);
export default client;
