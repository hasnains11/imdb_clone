import client from '../../api/client';

export const login = (email, password) =>
    client.post('login', { email, password });

 