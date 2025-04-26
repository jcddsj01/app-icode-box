import React, { useState } from "react";
import { RefreshCw, Copy } from "lucide-react";

export default function CNPJGeneratorPage() {
  const [newCNPJ, setNewCNPJ] = useState("");
  const [copied, setCopied] = useState(false);
  const [valueSelect, setValueSelect] = useState("");

  const generateRandomDigit = () => String(Math.floor(Math.random() * 10));

  const calculateDigit = (cnpjDigits, multiplicators) => {
    const sum = cnpjDigits.reduce(
      (acc, digit, index) => acc + Number(digit) * multiplicators[index],
      0
    );
    const result = sum % 11;
    return result < 2 ? 0 : 11 - result;
  };

  const generatorNewCNPJ = () => {
    let baseCNPJ = Array.from({ length: 8 }, generateRandomDigit).join("");

    const multiplicatorsFirst = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const multiplicatorsSecond = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    const baseWithBranch = baseCNPJ + "0001";
    const cnpjArray = baseWithBranch.split("");

    const firstDigit = calculateDigit(cnpjArray, multiplicatorsFirst);
    const secondDigit = calculateDigit([...cnpjArray, firstDigit], multiplicatorsSecond);

    return `${baseWithBranch}${firstDigit}${secondDigit}`;
  };

  const handleOptionChange = (event) => {
    setValueSelect(event.target.value);
  };

  const handleGenerate = () => {
    if (!valueSelect) {
      setNewCNPJ("Selecione uma opção\ne clique em 'GERAR CNPJ'");
      return;
    }

    let cnpj = generatorNewCNPJ();

    if (valueSelect === "yes") {
      cnpj = cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }

    setNewCNPJ(cnpj);
  };

  const handleCopy = () => {
    if (!newCNPJ || valueSelect === "") return;
    navigator.clipboard.writeText(newCNPJ);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-6 sm:w-auto lg:w-[39rem] sm:ml-0 sm:mr-8 lg:ml-6">
      <h1 className="bg-gray-900 text-gray-50 text-2xl font-bold uppercase mb-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        Gerador de CNPJ
      </h1>

      <div className="flex flex-col bg-gray-300 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        <h3 className="text-sm font-medium mb-4 text-gray-950">
          Utilize nosso gerador de CNPJ, basta clicar em "Gerar CNPJ" e pronto. Um novo número de CNPJ válido será gerado. Você ainda tem opção de colocar ou não os "pontos" e "barra" entre os números.
        </h3>

        <div className="flex flex-col gap-2 text-gray-950">
          <h2 className="font-semibold text-gray-950">Gerar com pontuação</h2>
          <ul className="flex gap-5 items-center">
            <li className="flex gap-1 items-center">
              <input
                onChange={handleOptionChange}
                checked={valueSelect === "yes"}
                value="yes"
                type="radio"
                id="yes"
                name="CNPJOption"
                className="cursor-pointer accent-gray-800"
              />
              <label htmlFor="yes" className="cursor-pointer text-sm font-semibold">Sim</label>
            </li>
            <li className="flex gap-1 items-center">
              <input
                onChange={handleOptionChange}
                checked={valueSelect === "no"}
                value="no"
                type="radio"
                id="no"
                name="CNPJOption"
                className="cursor-pointer accent-gray-800"
              />
              <label htmlFor="no" className="cursor-pointer text-sm font-semibold">Não</label>
            </li>
          </ul>
        </div>

        <button
          type="button"
          onClick={handleGenerate}
          className="flex justify-center items-center gap-2 mt-4 mb-2 shadow-[0px_4px_1px_0_#101828] active:translate-y-1 active:shadow-[0_1px_0_0_#101828] transition-all duration-150 cursor-pointer uppercase bg-gray-800 text-gray-50 py-2 w-full rounded-[2px_2px_4px_4px] hover:bg-gray-800/95"
        >
          <RefreshCw className="w-5 h-5" />
          Gerar CNPJ
        </button>

        <div className="flex flex-col gap-2 mt-2 mb-2 justify-center items-left">
          <h1 className="font-semibold text-gray-950">CNPJ Gerado</h1>
          <span
              className={`flex justify-between items-center bg-gray-50 text-gray-800 font-semibold w-full py-1 px-2 h-auto rounded-[2px] border-1 border-gray-200
                  ${newCNPJ ? newCNPJ ? "border-gray-800" : "" : "py-4 px-2"}`}>
              {newCNPJ}
              <div className="flex justify-center items-center gap-1 h-0">
                  <button
                      type="button"
                      onClick={handleCopy}
                      className={`cursor-pointer ${newCNPJ ? "opacity-100" : "opacity-0 p-0 h-0"}`}
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
