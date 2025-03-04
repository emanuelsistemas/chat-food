const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware para proteger rotas
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Verificar se o token existe no header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Obter token do header ('Bearer [token]')
      token = req.headers.authorization.split(' ')[1];
    }

    // Verificar se o token existe
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Não autorizado, nenhum token fornecido',
      });
    }

    try {
      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adicionar o usuário ao request
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: 'Token inválido, usuário não encontrado',
        });
      }

      // Verificar se o usuário está ativo
      if (!req.user.isActive) {
        return res.status(401).json({
          success: false,
          message: 'Esta conta está desativada',
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Não autorizado, token inválido',
      });
    }
  } catch (error) {
    console.error('Erro no middleware de autenticação:', error);
    res.status(500).json({
      success: false,
      message: 'Erro no middleware de autenticação',
      error: error.message,
    });
  }
};

// Middleware para verificar permissões de admin
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Você não tem permissão para acessar este recurso',
      });
    }
    next();
  };
};
