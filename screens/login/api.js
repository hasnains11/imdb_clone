import client from '../../api/client';

export const loginApiReq = (email, password) =>
    client.post('login', { email, password });

 