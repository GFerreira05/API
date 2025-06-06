import mongoose from "mongoose";

const enderecoSchema = new mongoose.Schema({
  rua: String,
  numero: Number,
  bairro: String,
  cidade: String,
  estado: String,
  cep: String
});

const clienteSchema = new mongoose.Schema({
  cpf: { type: String, required: true, unique: true },
  nome: { type: String, required: true },
  endereco: enderecoSchema,
  telefone: String,
  email: String
});

export default mongoose.model("Cliente", clienteSchema);
