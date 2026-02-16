"use client";

import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header() {
    const pathname = usePathname();
    const title = pathname.split("/").pop();

    return (
        <div className="border-b bg-zinc-950/50 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/20">
            <div className="flex h-16 items-center px-4 gap-4">
                <h1 className="text-lg font-semibold capitalize text-white hidden md:block">
                    {title === "admin" ? "Dashboard" : title}
                </h1>

                <div className="ml-auto flex items-center space-x-4">
                    <div className="relative mr-4 hidden md:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="pl-9 h-9 w-[200px] lg:w-[300px] bg-zinc-900 border-zinc-800 text-sm"
                        />
                    </div>

                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                        <Bell className="h-5 w-5" />
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/avatars/01.png" alt="@laco" />
                                    <AvatarFallback>AD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 bg-zinc-900 border-zinc-800 text-white" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">Admin</p>
                                    <p className="text-xs leading-none text-zinc-400">admin@laco.law</p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem className="focus:bg-zinc-800 focus:text-white cursor-pointer">
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-zinc-800" />
                            <DropdownMenuItem className="text-red-400 focus:bg-red-950/20 focus:text-red-300 cursor-pointer">
                                Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
}
