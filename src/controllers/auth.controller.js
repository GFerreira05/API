import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function registrar(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ mensagem: "Preencha todos os campos." });
    }
    const existeUsuario = await User.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ mensagem: "E-mail já cadastrado." });
    }
    const hash = await bcrypt.hash(senha, 10);
    const novoUsuario = new User({ nome, email, senha: hash });
    await novoUsuario.save();
    res.status(201).json({ mensagem: "Usuário registrado com sucesso!" });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao registrar usuário.", erro: err.message });
  }
}

export async function login(req, res) {
  try {
    const { email, senha } = req.body;
    const usuario = await User.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ mensagem: "Usuário não encontrado." });
    }
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(400).json({ mensagem: "Senha inválida." });
    }
    const token = jwt.sign({ id: usuario._id, email: usuario.email }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, email: usuario.email } });
  } catch (err) {
    res.status(500).json({ mensagem: "Erro ao fazer login.", erro: err.message });
  }
}
