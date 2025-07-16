"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../services/api";

export default function ProdutoNovo() {
  const router = useRouter();
  const [form, setForm] = useState({ nome: "", preco: "", descricao: "", imagemUrl: "" });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.nome || !form.preco) return alert("Nome e preço são obrigatórios!");
    await api.post("/produto", { ...form, preco: Number(form.preco) });
    router.push("/produtos");
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
      <h1 className="text-xl font-bold">Novo Produto</h1>
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" className="border p-2 rounded" required />
      <input name="preco" value={form.preco} onChange={handleChange} placeholder="Preço" type="number" step="0.01" className="border p-2 rounded" required />
      <input name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" className="border p-2 rounded" />
      <input name="imagemUrl" value={form.imagemUrl} onChange={handleChange} placeholder="URL da Imagem" className="border p-2 rounded" />

      {form.imagemUrl && (
        <img
          src={form.imagemUrl}
          alt="Pré-visualização"
          className="w-60 h-60 object-cover rounded mx-auto border"
          onError={e => (e.currentTarget.style.display = "none")}
        />
      )}

      <button type="submit" className="bg-green-900 text-white px-4 py-2 rounded cursor-pointer">Criar</button>
    </form>
  );
}