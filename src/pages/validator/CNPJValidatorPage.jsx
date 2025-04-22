import React, { useState } from "react";
import { Check, X, FileSearch } from "lucide-react";

// Função para calcular dígito verificador
function calculateDigit(cnpjDigits, multiplicators) {
  let sum = 0;
  for (let i = 0; i < multiplicators.length; i++) {
    sum += cnpjDigits[i] * multiplicators[i];
  }
  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

export default function CNPJValidatorPage() {
  const [inputCNPJ, setInputCNPJ] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  const handleChange = (event) => {
    let numberCNPJ = event.target.value.replace(/\D/g, "").slice(0, 14);
    numberCNPJ = numberCNPJ
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");

    setInputCNPJ(numberCNPJ);
    setWasValidated(false);
  };

  const handleValidate = () => {
    setWasValidated(true);

    const cleanedCNPJ = inputCNPJ.replace(/\D/g, "");

    if (
      cleanedCNPJ.length !== 14 ||
      /^(\d)\1+$/.test(cleanedCNPJ)
    ) {
      setIsValid(false);
      return;
    }

    const cnpjArray = cleanedCNPJ.split("").map(Number);

    const firstDigit = calculateDigit(
      cnpjArray.slice(0, 12),
      [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );
    const secondDigit = calculateDigit(
      [...cnpjArray.slice(0, 12), firstDigit],
      [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    );

    const isValidCNPJ =
      firstDigit === cnpjArray[12] && secondDigit === cnpjArray[13];

    setIsValid(isValidCNPJ);
  };

  return (
    <div className="flex flex-col justify-center items-center mx-6 sm:w-auto lg:w-[39rem] sm:ml-0 sm:mr-8 lg:ml-6">
      <h1 className="bg-gray-900 text-gray-50 text-2xl font-bold uppercase mb-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        Validador de CNPJ
      </h1>
      <div className="flex flex-col bg-gray-300 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        <h3 className="text-sm font-medium mb-4 text-gray-950">
          Digite um CNPJ e clique em "Validar CNPJ" para verificar se ele é verdadeiro ou falso.
        </h3>
        <div className="flex flex-col gap-2 text-gray-900">
          <label className="font-semibold text-gray-950" htmlFor="cnpjInput">
            Digite um CNPJ:
          </label>
          <input
            type="text"
            name="cnpj"
            autoComplete="off"
            inputMode="numeric"
            id="cnpjInput"
            value={inputCNPJ}
            onChange={handleChange}
            className="bg-gray-50 py-1 px-2 w-full outline-none rounded-[2px] border border-gray-200 focus:border-gray-800 transition-all duration-300"
            placeholder="00.000.000/0000-00"
          />
        </div>
        <button
          onClick={handleValidate}
          className="flex justify-center items-center gap-2 mt-4 mb-2 shadow-[0px_4px_1px_0_#101828] active:translate-y-1 active:shadow-[0_1px_0_0_#101828] transition-all duration-150 cursor-pointer uppercase bg-gray-800 text-gray-50 py-2 w-full rounded-[2px_2px_4px_4px] hover:bg-gray-800/95"
        >
          <FileSearch title="Validar CNPJ" className="w-5 h-5" />
          Validar CNPJ
        </button>
        <div className="flex flex-col gap-2 mt-2 mb-2 relative">
          <h1 className="font-semibold text-gray-950">Resposta da validação:</h1>
          <span
            className={`bg-gray-50 w-full py-1 px-2 text-gray-950 font-semibold h-auto rounded-[2px] border transition-all duration-300 ease-in-out ${
              wasValidated
                ? isValid
                  ? "border-green-600"
                  : "border-red-600"
                : "border-gray-200 py-4"
            }`}
          >
            {wasValidated ? `${inputCNPJ} - ${isValid ? "Verdadeiro" : "Falso"}` : ""}
          </span>
          <Check
            title="CNPJ Válido"
            className={`absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-in-out ${
              isValid && wasValidated ? "text-green-600 opacity-100" : "opacity-0"
            }`}
          />
          <X
            title="CNPJ Inválido"
            className={`absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-in-out ${
              !isValid && wasValidated ? "text-red-600 opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
