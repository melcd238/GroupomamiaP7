export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }

  //ON vérifie le localstockage pour le user, 
  //S'il y a une connexion user avec accessToken(JWT), on retourne l'en-tête d'autorisation HTTP
  // sinon on retourne un objet vide