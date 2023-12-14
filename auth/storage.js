import * as SecureStore from 'expo-secure-store';

const key = 'authToken';
const USER= 'user';

export const storeUser = async (user) => {
    try {
        // Convert the 'user' parameter to a JSON string
        const userString = JSON.stringify(user);
        console.log("userString", userString);
        // Store the JSON string in SecureStore
        const storedUserString=await SecureStore.setItemAsync(USER, userString);
        console.log("storedUserString", storedUserString);
        // Retrieve the stored user string from SecureStore
        const guser = await SecureStore.getItemAsync(USER);

        // Parse the JSON string back to an object
        const storedUserObject = JSON.parse(guser);

        console.log("storeToken", storedUserObject);
    } catch (error) {
        console.log("error", error);
        // Handle the error or throw a new error if needed
        // throw new Error('Error storing or retrieving the user');
    }
};



export const getUser = async () => {
    try {
        let user = await SecureStore.getItemAsync(USER);
        user=JSON.parse(user);
        return user ? user : null;
    } catch (error) {
        throw new Error('Error getting the auth token');
    }
};

export const removeUser = async () => {
    try {
        await SecureStore.deleteItemAsync(USER);
        console.log('user removed');
    } catch (error) {
        throw new Error('Error removing the auth token');
    }
};


export default {
    getUser,
    removeUser,
    storeUser: storeUser
};