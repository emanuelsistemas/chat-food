const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Nome obrigatório'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email obrigatório'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Email inválido'],
    },
    password: {
      type: String,
      required: [true, 'Senha obrigatória'],
      minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
      select: false,
    },
    documentType: {
      type: String,
      enum: ['CPF', 'CNPJ'],
      required: [true, 'Tipo de documento obrigatório'],
    },
    document: {
      type: String,
      required: [true, 'Documento obrigatório'],
      unique: true,
      trim: true,
    },
    segment: {
      type: String,
      required: [true, 'Segmento obrigatório'],
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    }
  },
  {
    timestamps: true,
  }
);

// Hash da senha antes de salvar
UserSchema.pre('save', async function (next) {
  // Só executa o hash se a senha foi modificada
  if (!this.isModified('password')) {
    return next();
  }
  
  // Gera o salt e hash na senha
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método para verificar se a senha está correta
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
