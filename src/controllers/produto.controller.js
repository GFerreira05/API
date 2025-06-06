import Produto from '../models/produto.model.js';
import Categoria from '../models/categoria.model.js';

export async function criarProduto(req, res) {
  try {
    const { codigoInterno, nome, descricao, valorUnitario, categoria } = req.body;
    const existeCategoria = await Categoria.findById(categoria);
    if (!existeCategoria) return res.status(400).json({ mensagem: 'Categoria não encontrada' });
    const produto = new Produto({ codigoInterno, nome, descricao, valorUnitario, categoria });
    await produto.save();
    res.status(201).json(produto);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar produto', erro: err.message });
  }
}

export async function listarProdutos(req, res) {
  try {
    const { nome, descricao } = req.query;
    let filtro = {};
    if (nome) filtro.nome = { $regex: nome, $options: 'i' };
    if (descricao) filtro.descricao = { $regex: descricao, $options: 'i' };
    const produtos = await Produto.find(filtro).populate('categoria');
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar produtos', erro: err.message });
  }
}

export async function obterProdutoPorId(req, res) {
  try {
    const produto = await Produto.findById(req.params.id).populate('categoria');
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: err.message });
  }
}

export async function atualizarProduto(req, res) {
  try {
    const produto = await Produto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json(produto);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar produto', erro: err.message });
  }
}

export async function deletarProduto(req, res) {
  try {
    const produto = await Produto.findByIdAndDelete(req.params.id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.json({ mensagem: 'Produto removido com sucesso' });
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao deletar produto', erro: err.message });
  }
}
