'use client';

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { systemsRouteList, userAndCompetitionRouteList } from "@/lists/routes";
import Image from "next/image";
import { usePathname } from "next/navigation";

const RouteItem = ({ route, isActive }) => (
    <div
        className={cn(
            isActive ? "bg-[#9FF443] text-black" : "hover:bg-gray-700",
            "p-[12px] flex items-center gap-x-[16px] cursor-pointer rounded-[16px]"
        )}
    >
        <Image src={route.icon} width={24} height={24} alt={route.title} />
        {route.title}
    </div>
);

export const MobileSidebar = () => {
    const pathname = usePathname();
    const isRouteActive = (href) => pathname === href;

    return (
        <Sheet>
            <SheetTrigger className="mb-5 lg:hidden">
                <Image
                    src="/assets/menu-open.svg"
                    width={30}
                    height={30}
                    alt="menu-open"
                />
            </SheetTrigger>
            <SheetContent 
                side="left" 
                className="w-[240px] p-0 bg-[#101828] text-white border-none"
            >
                <div className="py-8">
                    <div className="flex justify-between px-8 pb-8">
                        <Image
                            src="/assets/logo.svg"
                            width={70}
                            height={21}
                            alt="Logo"
                        />
                        <SheetClose>
                            <Image
                                src="/assets/menu-close.svg"
                                width={24}
                                height={24}
                                alt="Close Menu"
                            />
                        </SheetClose>
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
            </SheetContent>
        </Sheet>
    );
};