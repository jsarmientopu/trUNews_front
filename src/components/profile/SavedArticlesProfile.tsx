import { decryptedJWT } from "@/dto/users";
import SavedCard from "@/components/profile/SavedCard";
import { animated, useSpring } from "react-spring";


const SavedArticles=({userInfo, userView}:{'userInfo':decryptedJWT, 'userView':number})=>{
    const ani = useSpring({
        from: { width: '40%' },
        to: { width: '80%' },
        config: { duration: 500 },
    })
    return <animated.div className="flex flex-col bg-[#F0F2F4] w-[80%] rounded-[17px] justify-center items-center shadow-xl " style={ani}>
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                <p className="text-2xl">Articulos guardados</p>

            </div>
            
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pb-10 pt-0 gap-2 bg-[#F0F2F4]">
                <SavedCard/>
                <SavedCard/>
                <SavedCard/>
                <SavedCard/>

            </div>

        </animated.div>
}

export default SavedArticles;