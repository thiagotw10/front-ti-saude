export function isTokenValid() {
  const token = localStorage.getItem('token_ti');

  if (token) {
   return token
  }

  return false;
}
