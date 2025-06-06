import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema({
  codigoInterno: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  descricao: { type: String },
  valorUnitario: { type: Number, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria', required: true }
});

export default mongoose.model("Produto", produtoSchema);
