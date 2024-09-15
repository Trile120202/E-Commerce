export const apiCall = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
        // throw new Error('No token found');
    }

    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Request failed');
        }

        return await response.json();
    } catch (error) {
        console.error('API Call Error:', error);
        throw error;
    }
};
