"use client";

import { cn } from "@/lib/utils";
import { systemsRouteList, userAndCompetitionRouteList } from "@/lists/routes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const RouteItem = ({ route, isActive }) => (
  <Link href={cn(route.title === "Menus" && "/menus")}>
    <div
      className={cn(
        isActive ? "bg-[#9FF443] text-black" : "hover:bg-gray-700",
        "p-[12px] flex items-center gap-x-[16px] cursor-pointer rounded-[16px]"
      )}
    >
      <Image src={cn(isActive ? "/assets/black-system.svg" : route.icon)} width={24} height={24} alt={route.title} />
      {route.title}
    </div>
  </Link>
);

export const Sidebar = () => {
  const pathname = usePathname();

  const isRouteActive = (href) => pathname === href;

  return (
    <div className="fixed top-5 h-[calc(100%-2.5rem)] max-w-[240px] w-full bg-[#101828] text-white hidden lg:block rounded-2xl">
      <div className="py-8">
        <div className="flex justify-between px-8 pb-8">
          <Link href="/">
            <Image
              src="/assets/logo.svg"
              width={70}
              height={21}
              alt="Logo"
            />
          </Link>
          <Image
            src="/assets/menu-close.svg"
            width={24}
            height={24}
            alt="Close Menu"
          />
        </div>

        <div className="px-5">
          <div className="flex flex-col bg-[#1D2939] rounded-[16px]">
            {systemsRouteList.map((route) => (
              <RouteItem
                key={route.href}
                route={route}
                isActive={isRouteActive(route.href)}
              />
            ))}
          </div>

          <div className="flex flex-col rounded-[16px] pt-[12px]">
            {userAndCompetitionRouteList.map((route) => (
              <RouteItem
                key={route.href}
                route={route}
                isActive={isRouteActive(route.href)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};