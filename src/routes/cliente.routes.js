import express from 'express';
import autenticarToken from '../middlewares/auth.js';
import {
  criarCliente,
  listarClientes,
  obterClientePorId,
  atualizarCliente,
  deletarCliente
} from '../controllers/cliente.controller.js';

const router = express.Router();

router.use(autenticarToken); // Protege todas as rotas abaixo

router.post('/', criarCliente);
router.get('/', listarClientes);
router.get('/:id', obterClientePorId);
router.put('/:id', atualizarCliente);
router.delete('/:id', deletarCliente);

export default router;
