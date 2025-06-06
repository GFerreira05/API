import express from 'express';
import autenticarToken from '../middlewares/auth.js';
import {
  criarCategoria,
  listarCategorias,
  obterCategoriaPorId,
  atualizarCategoria,
  deletarCategoria
} from '../controllers/categoria.controller.js';

const router = express.Router();

router.use(autenticarToken); // Protege todas as rotas abaixo

router.post('/', criarCategoria);
router.get('/', listarCategorias);
router.get('/:id', obterCategoriaPorId);
router.put('/:id', atualizarCategoria);
router.delete('/:id', deletarCategoria);

export default router;
