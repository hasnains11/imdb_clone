import client from "../../api/client";

export const registerUser=(user) =>  client.post("signup", user);

