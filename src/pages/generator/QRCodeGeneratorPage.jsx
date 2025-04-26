import { useRef, useState } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import { Plus, RefreshCw } from "lucide-react";

export default function QRCodeGeneratorPage() {
  const [linkValue, setLinkValue] = useState("");
  const [colorQrCode, setColorQrCode] = useState("#000");
  const [bgColorQrCode, setBgColorQrCode] = useState("#fff");
  const colorInputRef = useRef(null);
  const bgColorInputRef = useRef(null);
  const qrRef = useRef(null);

  const optionsQrCode = [
    {title: "Color", colorRef: colorInputRef, color: colorQrCode, setColor: setColorQrCode},
    {title: "Background Color", colorRef: bgColorInputRef, color: bgColorQrCode, setColor: setBgColorQrCode},
  ]

  const handleDownload = async () => {
    if (!qrRef.current) return;

    try {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download ="qrcode.png";
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mx-6 sm:w-auto lg:w-[39rem] sm:ml-0 mb-64 sm:mr-8 lg:ml-6">
      <h1 className="bg-gray-900 text-gray-50 text-2xl font-bold uppercase mb-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Gerador de QR Code</h1>

      <div className="flex flex-col bg-gray-300 gap-2 p-4 w-full rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
        <h3 className="text-sm font-medium mb-4 text-gray-950">
          Utilize nosso gerador de QR Code, basta clicar em "Download QR Code" e pronto. Um novo QR Code será gerado. Você ainda tem opção de escolher uma cor.
        </h3>

        <div className="flex items-center">
          <input type="text" placeholder="Insira seu link aqui" value={linkValue} onChange={(e) => setLinkValue(e.target.value)} className="bg-gray-50 py-1 text-gray-950 px-2 w-full outline-none rounded-[2px] border-1 border-gray-200 focus:border-gray-800 transition-all duration-300" />
        </div>

        <div className={`flex flex-col gap-4 justify-center items-center px-4 py-4`}>
          <div ref={qrRef} className={`bg-gray-50 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af] ${!linkValue ? "opacity-30" : "opacity-100 transition-all duration-300"}`}>
            <QRCode value={linkValue || " "} size={120} fgColor={colorQrCode} bgColor={bgColorQrCode} />
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8 justify-center items-center mb-2">
            {optionsQrCode.map((option) => (
              <div key={option.title} className="flex flex-col gap-1 justify-center items-center"> 
                <h3 className="font-medium text-base bg-gray-50 p-2 rounded-[2px] mb-2 shadow-[0px_3px_3px_0_#99a1af]">{option.title}</h3>
                <div className="flex justify-center items-center">
                  <input type="color" ref={option.colorRef} className="absolute w-8 h-8 opacity-0 cursor-pointer" onChange={(e) => {option.setColor(e.target.value)}} />
                  <button type="button" style={{backgroundColor: option.color}} className="w-8 h-8 rounded-full border-2 border-gray-950 flex items-center justify-center transition shadow-[0px_3px_3px_0_#99a1af]" onClick={() => option.colorRef.current?.click()}>
                    <Plus className="w-4 h-4 text-gray-950 bg-gray-50 rounded-full" strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {linkValue && (
          <button
          type="button"
            onClick={handleDownload}
            className="flex justify-center items-center gap-2 shadow-[0px_4px_1px_0_#101828] active:translate-y-1 active:shadow-[0_1px_0_0_#101828] transition-all duration-150 cursor-pointer uppercase bg-gray-800 text-gray-50 mb-2 py-2 px-4 w-full rounded-[2px_2px_4px_4px] hover:bg-gray-800/95"
          >
            <RefreshCw className="w-5 h-5" />
            Download QR Code
          </button>
          )}
      </div>
    </div>
  );
}
