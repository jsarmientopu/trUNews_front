import RegisterInputs from "./ResgisterInputs";

const SignUpCard=()=>{

    return <>
        <div id = "login-container" className="shadow-2xl bg-white rounded-2xl h-[95%] sm:-[90%] md:h-4/5  w-[71%] md:w-[65%] lg:w-[60%] xl:w-1/2   grid place-items-center py-0 sm:py-3 ">
            <div className="flex justify-center px-5 pt-5 h-full w-4/5 lg:w-[65%]">
            <div className="flex flex-col items-center justify-center " >
                <p className="flex justify-center font-bold text-2xl text-[#0079DC] mb-3">TrUNews</p>
                <p className="justify-center text-base text-black leading-5 text-center"> Join us to discover the latest news in your community that match your interest.</p>
                <p className="justify-center text-base text-black leading-5 text-center">Introduce your personal information to continue</p>
            </div>
            </div>
            <div className="flex justify-center w-4/5 lg:w-[65%] pt-3 h-full">
            <div className="flex items-center  w-full h-full" >
                <RegisterInputs />
            </div>
            </div>
        </div>
    </>

}

export default SignUpCard;