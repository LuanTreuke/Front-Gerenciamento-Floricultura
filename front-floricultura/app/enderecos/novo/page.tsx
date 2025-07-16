"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from "../../services/api";

export default function EnderecoNovo() {
  const router = useRouter();
  const [form, setForm] = useState({ rua: "", numero: "", bairro: "", cep: "", cidade: "", complemento: "" });

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.rua || !form.numero || !form.cidade) return alert("Preencha os campos obrigatórios!");
    await api.post("/endereco", form);
    router.push("/enderecos");
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
      <h1 className="text-xl font-bold">Novo Endereço</h1>
      <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" className="border p-2 rounded" required />
      <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" className="border p-2 rounded" required />
      <input name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" className="border p-2 rounded" />
      <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" className="border p-2 rounded" />
      <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border p-2 rounded" required />
      <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" className="border p-2 rounded" />
      <button type="submit" className="bg-green-900 text-white px-4 py-2 rounded cursor-pointer">Criar</button>
    </form>
  );
}