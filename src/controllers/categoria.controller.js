import Categoria from '../models/categoria.model.js';

export async function criarCategoria(req, res) {
  try {
    const { nome, descricao } = req.body;
    const categoria = new Categoria({ nome, descricao });
    await categoria.save();
    res.status(201).json(categoria);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar categoria', erro: err.message });
  }
}

export async function listarCategorias(req, res) {
  try {
    const { nome, descricao } = req.query;
    let filtro = {};
    if (nome) filtro.nome = { $regex: nome, $options: 'i' };
    if (descricao) filtro.descricao = { $regex: descricao, $options: 'i' };
    const categorias = await Categoria.find(filtro);
    res.json(categorias);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar categorias', erro: err.message });
  }
}

export async function obterCategoriaPorId(req, res) {
  try {
    const categoria = await Categoria.findById(req.params.id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar categoria', erro: err.message });
  }
}

export async function atualizarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    res.json(categoria);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar categoria', erro: err.message });
  }
}

export async function deletarCategoria(req, res) {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);
    if (!categoria) return res.status(404).json({ mensagem: 'Categoria não encontrada' });
    res.json({ mensagem: 'Categoria removida com sucesso' });
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao deletar categoria', erro: err.message });
  }
}
