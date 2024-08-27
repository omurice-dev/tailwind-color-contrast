import clsx from "clsx";
import { Icon } from "@iconify/react";

const Footer = () => {
  const linkStyle =
    "hover:text-blue-600 dark:hover:text-blue-100 dark:hover:underline";
  return (
    <>
      <footer className="dark:text-white pb-4 px-5">
        <ul className="pt-10 pb-16 px-10 border-t border-slate-200 flex flex-col lg:flex-row flex-wrap gap-y-2 items-center lg:justify-around text-slate-500 dark:border-slate-200/5">
          <li className={clsx(linkStyle, "w-full")}>
            <a
              href="https://github.com/wenxpan/tailwind-color-contrast"
              target="_blank"
              className="justify-center items-center flex gap-1"
            >
              <Icon icon="mdi:github" />
              <span>Github Repo</span>
            </a>
          </li>
          <li className={linkStyle}>
            <a
              href="https://tailwindcss.com/docs/customizing-colors"
              target="_blank"
            >
              Tailwind Colors
            </a>
          </li>
          <li className={linkStyle}>
            <a
              href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum"
              target="_blank"
            >
              WCAG - Contrast (Level AA)
            </a>
          </li>
          <li className={linkStyle}>
            <a
              href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-enhanced"
              target="_blank"
            >
              WCAG - Contrast (Level AAA)
            </a>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
