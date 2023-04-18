import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // If there is a token and it's not expired, return `true`
    return token ? true : false;
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);

    window.location.assign('/me');
  }

  logout() {
    localStorage.removeItem('id_token');
    // localStorage.removeItem('saved');
    window.location.reload();
  }

  getName(){
    const data = localStorage.getItem('name');    
    // localStorage.removeItem('saved');
    return data;
  }
  getEmail(){
    const data = localStorage.getItem('email');    
    // localStorage.removeItem('saved');
    return data;
  }

  setInfo( firstName, lastName, email){
    localStorage.setItem("name", firstName+" "+lastName )
    localStorage.setItem("email", email )
  }
  removeInfo( firstName, lastName, email){
    localStorage.removeItem("name")
    localStorage.removeItem("email")
  }
  reload(){
    window.location.reload()
  }
}
// eslint-disable-next-line
export default new AuthService();
