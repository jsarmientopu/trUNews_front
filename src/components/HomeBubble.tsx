import { Button, Link, Image } from "@nextui-org/react"
    

const HomeBubble=()=>{
    return (<>
        <Button className="absolute top-8 left-20 bg-white shadow-2xl rounded-2xl gap-3 py-3">
                        <Link href={"/"}>
                        <Image
                        src="/images/logo.png"
                        alt="App Logo"
                        width={35}
                        height={35}
                        />
                    <p className="text-black text-md px-3">Home</p>
                    </Link>
        </Button>
    </>)
}

export default HomeBubble;
