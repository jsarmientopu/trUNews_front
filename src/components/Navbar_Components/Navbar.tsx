'use client';
import { useState,useEffect, useCallback, useRef} from 'react';
import '../../app/globals.css'
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Input,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
    user,
} from "@nextui-org/react";
import {getFromLocalStorage, removeFromLocalStorage} from '@/utils/localStorage';
import { Dropdown,DropdownItem, DropdownTrigger, DropdownMenu } from '@nextui-org/react';
import Image from "next/image";
import verifyToken from '@/utils/utils'
import Link from 'next/link'
import { decryptedJWT } from '@/dto/users';
import { useRouter } from 'next/navigation';
import { SearchIcon } from '../navbar/SearchIcon';
import LoadingButton from './LoadingButton';

export default function App() {
    
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [userInfo,setInfoUser] = useState<decryptedJWT>({userId:-2,rol:-2})
    const router = useRouter()
    const [serach, setSearch]=useState<string>('')
    const ref= useRef<any>()
    
    async function token(){
        const rol =await verifyToken();
        setInfoUser(rol);
    }
    
    useEffect(()=>{
        token();
    },[]);
    
    const logOut=()=>{
        const tok = getFromLocalStorage("token");
        if(tok){
            removeFromLocalStorage("token")
        }
        router.refresh()
        router.push("/")
        token()
    }

    // token(); 

    const menuButtons = [
        {"rol":[-1,-2],"label":"Registrarse","ref":"/register"},
        {"rol":[-1,-2],"label":"Iniciar Sesión","ref":"/login"},
        {"rol":[0,1],"label":"Perfil","ref":"/perfil",'query':userInfo.userId},
        {"rol":[0,1],"label":"Cerrar sesion","ref":"/", "ev":logOut}      
    ]

    const menuItems = [
        "Categorías",
        "Cerrar sesión"
    ];
<<<<<<< HEAD:src/components/Navbar_Components/Navbar.tsx
=======

    const menuSections = [
        {"rol":[0,1],"label":"Feed","ref":"/feed"},
    ]

>>>>>>> 86e51d4d20f6a7630d3b45578af61e539fe44766:src/components/Navbar.tsx
    
    return (
        <Navbar id ="nav_conatiner" className="flex justify-between bg-[#0079DC] max-w-full w-full shadow-xl" onMenuOpenChange={setIsMenuOpen}>
            
            <NavbarContent id='logo' justify='start'>
                <NavbarBrand className='mr-8'>
                    <Link className='flex flex-row ' href={'/'}>
                    <Image
                        src="/images/logo.png"
                        alt="App Logo"
                        width={35}
                        height={35}
                    />
                    <p className="flex flex-col justify-center font-bold text-2xl">TrUNews</p>
                    </Link>
                </NavbarBrand>

                {/* <NavbarItem mr-8>
                    <Input startContent={
                        <AiOutlineSearch size="1.5rem" />
                    } placeholder="Buscar artículos..." />
                </NavbarItem> */}
            </NavbarContent>

            <NavbarContent className="flex gap-4 w-[50%] sm:w-[35%] " justify="center">
            <Input
                classNames={{
                    base: "max-w-full h-10 mr-4",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper: "h-full font-normal text-default-500 bg-white ",
                }}
                placeholder="Type to search"
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
                onChange={(event)=>{setSearch(event.target.value)}}
                onKeyDown={(event)=>{if(event.key=='Enter'){ref.current.click()}}}
            />
            <Link target='_parent' href={{pathname:'/search', query:{search:serach}}} ref={ref}/>
            </NavbarContent>
            <NavbarContent className="hidden md:flex  gap-4 " justify="center">
                <Dropdown>
                    <NavbarItem isActive={userInfo.rol==-1?false:true}>
                        <DropdownTrigger>
                            <Link
                                className='text-white font-bold' href="#"                          >
                                Features
                            </Link>
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
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
            
            <NavbarContent className="hidden md:flex  gap-4" justify="center">
                <Dropdown>
                    <NavbarItem isActive>
                        <DropdownTrigger>
                            <Link
                                className='text-white' href="#" aria-current="page"                            >
                                Categories
                            </Link>
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
                {/* <NavbarItem>
                <Link className='text-white font-bold' href="#">
                    Features
                </Link>
                </NavbarItem> */}
                {/* <NavbarItem isActive>
                <Link className='text-white' href="#" aria-current="page">
                    Categories
                </Link>
                </NavbarItem> */}
                {menuSections.filter(item => item.rol.includes(userInfo.rol)).map((item, index) => (
                    <NavbarItem key={`${item.label}-${index}`} isActive>
                            <Link className='text-white' color="foreground" href={{pathname:item.ref}}>
                                {item.label}
                            </Link>
                    </NavbarItem>
                ))}
                <NavbarItem>
                <Link className='text-white' color="foreground" href="#">
                    Communities
                </Link>
                </NavbarItem>
            </NavbarContent>

            {/* <NavbarContent className="hidden sm:flex gap-4" justify="center">
            </NavbarContent> */}

            {/* <NavbarContent className="hidden sm:flex gap-4" justify='center'>

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

            </NavbarContent> */}
            <NavbarContent className='hidden md:flex flex-row' justify='end'>
                {menuButtons.filter(item => item.rol.includes(userInfo.rol)).map((item, index) => (
                        <NavbarItem key={`${item.label}-${index}`}>
                            {userInfo.rol==-2?
                                <LoadingButton key={index} />
                            :
                                item.ev?
                                    <Button className='bg-white grow' variant="flat" onClick={item.ev}>
                                        {item.label}
                                    </Button>
                                :   
                                    item.query?
                                    <Link className='text-black' href={{pathname:item.ref, query:{search:userInfo.userId}}}>
                                        <Button className='bg-white grow' variant="flat" >
                                            {item.label}
                                        </Button>
                                    </Link>
                                    :
                                    <Link className='text-black' href={{pathname:item.ref}}>
                                        <Button className='bg-white grow' variant="flat" >
                                            {item.label}
                                        </Button>
                                    </Link>
                            }
                        </NavbarItem>
                ))}
            </NavbarContent>
            <NavbarContent className="flex md:hidden " justify="end">
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                />
            </NavbarContent>
             <NavbarMenu>
                {menuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`} >
                    <Link
                    className="w-full justify-end"
                    color={
                        index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                    }
                    href="#"
                    /* size="lg" */
                    >
                    {item}
                    </Link>
                </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}