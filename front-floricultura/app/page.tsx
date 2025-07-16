"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:4000/produto")
      .then((res) => res.json())
      .then((data) => setProdutos(data));
  }, []);

  return (
    <div className="min-h-screen p-8 bg-white text-black w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Catálogo de Produtos
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full mx-auto">
        {produtos.map((p: any) => (
            <div
            key={p.id}
            className="bg-neutral-0 rounded-xl shadow-md flex flex-col items-center p-4 hover:scale-105 transition-transform cursor-pointer border-2 border-green-800"
            onClick={() => setProdutoSelecionado(p)}
            >
            <img
              src={p.imagemUrl}
              alt={p.nome}
              className="w-40 h-40 object-cover rounded-lg mb-4 bg-white"
            />
            <div className="text-lg font-semibold mb-1 text-center">
              {p.nome}
            </div>
            <div className="text-green-800 font-medium text-center">
              R${" "}
              {Number(p.preco).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        ))}
      </div>

      {produtoSelecionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(243, 244, 246, 0.9)" }} 
        >
          <div className="bg-white rounded-2xl p-8 max-w-3xl w-full flex flex-col md:flex-row items-center relative text-black">
            <button
              onClick={() => setProdutoSelecionado(null)}
              className="absolute top-4 right-4 text-2xl font-bold text-gray-500 hover:text-black cursor-pointer"
              aria-label="Fechar"
            >
              ×
            </button>
            <img
              src={produtoSelecionado.imagemUrl}
              alt={produtoSelecionado.nome}
              className="w-72 h-72 object-cover rounded-xl mb-4 md:mb-0 md:mr-8 bg-white"
            />
            <div className="flex-1 flex flex-col justify-center">
              <h2 className="text-3xl font-bold mb-4 text-center md:text-left">
                {produtoSelecionado.nome}
              </h2>
              <p className="mb-6 text-lg text-center md:text-left">
                {produtoSelecionado.descricao || "Sem descrição."}
              </p>
              <div className="text-green-700 text-3xl font-bold text-center md:text-left">
                R${" "}
                {Number(produtoSelecionado.preco).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
