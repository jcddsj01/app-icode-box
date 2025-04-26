import React, { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";

export default function CPFGeneratorPage() {
    const [newCPF, setNewCPF] = useState("");
    const [copied, setCopied] = useState(false);
    const [valueSelect, setValueSelect] = useState("");

    const generateRandomDigit = () => String(Math.floor(Math.random() * 10));

    const calculateDigit = (cpfDigits) => {
        let sum = 0;
        for (let i = 0; i < cpfDigits.length; i++) {
            sum += Number(cpfDigits[i]) * (cpfDigits.length + 1 - i);
        }
        const result = (sum * 10) % 11;
        return result > 9 ? 0 : result;
    };

    const generatorNewCPF = () => {
        let nineDigits = "";
        for (let i = 0; i < 9; i++) {
            nineDigits += generateRandomDigit();
        }

        const cpfArray = nineDigits.split("");
        const firstDigit = calculateDigit(cpfArray);
        const secondDigit = calculateDigit([...cpfArray, firstDigit]);

        const cpfComplete = `${nineDigits}${firstDigit}${secondDigit}`;
        return cpfComplete;
    };

    const handleOptionChange = (event) => {
        const valueSelectInput = event.target.value;
        setValueSelect(valueSelectInput);
    };

    const handleGenerate = () => {
        let cpf = generatorNewCPF();

        if (valueSelect === "") {
            setNewCPF("Selecione uma opção \ne clique em 'GERAR CPF'");
            return;
        }

        if (valueSelect === "yes") {
            cpf = cpf
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        } else {
            cpf = cpf.replace(/\D/g, "");
        }

        setNewCPF(cpf);
    };

    const handleCopy = () => {
        if (valueSelect === "") return;
        navigator.clipboard.writeText(newCPF);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col justify-center items-center mx-6 sm:w-auto lg:w-[39rem] sm:ml-0 sm:mr-8 lg:ml-6">
            <h1 className="bg-gray-900 text-gray-50 text-2xl font-bold uppercase mb-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
                Gerador de CPF
            </h1>
            <div className="flex flex-col bg-gray-300 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
                <h3 className="text-sm font-medium mb-4 text-gray-950">
                    Utilize nosso gerador de CPF, basta clicar em "Gerar CPF" e pronto. Um novo número de CPF válido será gerado. Você ainda tem opção de colocar ou não os "pontos" entre os números.
                </h3>
                <div className="flex flex-col gap-2 text-gray-950">
                    <h2 className="font-semibold text-gray-950">Gerar com pontuação</h2>
                    <ul className="flex gap-5 justify-left items-center">
                        <li className="flex gap-1 justify-center items-center">
                            <input onChange={handleOptionChange} checked={valueSelect === "yes"} value="yes" type="radio" id="yes" name="CPFOption" className="cursor-pointer accent-gray-800" />
                            <label htmlFor="yes" className="cursor-pointer text-gray-950 text-sm font-semibold">Sim</label>
                        </li>
                        <li className="flex gap-1 justify-center items-center">
                            <input onChange={handleOptionChange} checked={valueSelect === "no"} value="no" type="radio" id="no" name="CPFOption" className="cursor-pointer accent-gray-800" />
                            <label htmlFor="no" className="cursor-pointer text-gray-950 font-semibold text-sm ">Não</label>
                        </li>
                    </ul>
                </div>
                <button
                    type="button"
                    onClick={handleGenerate}
                    className="flex justify-center items-center gap-2 mt-4 mb-2 shadow-[0px_4px_1px_0_#101828] active:translate-y-1 active:shadow-[0_1px_0_0_#101828] transition-all duration-150 cursor-pointer uppercase bg-gray-800 text-gray-50 py-2 w-full rounded-[2px_2px_4px_4px] hover:bg-gray-800/95"
                >
                    <RefreshCw title="Gerar CPF" className="w-5 h-5" />
                    Gerar CPF
                </button>
                <div className="flex flex-col gap-2 mt-2 mb-2 justify-center items-left">
                    <h1 className="font-semibold text-gray-950">CPF Gerado</h1>
                    <span
                        className={`flex justify-between items-center bg-gray-50 text-gray-800 font-semibold w-full py-1 px-2 h-auto rounded-[2px] border-1 border-gray-200
                            ${newCPF ? newCPF ? "border-gray-800" : "" : "py-4 px-2"}`}>
                        {newCPF}
                        <div className="flex justify-center items-center gap-1 h-0">
                            <button
                                type="button"
                                onClick={handleCopy}
                                className={`cursor-pointer ${newCPF ? "opacity-100" : "opacity-0 p-0 h-0"}`}
                            >
                                <Copy className="w-5 h-5 transition-all duration-300 ease-in-out" />
                            </button>
                            <span className={`text-green-700 text-sm font-medium transition-all duration-300
                                ${copied ? "opacity-100" : "opacity-0 hidden"}`}>
                                Copiado!
                            </span>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    );
}
