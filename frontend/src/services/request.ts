import apiClient from './api';

async function request(endpoint: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
    try {
        const response = await apiClient.request({
            url: endpoint,
            method,
            data: body, // Axios يتعامل مع JSON تلقائيًا
        });

        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Something went wrong');
    }
}

export { request };
