const jwt = require('jsonwebtoken');
//verificar el token de autenticación
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }
  //extraer token y verficarlo, si es valido añade los datos del usuario a la solicitud
  try {
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = verifyToken;