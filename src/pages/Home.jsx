export default function Home() {
    return (
        <div className="flex-col mx-6 justify-center items-left w-auto sm:ml-0 sm:mr-[2rem] sm:w-auto lg:w-[39rem] lg:ml-[2rem] rounded-[2px] p-4 mb-14 bg-gray-300 shadow-[0px_3px_3px_0_#99a1af]">
            <div className="flex flex-col gap-2 rounded-[2px] mb-4">
                <h1 className="font-bold text-gray-50 bg-gray-900 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Bem Vindo ao iCode Box!</h1>
                <p className="text-sm font-medium p-4 bg-gray-50 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Uma página feita com propósito: demonstrar minhas habilidades em desenvolvimento web e ao mesmo tempo compartilhar ferramentas úteis com a comunidade dev.</p>
            </div>

            <div className="flex flex-col gap-2 rounded-[2px] mb-4">
                <h1 className="font-bold text-gray-50 bg-gray-900 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">O que é o iCode Box?</h1>
                <p className="text-sm font-medium p-4 bg-gray-50 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">O iCode Box é um projeto pessoal fictício que reúne ferramentas web úteis, como geradores e validadores, desenvolvidas com React, Tailwind CSS e boas práticas de código.<br />
                Cada funcionalidade foi pensada para ser simples, útil e didática, ideal para quem quer usar ou aprender.</p>
            </div>

            <div className="flex flex-col gap-2 rounded-[2px] mb-4">
                <h1 className="font-bold text-gray-50 bg-gray-900 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Objetivos:</h1>
                <ul className="list-disc  text-sm font-medium px-7 py-4 bg-gray-50 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">
                    <li>Mostrar minhas habilidades técnicas com React, componentização, hooks, rotas, estilização com Tailwind CSS, e mais.</li>
                    <li>Aplicar princípios de Clean Code, organização de pastas, e manutenção de estados com clareza.</li>
                    <li>Ajudar iniciantes com códigos simples, legíveis e prontos para estudo.</li>
                    <li>Apresentar meu estilo de trabalho para recrutadores e empresas de tecnologia.</li>
                </ul>
            </div>

            <div className="flex flex-col gap-2 rounded-[2px] mb-4">
                <h1 className="font-bold text-gray-50 bg-gray-900 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Fique à vontade!</h1>
                <p className="text-sm font-medium p-4 bg-gray-50 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Você pode navegar pelas ferramentas, testar, explorar o código e, se quiser, até dar sugestões.<br />
                Esse projeto é open, feito com dedicação e em constante evolução.<br />
                Se você é recrutador, dev, ou está aprendendo: seja muito bem-vindo ao iCode Box!<br />
                Vamos codar e evoluir juntos.</p>
            </div>

            <div className="flex flex-col gap-2 rounded-[2px] mb-4">
                <h1 className="font-bold text-gray-50 bg-gray-900 p-2 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Aviso importante:</h1>
                <p className="text-sm font-medium p-4 bg-gray-50 rounded-[2px] shadow-[0px_3px_3px_0_#99a1af]">Sou desenvolvedor de software e este projeto tem fins exclusivamente educacionais e demonstrativos.<br />
                O iCode Box não viola nenhuma lei, o conteúdo aqui é voltado para aprendizado, testes e demonstração de habilidades técnicas.<br />
                O uso indevido dessas ferramentas para práticas ilegais ou mal-intencionadas é de total responsabilidade do usuário.<br />
                O iCode Box não apoia, incentiva ou se responsabiliza por qualquer ação fora do propósito de aprendizado e desenvolvimento.</p>
            </div>
        </div>
    )
}