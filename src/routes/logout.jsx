export const logout =() => {
    localStorage.removeItem('loggedIn');
    window.location.href = '/root';
}