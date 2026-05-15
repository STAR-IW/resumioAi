import {Button} from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import Link from "next/link";

export default function Home() {
  return (

      <>

      <nav className="flex items-center gap-3 px-6 py-4">
          <Image
              src="/CVCompass-compass-white.svg"
              width={270}
              height={48}
              alt="logo"
              className="w-[270px] h-[48px]"
          />
      </nav>

    <div className="px-16 py-20">
        <h1 className="text-7xl font-bold ">Know your <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
  match <br/> score
</span> before you<br/> apply.</h1>
        <p className="pt-8  ">Paste any job. We'll score the fit, draft the cover letter, and prep your interview.</p>
        <Button className="mt-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white" data-testid= "try-it-now" asChild>
            <Link href="/analyze">Try it now <ArrowRight className="ml-2 h-4 w-4"/></Link>
        </Button>
    </div>
      </>
  );
}
