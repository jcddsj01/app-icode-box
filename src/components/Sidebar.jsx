import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Sidebar({ onLinkClick }) {
    const linkGenerator = [
        { link: "cpf-generator", title: "Gerador de CPF" },
        { link: "cnpj-generator", title: "Gerador de CNPJ" },
    ];

    const linkValidator = [
        { link: "cpf-validator", title: "Validador de CPF" },
        { link: "cnpj-validator", title: "Validador de CNPJ" },
    ];

    return (
        <nav className="w-full sm:mx-[2rem] sm:w-[16rem] bg-gray-300 lg:mr-0 lg:ml-[10rem] h-0">
            <ul className="flex flex-col gap-2 w-full p-4 rounded-[2px] bg-gray-300 shadow-[0px_3px_3px_0_#99a1af]">
                <li>
                    <h1 className="uppercase font-bold px-2 py-2 mb-2 text-lg text-gray-50 rounded-[2px] bg-gray-900 shadow-[0px_3px_3px_0_#99a1af]">
                        Geradores
                    </h1>
                    <ul className="flex flex-col bg-gray-300 rounded-[2px] mb-2 mt-1 shadow-[0px_3px_3px_0_#99a1af]">
                        {linkGenerator.map((item, index) => (
                            <li key={item.link} className={`cursor-pointer bg-gray-50 rounded-[2px] text-base py-1 px-2 font-medium text-gray-900 hover:bg-gray-200
                            ${index === linkGenerator.length - 1 ? "border-b-0" : "border-b border-gray-950"}`}>
                                <Link
                                    className="flex justify-between items-center"
                                    to={`/${item.link}`}
                                    onClick={onLinkClick}
                                    aria-label={`Ir para ${item.title}`}
                                >
                                    {item.title}
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>

                <li>
                    <h1 className="uppercase font-bold px-2 py-2 mb-2 text-lg text-gray-50 rounded-[2px] bg-gray-900 shadow-[0px_3px_3px_0_#99a1af]">
                        Validadores
                    </h1>
                    <ul className="flex flex-col bg-gray-300 rounded-[2px] mb-2 mt-1 shadow-[0px_3px_3px_0_#99a1af]">
                        {linkValidator.map((item, index) => (
                            <li key={item.link} className={`cursor-pointer bg-gray-50 rounded-[2px] text-base py-1 px-2 font-medium text-gray-900 hover:bg-gray-200
                            ${index === linkValidator.length - 1 ? "border-b-0" : "border-b border-gray-950"}`}>
                                <Link
                                    className="flex justify-between items-center"
                                    to={`/${item.link}`}
                                    onClick={onLinkClick}
                                    aria-label={`Ir para ${item.title}`}
                                >
                                    {item.title}
                                    <ChevronRight className="w-5 h-5" />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </nav>
    );
}
