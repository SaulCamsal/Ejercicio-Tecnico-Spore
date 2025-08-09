//Recibe los roles y los verifica con el del usuario
//Si el rol del usuario no está en la lista de roles permitidos, se deniega
const checkRole = (roles) => (req, res, next) => {
  if (!roles.includes(req.userRole)) {
    return res.status(403).json({ message: 'Acceso no autorizado' });
  }
  next();
};

module.exports = checkRole;