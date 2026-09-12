import LogoSvg from "@/components/logo-svg";


const SidebarRegister = () => {
    return (
        <div className="sticky top-0 flex h-screen w-[340px] shrink-0 flex-col gap-8 px-6 py-8">
            <div className="w-42.5">
                <LogoSvg color="black" />
            </div>
            
            <div className="h-auto w-auto bg-[#F7F0FB] rounded-xl py-3 px-4">
                <p className="text-[#631B97] text-[.8rem]">
                    Vamos preparar sua loja na Vitryne em 6 passos rápidos.
                </p>
            </div>
            <ul className="flex gap-y-1 flex-col">
                <li className="flex items-center gap-3 rounded-xl bg-[#F7F0FB] px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-[#9530D9] font-bold text-white">1</span>
                    <span className="text-[1rem] font-bold text-[#7E22BC]">Dados da loja</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-gray-200 font-bold text-gray-400">2</span>
                    <span className="text-[1rem] text-gray-600">Identidade visual</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-gray-200 font-bold text-gray-400">3</span>
                    <span className="text-[1rem] text-gray-600">Categorias & entregas</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-gray-200 font-bold text-gray-400">4</span>
                    <span className="text-[1rem] text-gray-600">Horarios</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-gray-200 font-bold text-gray-400">5</span>
                    <span className="text-[1rem] text-gray-600">Dados Bancarios</span>
                </li>
                <li className="flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer">
                    <span className="flex size-7 justify-center items-center rounded-full bg-gray-200 font-bold text-gray-400">6</span>
                    <span className="text-[1rem] text-gray-600">Primeiro Produto</span>
                </li>
            </ul>
        </div>
    )
}

export default SidebarRegister