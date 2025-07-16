"use client";
import { useEffect, useState } from "react";
import api from "../services/api";
import Link from "next/link";

type Pedido = {
  id: number;
  nomeCliente: string;
  produto?: { nome: string };
  endereco?: { rua: string; numero: string };
  status: string;
};

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    api.get("/pedido").then((res) => {
      const pedidosOrdenados = res.data.sort((a: any, b: any) => {
        if (a.status === "RECEBIDO" && b.status !== "RECEBIDO") return -1;
        if (a.status !== "RECEBIDO" && b.status === "RECEBIDO") return 1;
        return 0;
      });
      setPedidos(pedidosOrdenados);
    });
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("Deseja excluir este pedido?")) {
      await api.delete(`/pedido/${id}`);
      setPedidos(pedidos.filter((p: any) => p.id !== id));
    }
  };

  const handleConcluirEntrega = async (id: number) => {
    if (!confirm("Confirmar a entrega selecionada?")) return;
    await api.patch(`/pedido/${id}`, { status: "ENTREGUE" });
    const pedidosAtualizados = pedidos.map((p: any) =>
      p.id === id ? { ...p, status: "ENTREGUE" } : p
    );
    const pedidosOrdenados = pedidosAtualizados.sort((a: any, b: any) => {
      if (a.status === "RECEBIDO" && b.status !== "RECEBIDO") return -1;
      if (a.status !== "RECEBIDO" && b.status === "RECEBIDO") return 1;
      return 0;
    });
    setPedidos(pedidosOrdenados);
  };

  return (
    <div className="bg-white text-black min-h-screen container">
      <h1 className="text-2xl font-bold mb-4">Pedidos</h1>
      <Link href="/pedidos/novo" className="bg-green-900 text-white px-4 py-2 rounded">Novo Pedido</Link>
      <table className="w-full mt-4 border border-gray-300 bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-center">Cliente</th>
            <th className="p-2 text-center">Produto</th>
            <th className="p-2 text-center">Endereço</th>
            <th className="p-2 text-center">Status</th>
            <th className="p-2 text-center">Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p: any) => (
            <tr key={p.id} className="border-t border-gray-200">
              <td className="p-2 text-center">{p.nomeCliente}</td>
              <td className="p-2 text-center">{p.produto?.nome}</td>
              <td className="p-2 text-center">{p.endereco?.rua}, {p.endereco?.numero}</td>
              <td className="p-2 text-center">
                {p.status === "RECEBIDO" ? (
                  <span className="flex items-center justify-center gap-2">
                    <span>RECEBIDO</span>
                    <button
                      onClick={() => handleConcluirEntrega(p.id)}
                      className="text-2xl text-black hover:text-green-800 transition-transform duration-150 hover:scale-110"
                      title="Concluir entrega"
                    >
                      &#10003;
                    </button>
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2 text-green-700">
                    <span>ENTREGUE</span>
                    <span className="text-2xl">&#10003;</span>
                  </span>
                )}
              </td>
              <td className="p-2 flex gap-2 justify-center items-center">
                <Link href={`/pedidos/${p.id}`} className="text-green-800">Editar</Link>
                <button onClick={() => handleDelete(p.id)} className="text-red-800 cursor-pointer">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}