import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState("about");

  // Track scroll position to update active tab
  useEffect(() => {
    const sections = ["about", "experience", "volunteering", "projects", "contact"];

function onScroll() {
  const scrollPos = window.scrollY + 140; // offset for navbar
  let current = "about";

  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollPos) {
      current = id;
    }
  }

  // If user is at the VERY bottom → force "contact"
  const scrollBottom = window.innerHeight + window.scrollY;
const pageHeight = document.documentElement.scrollHeight;

  if (scrollBottom >= pageHeight - 4) {
    current = "contact";
  }

  setActive(current);
}


    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
  top: el.offsetTop - 100,
  behavior: "smooth",
});

  };

  const linkClasses = (id) =>
    `relative pb-1 transition-all ${
      active === id
        ? "after:w-full after:bg-[#c49b55]"
        : "after:w-0 after:bg-transparent"
    }
     after:absolute after:left-0 after:-bottom-[2px] after:h-[2.5px]
     after:transition-all after:duration-300
     hover:after:w-full`;

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f8f1e3]/80 backdrop-blur-md border-b border-[#d7c8aa] shadow-[0_2px_0_#d2c5a7]">
      <nav
  className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-4 sm:gap-6 px-4 py-3 font-hand text-[18px] sm:text-[20px] text-[#4a3f2a]"
>
        <button onClick={() => scrollTo("about")} className={linkClasses("about")}>
          About
        </button>
        <button
          onClick={() => scrollTo("experience")}
          className={linkClasses("experience")}
        >
          Experience
        </button>
        <button
          onClick={() => scrollTo("volunteering")}
          className={linkClasses("volunteering")}
        >
          Volunteering
        </button>
        <button onClick={() => scrollTo("projects")} className={linkClasses("projects")}>
          Projects
        </button>
        <button onClick={() => scrollTo("contact")} className={linkClasses("contact")}>
          Contact
        </button>
      </nav>
    </header>
  );
}
