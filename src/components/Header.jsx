import { Link } from "react-router-dom";
import { useState } from "react";

export default function Header({ onToggleMenu }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        const newState = !isMenuOpen;
        setIsMenuOpen(newState);
        onToggleMenu?.(newState);
    };

    return (
        <header className="fixed top-0 w-full bg-gray-950 shadow-[0px_3px_3px_0_#99a1af] py-4 px-[3rem] lg:px-[10rem] z-50">
            <nav>
                <ul className="flex justify-between items-center w-full">
                    <li>
                        <Link to="/">
                            <img
                                className="w-[8rem] h-[3rem]"
                                src="/logo.png"
                                title="iCode Box"
                                alt="Logo iCode Box"
                            />
                        </Link>
                    </li>

                    <li className="sm:hidden">
                        <button
                            onClick={toggleMenu}
                            className={`cursor-pointer flex flex-col gap-[6px] z-50 relative transition-all duration-300 ease-in-out`}
                            aria-label="Abrir menu"
                        >
                            <span
                                className={`h-0.5 w-6 bg-white rounded transition-transform duration-300 ease-in-out
                                    ${isMenuOpen ? "translate-y-[7px] rotate-45" : ""}`}
                            />
                            <span
                                className={`h-0.5 w-6 bg-white rounded transition-opacity duration-300 ease-in-out
                                    ${isMenuOpen ? "opacity-0" : "opacity-100"}`}
                            />
                            <span
                                className={`h-0.5 w-6 bg-white rounded transition-transform duration-300 ease-in-out
                                    ${isMenuOpen ? "-translate-y-[9px] -rotate-45" : ""}`}
                            />
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
