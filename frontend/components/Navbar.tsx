import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Navbar({ showHistory }: { showHistory?: boolean }){
    return (
        <nav className="flex  items-center justify-between px-6 py-4 relative z-10">
            <Image
                src="/CVCompass-compass-white.svg"
                width={270}
                height={48}
                alt="logo"
                className="w-[270px] h-[48px]"
            />
            { showHistory && <Button  variant="outline" className="m-3">
                <Link href="/history">History</Link>
            </Button>}
        </nav>
    )
}

