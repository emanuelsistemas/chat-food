const User = require('../models/User');

// @desc    Obter perfil do usuário atual
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        documentType: user.documentType,
        document: user.document,
        segment: user.segment,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Erro ao obter perfil do usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao obter perfil do usuário',
      error: error.message,
    });
  }
};

// @desc    Atualizar perfil do usuário
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuário não encontrado',
      });
    }

    // Campos que podem ser atualizados
    const { name, email, segment } = req.body;

    // Verificar se o email já está em uso por outro usuário
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({
          success: false,
          message: 'Este email já está sendo usado por outro usuário',
        });
      }
    }

    // Atualizar os campos
    if (name) user.name = name;
    if (email) user.email = email;
    if (segment) user.segment = segment;

    // Salvar as alterações
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Perfil atualizado com sucesso!',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        documentType: user.documentType,
        document: user.document,
        segment: user.segment,
        role: user.role,
      },
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar perfil do usuário',
      error: error.message,
    });
  }
};
