import Image from "next/image";

export default function Navbar(){
    return (
        <nav className="flex  items-center gap-3 px-6 py-4 relative z-10">
            <Image
                src="/CVCompass-compass-white.svg"
                width={270}
                height={48}
                alt="logo"
                className="w-[270px] h-[48px]"
            />
        </nav>
    )
}