"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function PedidoNovo() {
  const router = useRouter();
  const [produtos, setProdutos] = useState([]);
  const [enderecos, setEnderecos] = useState([]);
  const [form, setForm] = useState({
    nomeCliente: "",
    produtoId: "",
    enderecoId: "",
    status: "RECEBIDO",
    observacao: "",
  });

  useEffect(() => {
    api.get("/produto").then(res => setProdutos(res.data));
    api.get("/endereco").then(res => setEnderecos(res.data));
  }, []);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.nomeCliente || !form.produtoId || !form.enderecoId) return alert("Preencha todos os campos obrigatórios!");
    await api.post("/pedido", { ...form, produtoId: Number(form.produtoId), enderecoId: Number(form.enderecoId) });
    router.push("/pedidos");
  };

  return (
    <form onSubmit={handleSubmit} className="relative max-w-md mx-auto flex flex-col gap-4 bg-white text-black p-8 rounded shadow">
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black cursor-pointer"
        aria-label="Fechar"
      >
        ×
      </button>
      <h1 className="text-xl font-bold">Novo Pedido</h1>
      <input name="nomeCliente" value={form.nomeCliente} onChange={handleChange} placeholder="Nome do Cliente" className="border p-2 rounded" required />
      <select name="produtoId" value={form.produtoId} onChange={handleChange} className="border p-2 rounded" required>
        <option value="">Selecione o Produto</option>
        {produtos.map((p: any) => (
          <option key={p.id} value={p.id}>{p.nome}</option>
        ))}
      </select>
      <select name="enderecoId" value={form.enderecoId} onChange={handleChange} className="border p-2 rounded" required>
        <option value="">Selecione o Endereço</option>
        {enderecos.map((e: any) => (
          <option key={e.id} value={e.id}>{e.rua}, {e.numero}</option>
        ))}
      </select>
      <textarea name="observacao" value={form.observacao} onChange={handleChange} placeholder="Observação" className="border p-2 rounded" />
      <button type="submit" className="bg-green-900 text-white px-4 py-2 rounded cursor-pointer">Criar</button>
    </form>
  );
}