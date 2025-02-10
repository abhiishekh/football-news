import HeroText from "@/app/(components)/heroText/page";

export default function Home() {
    return (
        <div className="w-full min-h-screen px-2 sm:px-24 bg-[url('@/app/assets/images/Hero.jpeg')] bg-cover bg-center">
            <HeroText />
        </div>
    )
}