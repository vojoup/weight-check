import Login from '../components/Login/Login';

export default function requireAuthentication(Component) {
  const user = localStorage.getItem('currentUser');
  return user ? Component : Login;
}
