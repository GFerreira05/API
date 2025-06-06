import Cliente from '../models/cliente.model.js';

export async function criarCliente(req, res) {
  try {
    const { cpf, nome, endereco, telefone, email } = req.body;
    const cliente = new Cliente({ cpf, nome, endereco, telefone, email });
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao criar cliente', erro: err.message });
  }
}

export async function listarClientes(req, res) {
  try {
    const { nome, cpf } = req.query;
    let filtro = {};
    if (nome) filtro.nome = { $regex: nome, $options: 'i' };
    if (cpf) filtro.cpf = { $regex: cpf, $options: 'i' };
    const clientes = await Cliente.find(filtro);
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao listar clientes', erro: err.message });
  }
}

export async function obterClientePorId(req, res) {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ mensagem: 'Erro ao buscar cliente', erro: err.message });
  }
}

export async function atualizarCliente(req, res) {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao atualizar cliente', erro: err.message });
  }
}

export async function deletarCliente(req, res) {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json({ mensagem: 'Cliente removido com sucesso' });
  } catch (err) {
    res.status(400).json({ mensagem: 'Erro ao deletar cliente', erro: err.message });
  }
}
