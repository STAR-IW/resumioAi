import {Button} from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import Link from "next/link";

export default function Home() {
  return (
   <main className="container mx-auto p-8">
       <Card className=" flex justify-center items-center p-6">
           <h1 className="text-4xl font-bold">Resumio</h1>
           <h2 className="text-xl text-muted-foreground">Analyze. Improve. Get Hired.</h2>
           <Button asChild>
               <Link  href="/analyze">Try it now!</Link>
           </Button>
       </Card>

   </main>
  );
}
