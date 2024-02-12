import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export default async function Navbar() {
    return (
        <>
            <div className="border-b max-w-screen fixed top-0 left-0 w-full bg-white -mb-20 z-50">
                <div className="flex h-20 justify-center items-center px-4">

                    <div className="flex justify-center items-center">
                        <Link href="/">
                            <Avatar>
                                <AvatarImage src="https://m.media-amazon.com/images/M/MV5BYzlmMTRhYmMtMmYxYi00MTU5LWJkMTctYzVlNDg5MmI0MTNlXkEyXkFqcGdeQXVyNjUxMjc1OTM@._V1_.jpg" alt="Pablo" />
                                <AvatarFallback>RP</AvatarFallback>
                            </Avatar>
                        </Link>
                    </div>

                    {/* <div className="flex justify-center items-center mx-2 lg:mx-4 gap-4">
              <StoreSwitcher items={stores} />
              <MainRoutes className="ml-auto" />
            </div> */}
                    <div className="ml-auto flex items-center space-x-2 lg:space-x-4">
                        <Button variant="outline">
                            <Link href={"/create"}>
                                Creato restorante
                            </Link>
                        </Button>
                        {/*
              <Button variant="outline" size="icon" className="md:hidden sm:hidden xs:hidden">
                <MenuIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />

                <span className="sr-only">Navigation Menu</span>
              </Button>

              <LanguageToggle />
              <ThemeToggle />

              <AvatarButton user={user} /> */}
                    </div>
                </div>
            </div>
            <div className="h-20" />
        </>
    )
}