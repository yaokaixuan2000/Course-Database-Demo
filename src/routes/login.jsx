export const checkLoginStatus = async () => {
    const loggedInFromLocalStorage = localStorage.getItem('loggedIn');
    return loggedInFromLocalStorage === 'true';
};