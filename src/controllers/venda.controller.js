import Venda from '../models/venda.model.js';
import Cliente from '../models/cliente.model.js';

export async function criarVenda(req, res) {
  try {
    const { data, numeroNota, cliente, produtos, totalVenda } = req.body;
    const existeCliente = await Cliente.findById(cliente);
    if (!existeCliente) return res.status(400).json({ mensagem: 'Cliente não encontrado' });
    const venda = new Venda({ data, numeroNota, cliente, produtos, totalVenda });
    await venda.save();
    res.status(201).json(venda);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar venda', erro: err.message });
  }
}

export async function listarVendas(req, res) {
  try {
    const { numeroNota, data } = req.query;
    let filtro = {};
    if (numeroNota) filtro.numeroNota = { $regex: numeroNota, $options: 'i' };
    if (data) filtro.data = { $regex: data, $options: 'i' };
    const vendas = await Venda.find(filtro).populate('cliente');
    res.json(vendas);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar vendas', erro: err.message });
  }
}

export async function obterVendaPorId(req, res) {
  try {
    const venda = await Venda.findById(req.params.id).populate('cliente');
    if (!venda) return res.status(404).json({ mensagem: 'Venda não encontrada' });
    res.json(venda);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar venda', erro: err.message });
  }
}

export async function atualizarVenda(req, res) {
  try {
    const venda = await Venda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!venda) return res.status(404).json({ mensagem: 'Venda não encontrada' });
    res.json(venda);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar venda', erro: err.message });
  }
}

export async function deletarVenda(req, res) {
  try {
    const venda = await Venda.findByIdAndDelete(req.params.id);
    if (!venda) return res.status(404).json({ mensagem: 'Venda não encontrada' });
    res.json({ mensagem: 'Venda removida com sucesso' });
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao deletar venda', erro: err.message });
  }
}
