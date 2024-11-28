import { useState } from "react";

export const NuvMenuView = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="z-50">
      <div
        className={`absolute top-0 left-0 w-16 h-16 z-50 cursor-pointer transition-transform duration-300 ease-in-out ${
          isOpen ? "scale-110 rotate-[15deg]" : "scale-100"
        }`}
        onClick={toggleMenu}
      >
        <div
          className={`absolute top-0 left-0 w-16 h-16 p-2 bg-pink-300 rounded-full flex items-center justify-center transition-shadow duration-400 ease ${
            isOpen ? "shadow-inner" : "shadow-lg"
          }`}
        >
          <div
            className={`relative w-full h-1 bg-white rounded-full transform transition-transform duration-400 ease ${
              isOpen ? "rotate-[135deg] bg-purple-400" : "bg-white"
            }`}
          >
            <div
              className={`absolute top-[-0.5rem] left-0 w-full h-1 rounded-full transform transition-transform duration-400 ease ${
                isOpen ? "rotate-90 bg-purple-400" : "bg-white"
              }`}
            ></div>
            <div
              className={`absolute top-[0.5rem] left-0 w-full h-1 rounded-full transition-opacity duration-400 ease ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center transition-opacity duration-500 ease ${
          isOpen
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        <div
          className={`relative w-[90vw] h-[90vh] bg-white rounded-[2rem] shadow-xl flex items-center justify-center transition-transform duration-500 ease-in-out ${
            isOpen ? "scale-100" : "scale-0"
          }`}
        >
          <div
            className={`text-center max-w-[90vw] max-h-[90vh] transition-opacity duration-500 ease ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <ul className="list-none p-0 m-0">
              <li className="m-4 text-3xl font-semibold">
                <a
                  href="/"
                  className="relative inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:underline"
                >
                  思い出
                  <span className="absolute bottom-[-0.15em] left-0 w-0 h-[3px] bg-pink-500 transition-all duration-500 ease-out hover:w-full"></span>
                </a>
              </li>
              <li className="m-4 text-3xl font-semibold">
                <a
                  href="/about"
                  className="relative inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:underline"
                >
                  プロフィール
                  <span className="absolute bottom-[-0.15em] left-0 w-0 h-[3px] bg-pink-500 transition-all duration-500 ease-out hover:w-full"></span>
                </a>
              </li>
              <li className="m-4 text-3xl font-semibold">
                <a
                  href="/products"
                  className="relative inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:underline"
                >
                  ホーム
                  <span className="absolute bottom-[-0.15em] left-0 w-0 h-[3px] bg-pink-500 transition-all duration-500 ease-out hover:w-full"></span>
                </a>
              </li>
              <li className="m-4 text-3xl font-semibold">
                <a
                  href="/contact"
                  className="relative inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:underline"
                >
                  エクストラ
                  <span className="absolute bottom-[-0.15em] left-0 w-0 h-[3px] bg-pink-500 transition-all duration-500 ease-out hover:w-full"></span>
                </a>
              </li>
              <li className="m-4 text-3xl font-semibold">
                <a
                  href="/contact"
                  className="relative inline-block cursor-pointer transition-transform duration-300 ease-in-out hover:text-pink-500 hover:scale-110 hover:underline"
                >
                  開発
                  <span className="absolute bottom-[-0.15em] left-0 w-0 h-[3px] bg-pink-500 transition-all duration-500 ease-out hover:w-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
