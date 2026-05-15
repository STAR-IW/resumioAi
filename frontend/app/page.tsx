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
        <Button className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white" data-testid= "try-it-now" asChild>
            <Link href="/analyze">Try it now <ArrowRight className="ml-2 h-4 w-4"/></Link>
        </Button>
    </div>
      </>
   // <main className=" min-h-screen flex items-center justify-center">
   //     <><Image
   //         src="C:\Users\starn\Documents\dev\resumio\frontend\public\CVCompass-compass-white.svg"
   //         width={500}
   //         height={500}
   //         alt="Picture of the author"
   //     /></>
   //     <div className="flex flex-col gap-8 items-center justify-center p-2">
   //     <Card className="flex flex-col gap-4 text-center p-7 max-w-lg">
   //         <h1 className="text-4xl font-bold">Resumio</h1>
   //         <h2 className="text-xl text-muted-foreground">Analyze. Improve. Get Hired.</h2>
   //         <Button data-testid= "try-it-now" asChild>
   //             <Link  href="/analyze">Try it now!</Link>
   //         </Button>
   //     </Card>
   //
   //     <Card className="p-8 m-5">
   //         <div className='grid grid-cols-3 gap-4'>
   //             <div className='text-center'>
   //                 <p className='text-2xl font-bold'>1</p>
   //                 <p className="font-semibold">Upload CV</p>
   //                 <p className="text-muted-foreground text-sm">Upload PDF OR Word Doc.</p>
   //             </div>
   //             <div className='text-center'>
   //                 <p className='text-2xl font-bold'>2</p>
   //                 <p className="font-semibold">Add Job Description</p>
   //                 <p className="text-muted-foreground text-sm">Paste or scrape from URL</p>
   //             </div>
   //             <div className='text-center'>
   //                 <p className='text-2xl font-bold'>3</p>
   //                 <p className="font-semibold">Get Analysis</p>
   //                 <p className="text-muted-foreground text-sm">AI-powered match score and cover letter</p>
   //             </div>
   //         </div>
   //     </Card>
   //
   //     </div>
   //
   // </main>
  );
}
