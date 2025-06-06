import express from 'express';
import autenticarToken from '../middlewares/auth.js';
import {
  criarVenda,
  listarVendas,
  obterVendaPorId,
  atualizarVenda,
  deletarVenda
} from '../controllers/venda.controller.js';

const router = express.Router();

router.use(autenticarToken); // Protege todas as rotas abaixo

router.post('/', criarVenda);
router.get('/', listarVendas);
router.get('/:id', obterVendaPorId);
router.put('/:id', atualizarVenda);
router.delete('/:id', deletarVenda);

export default router;
