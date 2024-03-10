import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../assets/JobTrkLogo.svg";
import LandingImg from '../assets/front.svg';


export default function Home() {
  return (
    <main>

      <header className="max-w-6xl mx-auto px-4 sm:px-8 py-6">
        <Image src={Logo} alt='logo' />
      </header>

      <section className="max-w-6xl mx-auto px-4 sm:px-8 h-screen -mt-20 grid lg:grid-cols-[1fr,400px] items-center">
        <div>
          <h1 className="capitalize text-4xl md:text-7xl font-bold">
            job <span className="text-primary">tracking</span> <br /> made easy.
          </h1>
          <p className="leading-loose max-w-md mt-4">
            Still scouring through 20 different application portals to find how many interviews you have to get ready for? Ditch the clutter. JobTrk keeps all your applications in one place, at the same time. 
          </p>
          <Button asChild className="mt-4">
            <Link href="/add-job">Get started</Link>
          </Button>
        </div>
        
        <Image src={LandingImg} alt="landing image" className="hidden lg:block" />
      </section>
    </main>
  );
}
