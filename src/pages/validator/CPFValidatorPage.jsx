import React, { useState } from "react";
import { Check, X, FileSearch } from "lucide-react";

export default function CPFValidatorPage() {
  const [inputCPF, setInputCPF] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [wasValidated, setWasValidated] = useState(false);

  const handleChange = (event) => {
    let numberCPF = event.target.value.replace(/\D/g, "");
    numberCPF = numberCPF.slice(0, 11);
    numberCPF = numberCPF.replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    setInputCPF(numberCPF);
    setWasValidated(false);
  };

  const handleValidate = () => {
    setWasValidated(true);

    const cleanedCPF = inputCPF.replace(/\D/g, "");
    const limitedCPF = /^\d+$/;

    if (
      cleanedCPF === "" ||
      !limitedCPF.test(cleanedCPF) ||
      cleanedCPF.length !== 11 ||
      /^(\d)\1+$/.test(cleanedCPF)
    ) {
      setIsValid(false);
      return;
    }

    const cpfArray = cleanedCPF.split("");

    const calculateDigit = (cpfDigits) => {
      let calculationAccumulator = 0;

      for (let i = 0; i < cpfDigits.length; i++) {
        calculationAccumulator += Number(cpfDigits[i]) * (cpfDigits.length + 1 - i);
      }

      const resultCalculation = (calculationAccumulator * 10) % 11;
      return resultCalculation > 9 ? 0 : resultCalculation;
    };

    const firstDigit = calculateDigit(cpfArray.slice(0, 9));
    const secondDigit = calculateDigit(cpfArray.slice(0, 10));

    const isValidCPF =
      firstDigit === Number(cpfArray[9]) &&
      secondDigit === Number(cpfArray[10]);

    setIsValid(isValidCPF);
};  

  return (
    <div className="flex flex-col justify-center items-center mx-6 sm:w-auto lg:w-[39rem] sm:ml-0 sm:mr-8 lg:ml-6">
      <h1 className="bg-gray-900 text-gray-50 text-2xl font-bold uppercase mb-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        Validador de CPF
      </h1>
      <div className="flex flex-col bg-gray-300 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        <h3 className="text-sm font-medium mb-4 text-gray-950">
          Digite um CPF e clique em "Validar CPF" para verificar se ele é verdadeiro ou falso.
        </h3>
        <div className="flex flex-col gap-2 text-gray-900">
          <label className="font-semibold text-gray-950" htmlFor="cpfInput">
            Digite um CPF:
          </label>
          <input type="text" name="no_autofill" autoComplete="off" inputMode="numeric" id="cpfInput" value={inputCPF}
            onChange={handleChange} className="bg-gray-50 py-1 px-2 w-full outline-none rounded-[2px] border-1 border-gray-200 focus:border-gray-800 transition-all duration-300" placeholder="000.000.000-00" />
        </div>
        <button
          onClick={handleValidate}
          className="flex justify-center items-center gap-2 mt-4 mb-2 shadow-[0px_4px_1px_0_#101828] active:translate-y-1 active:shadow-[0_1px_0_0_#101828] transition-all duration-150 cursor-pointer uppercase bg-gray-800 text-gray-50 py-2 w-full rounded-[2px_2px_4px_4px] hover:bg-gray-800/95"
        >
          <FileSearch title="Validar CPF" className="w-5 h-5" />
          Validar CPF
        </button>
        <div className="flex flex-col gap-2 mt-2 mb-2 relative justify-center items-left">
          <h1 className="font-semibold text-gray-950">Resposta da validação:</h1>
          <span
            className={`bg-gray-50 w-full py-1 text-gray-950 font-semibold px-2 h-auto rounded-[2px] border-1 transition-all duration-300 ease-in-out ${
              wasValidated
                ? isValid
                  ? "border-green-600"
                  : "border-red-600"
                : "border-gray-200 py-4 px-2"
            }`}
          >
            {wasValidated ? `${inputCPF} - ${isValid ? "Verdadeiro" : "Falso"}` : ""}
          </span>
          <Check
            title="CPF Válido"
            className={`absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-in-out ${
              isValid && wasValidated ? "text-green-600 opacity-100" : "opacity-0"
            }`}
          />
          <X
          title="CPF Inválido"
            className={`absolute right-2 top-12 transform -translate-y-1/2 w-5 h-5 transition-all duration-300 ease-in-out ${
              !isValid && wasValidated ? "text-red-600 opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>
    </div>
  );
};