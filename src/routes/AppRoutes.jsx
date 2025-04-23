import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import Sidebar from "../components/Sidebar.jsx";
import Home from "../pages/Home.jsx";
import Footer from "../components/Footer.jsx";
import CPFGeneratorPage from "../pages/generator/CPFGeneratorPage.jsx";
import CNPJGeneratorPage from "../pages/generator/CNPJGeneratorPage.jsx";
import CPFValidatorPage from "../pages/validator/CPFValidatorPage.jsx";
import CNPJValidatorPage from "../pages/validator/CNPJValidatorPage.jsx";
import "../App.css";

export default function AppRoutes() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Atualiza o estado isMobile quando a janela é redimensionada
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 640;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // Fecha o menu se for desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fecha o menu ao navegar entre rotas no mobile
  useEffect(() => {
    if (isMobile) {
      setMenuOpen(false);
    }
  }, [location, isMobile]);

  const handleLinkClick = () => {
    if (isMobile) {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <Header
        onToggleMenu={() => setMenuOpen((prev) => !prev)}
        isMobile={isMobile}
        menuOpen={menuOpen}
      />

      <div className="mt-28 flex relative">
        {/* Sidebar */}
        {(!isMobile || menuOpen) && (
          <aside
            className={`${
              isMobile
                ? "fixed inset-0 z-40 pt-28 px-[1.5rem] bg-[#f3f4f6]"
                : ""
            }`}
          >
            <Sidebar onLinkClick={handleLinkClick} />
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cpf-generator" element={<CPFGeneratorPage />} />
            <Route path="/cnpj-generator" element={<CNPJGeneratorPage />} />
            <Route path="/cpf-validator" element={<CPFValidatorPage />} />
            <Route path="/cnpj-validator" element={<CNPJValidatorPage />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
