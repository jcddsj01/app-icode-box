export default function Footer() {
    return (
        <footer class="bg-gray-950 text-gray-50 py-6 mt-10 relative bottom-0 w-full">
            <div class="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center">
                <div class="text-center md:text-left">
                    <h2 class="text-xl font-semibold">iCode Box</h2>
                    <p class="text-base mt-1 text-gray-400">
                        Ferramentas de geração e validação de dados.
                    </p>
                </div>

                <div class="mt-4 md:mt-0 text-base text-center md:text-right">
                    <p>
                        Desenvolvido por <span class="font-semibold">José Carlos</span> – Desenvolvedor Full-Stack
                    </p>
                    <p class="text-gray-400">© 2025 iCode Box. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}