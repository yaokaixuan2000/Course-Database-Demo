
export const checkLoginStatus = async () => {
    try {
        const response = await fetch('/api/check-login'); // 根据实际情况调用你的后端接口
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Failed to check login status');
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        throw error;
    }
};
