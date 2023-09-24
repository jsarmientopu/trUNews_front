
import SavedCard from "@/components/savedCard";

const SavedArticles=()=>{
    return <div className="flex flex-col bg-[#F0F2F4] w-[80%] rounded-[17px] justify-center items-center	">

            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pt-10 gap-2 bg-[#F0F2F4]">
                <p className="text-2xl">Articulos guardados</p>

            </div>
            
            <div className="flex flex-wrap sm:flex-row justify-between h-[50%] sm:h-full w-[95%] py-5 px-5 sm:px-16 sm:pb-10 pt-0 gap-2 bg-[#F0F2F4]">
                <SavedCard/>
                <SavedCard/>
                <SavedCard/>
                <SavedCard/>

            </div>

        </div>
}

export default SavedArticles;