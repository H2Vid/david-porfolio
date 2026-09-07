import { CometCard } from "@/app/components/ui/comet-card";
import { EncryptedText } from "../ui/encrypted-text";
import { MoveUpRight } from "lucide-react";

import Link from "next/link";

const contactLinks = [
  {
    name: "GitHub",
    href: "https://github.com/username",
    icon: "/icons/github.svg",
  },

  {
    name: "WhatsApp",
    href: "https://wa.me/628xxxxxxxxxx",
    icon: "/icons/whatsapp.svg",
  },
  {
    name: "Email",
    href: "mailto:your@email.com",
    icon: "/icons/gmail.svg",
  },
];

export default function Herosection() {
  return (
    <section
      id="home"
      className="mx-auto flex w-[90%] flex-col items-center justify-center pt-20 md:h-screen md:pt-24 md:text-[#111111] dark:text-[#f1f1f1]"
    >
      <div className="flex h-full w-full flex-col space-y-8 md:flex-row">
        <div className="flex h-full w-full flex-col justify-center space-y-5">
          <div className="flex h-auto w-full items-center gap-4 px-4">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-green-400/60" />
              <span className="relative size-2.5 rounded-full bg-green-500 shadow-[0_0_8px_2px_rgba(34,197,94,0.6)]" />
            </span>
            <p className="text-sm md:text-base"> Available for work 👉</p>
            <div className="flex items-center gap-4">
              {contactLinks.map(({ name, href, icon }) => (
                <Link
                  key={href}
                  href={href}
                  target="_blank"
                  aria-label={name}
                  className="transition-all duration-300 hover:-translate-y-1"
                >
                  <img
                    src={icon}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5 transition-all duration-300 group-hover:scale-110 dark:invert dark:group-hover:invert"
                  />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-center font-clash text-[clamp(4rem,11vw,10rem)] leading-[0.8] font-bold tracking-[-0.04em] whitespace-nowrap sm:text-left">
              <EncryptedText text="DAVID" revealDelayMs={50} />
            </h1>

            <h1 className="text-center font-clash text-[clamp(4rem,11vw,10rem)] leading-[0.8] font-bold tracking-[-0.04em] whitespace-nowrap sm:text-left">
              <EncryptedText text="SITOMPUL" revealDelayMs={50} />
            </h1>
          </div>
          <div>
            <button className="flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-[#f1f1f1f1] transition-all duration-300 hover:bg-gray-800 dark:bg-gray-50 dark:text-[#111111] dark:hover:bg-gray-200">
              More About me <MoveUpRight />
            </button>
          </div>
        </div>

        <div className="flex h-full w-full items-center justify-center md:w-[50%]">
          <CometCard rotateDepth={15} translateDepth={10}>
            <div className="overflow-hidden rounded-3xl md:h-140 md:w-90">
              <img
                src="/profile.png"
                alt="Project"
                className="h-full w-full object-cover"
              />
            </div>
          </CometCard>
        </div>
      </div>
    </section>
  );
}
