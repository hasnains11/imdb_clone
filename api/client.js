import { create } from 'apisauce';



const client = create({
    // for android virtual device to be able to see the api - ip address
    baseURL: "http://localhost:52590/api/Movie/"
});


const { get } = client;

client.get = async (url, params, axiosConfig) => {
    const response = await get(url, params, axiosConfig);
    return response;
   
};

export default client;