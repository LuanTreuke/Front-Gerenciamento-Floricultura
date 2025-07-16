"use client";
import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

export default function ProdutosPage() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("/produto").then((res) => setProdutos(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este produto?")) {
      try {
        await api.delete(`/produto/${id}`);
      } catch (error: any) {
        alert(error.response?.data?.message || "Erro ao excluir produto, verifique se ele está vinculado a algum pedido.");
      }
    }
  };

  return (
    <div className="bg-white text-black min-h-screen container">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      <Link href="/produtos/novo" className="bg-green-900 text-white px-4 py-2 rounded">Novo Produto</Link>
      <table className="w-full mt-4 border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-center">Imagem</th>
            <th className="p-2 text-center">Nome</th>
            <th className="p-2 text-center">Preço</th>
            <th className="p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((p: any) => (
            <tr key={p.id} className="border-t border-gray-200">
              <td className="p-2 text-center">
                {p.imagemUrl ? (
                  <img
                    src={p.imagemUrl}
                    alt={p.nome}
                    className="h-16 w-16 object-cover rounded mx-auto bg-white"
                  />
                ) : (
                  <span className="text-gray-400">Sem imagem</span>
                )}
              </td>
              <td className="p-2 text-center">{p.nome}</td>
              <td className="p-2 text-center">
                R$ {Number(p.preco).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </td>
              <td className="p-2 flex gap-2 justify-center items-center h-20">
                <Link href={`/produtos/${p.id}`} className="text-green-800">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-800 cursor-pointer">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}