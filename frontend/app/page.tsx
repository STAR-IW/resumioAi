import {Button} from "@/components/ui/button"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import Link from "next/link";
import Grainient from "@/components/Grainient";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (

      <>
    <div className="fixed inset-0 z-0">
        <Grainient
            color1="#1c1d3f"
            color2="#392688"
            color3="#7c3db8"
            timeSpeed={0.25}
            colorBalance={0}
            warpStrength={1}
            warpFrequency={4.8}
            warpSpeed={2}
            warpAmplitude={50}
            blendAngle={5}
            blendSoftness={0.17}
            rotationAmount={500}
            noiseScale={2}
            grainAmount={0}
            grainScale={0.2}
            grainAnimated={false}
            contrast={1.8}
            gamma={1}
            saturation={1.35}
            centerX={0}
            centerY={0.04}
            zoom={1.2}
        />
    </div>
          <Navbar/>

    <div className="px-16 py-20 relative z-10">
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
