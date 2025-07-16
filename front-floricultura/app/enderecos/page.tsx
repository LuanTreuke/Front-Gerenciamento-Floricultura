"use client";
import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

export default function EnderecosPage() {
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    api.get("/endereco").then((res) => setEnderecos(res.data));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este endereço?")) {
      try {
        await api.delete(`/endereco/${id}`);
        setEnderecos(enderecos.filter((e: any) => e.id !== id));
      } catch (error: any) {
        alert(error.response?.data?.message || "Erro ao excluir endereço, verifique se ele está vinculado a algum pedido.");
      }
    }
  };

  return (
    <div className="bg-white text-black min-h-screen container">
      <h1 className="text-2xl font-bold mb-4">Endereços</h1>
      <Link href="/enderecos/novo" className="bg-green-900 text-white px-4 py-2 rounded">Novo Endereço</Link>
      <table className="w-full mt-4 border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-center">Rua</th>
            <th className="p-2 text-center">Cidade</th>
            <th className="p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {enderecos.map((e: any) => (
            <tr key={e.id} className="border-t border-gray-200">
              <td className="p-2 text-center">{e.rua}, {e.numero}</td>
              <td className="p-2 text-center">{e.cidade}</td>
              <td className="p-2 flex gap-2 justify-center items-center">
                <Link href={`/enderecos/${e.id}`} className="text-green-800">Editar</Link>
                <button onClick={() => handleDelete(e.id)} className="text-red-800 cursor-pointer">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}