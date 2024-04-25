import { Client,Account } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6627978b0e3308c33a1c');


export const account = new Account(client);
export default client