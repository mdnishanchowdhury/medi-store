"use client";

import { Menu, LogOut, Pill } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { CartDropdown } from "../modules/Store/CartDropdown";
import { authClient } from "@/lib/auth-client";
import SearchBar from "../modules/Store/SearchBar";

const Navbar1 = ({
  initialCategories = [],
  logo = {
    url: "/",
    src: "https://i.ibb.co.com/yc1H9XZm/Chat-GPT-Image-Feb-6-2026-09-05-22-PM.png",
    alt: "logo",
  },
  menu = [
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    { title: "Contact", url: "/contact" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Login", url: "/login" },
    signup: { title: "Sign up", url: "/signup" },
  },
  className,
}: any) => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const categories = initialCategories;

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          router.refresh();
        },
      },
    });
  };

  return (
    <section className={cn("py-4 border-b fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md dark:bg-black/80", className)}>
      <div className="container mx-auto px-4">
        <nav className="hidden items-center justify-between lg:flex gap-4">

          {/* Logo & Main Menu */}
          <div className="flex items-center gap-6">
            <Link href={logo.url} className="flex items-center gap-2 shrink-0">
              <img src={logo.src} className="w-24 h-auto object-cover" alt={logo.alt} />
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                {menu
                  .filter((item: any) => !(item.url === "/dashboard" && !session))
                  .map((item: any) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink asChild>
                        <Link href={item.url} className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium transition-colors hover:bg-muted rounded-md">
                          {item.title}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-blue-600 font-bold">Category</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[500px] grid-cols-2 gap-3 p-4">
                      {categories.length > 0 ? (
                        categories.map((cat: any) => (
                          <li key={cat.id}>
                            <NavigationMenuLink asChild>
                              <Link href={`/store/${cat.id}`} className="flex select-none gap-3 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 focus:bg-muted">
                                <Pill className="size-5 text-blue-500 shrink-0" />
                                <div>
                                  <div className="text-sm font-bold leading-none">{cat.categoryName}</div>
                                  <p className="line-clamp-1 text-xs text-muted-foreground mt-1">Explore medical supplies</p>
                                </div>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))
                      ) : (
                        <p className="p-4 text-sm text-muted-foreground text-center col-span-2">No categories found</p>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Search, Cart & Auth */}
          <div className="flex items-center gap-3 flex-1 justify-end max-w-xl">
            {/* Search Bar Container with higher Z-index */}
            <div className="relative flex-1 max-w-xs z-[110]">
              <SearchBar />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <CartDropdown />
              <ModeToggle />
              {!isPending && (
                <>
                  {session ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium hidden xl:block">Hi, {session.user.name.split(" ")[0]}</span>
                      <Button variant="destructive" size="sm" onClick={handleLogout} className="h-8">
                        <LogOut className="size-4 mr-1" /> Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Button asChild variant="outline" size="sm" className="h-8"><Link href={auth.login.url}>Login</Link></Button>
                      <Button asChild size="sm" className="h-8"><Link href={auth.signup.url}>Sign up</Link></Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </nav>

        {/* Mobile View */}
        <div className="flex lg:hidden items-center justify-between">
          <Link href={logo.url}><img src={logo.src} className="max-h-8 dark:invert" alt={logo.alt} /></Link>
          <div className="flex items-center gap-2">
            <CartDropdown />
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild><Button variant="outline" size="icon"><Menu className="size-4" /></Button></SheetTrigger>
              <SheetContent side="right">
                <div className="mt-4 mb-4">
                  <SearchBar />
                </div>
                <div className="flex flex-col gap-2">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="categories" className="border-none">
                      <AccordionTrigger className="text-md font-bold text-blue-600">Categories</AccordionTrigger>
                      <AccordionContent className="flex flex-col gap-2 pl-4">
                        {categories.map((cat: any) => (
                          <Link key={cat.id} href={`/store/${cat.id}`} className="text-sm py-2 border-b border-slate-50">{cat.categoryName}</Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  {menu.map((item: any) => (
                    <Link key={item.title} href={item.url} className="text-md font-semibold block py-3 border-b">{item.title}</Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };