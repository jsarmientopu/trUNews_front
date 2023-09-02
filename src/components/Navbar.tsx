'use client';
import { useState } from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
    Input,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";

import { AiOutlineSearch } from "react-icons/ai";

import Image from "next/image";

import { IconContext } from "react-icons";

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuItems = [
        "Categorías",
        "Cerrar sesión"
    ];

    return (
        <Navbar className="bg-blue-300" onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent justify='start'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand className='mr-8'>
                    <Image
                        src="/images/logo.png"
                        alt="App Logo"
                        width={35}
                        height={35}
                    />
                    <p className="font-bold text-2xl">TrUNews</p>
                </NavbarBrand>

                <NavbarItem mr-8>
                    <Input startContent={
                        <AiOutlineSearch size="1.5rem" />
                    } placeholder="Buscar artículos..." />
                </NavbarItem>
            </NavbarContent>

            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            </NavbarContent> */}

            <NavbarContent className="hidden sm:flex gap-4" justify='center'>

                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent text-lg font-bold"
                                //endContent={icons.chevron}
                                radius="sm"
                                variant="light"
                            >
                                Categorías
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>

                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        <DropdownItem
                            key="autoscaling"
                            description="Noticias de deportes"
                        //startContent={icons.scale}
                        >
                            Deportes
                        </DropdownItem>
                        <DropdownItem
                            key="usage_metrics"
                            description="Noticias de economía"
                        //startContent={icons.activity}
                        >
                            Economía
                        </DropdownItem>
                        <DropdownItem
                            key="production_ready"
                            description="Noticias de realidad social"
                        //startContent={icons.flash}
                        >
                            Realidad social
                        </DropdownItem>
                        <DropdownItem
                            key="99_uptime"
                            description="Noticias de salud"
                        //startContent={icons.server}
                        >
                            Salud
                        </DropdownItem>
                        <DropdownItem
                            key="supreme_support"
                            description="Noticias de entretenimiento"
                        //startContent={icons.user}
                        >
                            Entretenimiento
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </NavbarContent>

            <NavbarContent justify='end'>
                <NavbarItem className="hidden lg:flex">
                    <Button as={Link} className='bg-white' href="#" variant="flat">
                        Iniciar sesión
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button as={Link} className='bg-white' href="#" variant="flat">
                        Registrarse
                    </Button>
                </NavbarItem>
            </NavbarContent>
            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            color={
                                index === 2
                                    ? "primary"
                                    : index === menuItems.length - 1
                                        ? "danger"
                                        : "foreground"
                            }
                            className="w-full"
                            href="#"
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}