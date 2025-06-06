import mongoose from "mongoose";

const produtoVendaSchema = new mongoose.Schema({
  codigoInterno: String,
  nome: String,
  quantidade: Number,
  valorUnitario: Number
});

const vendaSchema = new mongoose.Schema({
  data: { type: Date, required: true },
  numeroNota: { type: String, required: true, unique: true },
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  produtos: [produtoVendaSchema],
  totalVenda: Number
});

export default mongoose.model("Venda", vendaSchema);
