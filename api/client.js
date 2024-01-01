import { create } from 'apisauce';



const client = create({
    // for android virtual device to be able to see the api - ip address
    baseURL: "http://192.168.43.11/IM_DB_API/api/Movie/"
});

const { get } = client;

client.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);
    return response;
   
};

export default client;