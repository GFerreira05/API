import express from 'express';
import autenticarToken from '../middlewares/auth.js';
import {
  criarProduto,
  listarProdutos,
  obterProdutoPorId,
  atualizarProduto,
  deletarProduto
} from '../controllers/produto.controller.js';

const router = express.Router();

router.use(autenticarToken); // Protege todas as rotas abaixo

router.post('/', criarProduto);
router.get('/', listarProdutos);
router.get('/:id', obterProdutoPorId);
router.put('/:id', atualizarProduto);
router.delete('/:id', deletarProduto);

export default router;
