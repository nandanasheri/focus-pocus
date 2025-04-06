"use client";

import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";

export const NavbarMobile = () => {
  return (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="-mr-4">
              <MenuIcon />
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col p-1">
              <div className="flex flex-col mb-0.5">
                <Link href="/app" className={buttonVariants()}>
                  Dashboard
                </Link>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
