"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "../../services/api";

export default function EnderecoEditar() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [form, setForm] = useState({ rua: "", numero: "", bairro: "", cep: "", cidade: "", complemento: "" });

  useEffect(() => {
    api.get(`/endereco/${id}`).then(res => {
      const data = res.data;
      setForm({
        rua: data.rua || "",
        numero: data.numero || "",
        bairro: data.bairro || "",
        cep: data.cep || "",
        cidade: data.cidade || "",
        complemento: data.complemento || "",
      });
    });
  }, [id]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.rua || !form.numero || !form.cidade) return alert("Preencha os campos obrigatórios!");
    await api.patch(`/endereco/${id}`, form);
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
      <h1 className="text-xl font-bold">Editar Endereço</h1>
      <input name="rua" value={form.rua} onChange={handleChange} placeholder="Rua" className="border p-2 rounded" required />
      <input name="numero" value={form.numero} onChange={handleChange} placeholder="Número" className="border p-2 rounded" required />
      <input name="bairro" value={form.bairro} onChange={handleChange} placeholder="Bairro" className="border p-2 rounded" />
      <input name="cep" value={form.cep} onChange={handleChange} placeholder="CEP" className="border p-2 rounded" />
      <input name="cidade" value={form.cidade} onChange={handleChange} placeholder="Cidade" className="border p-2 rounded" required />
      <input name="complemento" value={form.complemento} onChange={handleChange} placeholder="Complemento" className="border p-2 rounded" />
      <button type="submit" className="bg-green-900 text-white px-4 py-2 rounded cursor-pointer">Salvar</button>
    </form>
  );
}