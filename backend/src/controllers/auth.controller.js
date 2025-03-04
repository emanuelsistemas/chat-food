const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Geração de token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// @desc    Registrar um novo usuário
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { name, email, password, documentType, document, segment } = req.body;

    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este email já está cadastrado' 
      });
    }

    // Verificar se o documento já existe
    const documentExists = await User.findOne({ document });
    if (documentExists) {
      return res.status(400).json({ 
        success: false, 
        message: 'Este documento já está cadastrado' 
      });
    }

    // Criar usuário
    const user = await User.create({
      name,
      email,
      password,
      documentType,
      document,
      segment,
    });

    // Gerar token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Cadastro realizado com sucesso!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        documentType: user.documentType,
        document: user.document,
        segment: user.segment,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao registrar usuário',
      error: error.message,
    });
  }
};

// @desc    Login de usuário
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar se email e senha foram informados
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email e senha são obrigatórios',
      });
    }

    // Procurar usuário por email e incluir o campo de senha (excluído por padrão)
    const user = await User.findOne({ email }).select('+password');

    // Verificar se o usuário existe
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos',
      });
    }

    // Verificar se a senha está correta
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Email ou senha inválidos',
      });
    }

    // Verificar se o usuário está ativo
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: 'Esta conta está desativada',
      });
    }

    // Gerar token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao fazer login',
      error: error.message,
    });
  }
};
