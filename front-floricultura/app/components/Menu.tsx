import Link from "next/link";

export default function Menu() {
  return (
    <header className="w-full bg-white shadow mb-8">
      <nav className="flex justify-between items-center h-20 max-w-full mx-auto px-10">
        <Link href="/" className="flex items-center">
          <i className="fa-solid fa-house text-2xl text-green-900"></i>
        </Link>
        <div className="flex gap-10 mx-auto">
          <Link href="/produtos" className="hover:underline text-black font-semibold text-lg">Produtos</Link>
          <Link href="/pedidos" className="hover:underline text-black font-semibold text-lg">Pedidos</Link>
          <Link href="/enderecos" className="hover:underline text-black font-semibold text-lg">Endereços</Link>
        </div>
        <div className="w-7" />
      </nav>
    </header>
  );
}