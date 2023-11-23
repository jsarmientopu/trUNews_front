import LoginInputs from "./LoginInputs";
import LoginWelcome from "./LoginWelcome";

export default function LoginCard() {

    return (
        
        <div id = "login-container" className=" bg-white p-16 rounded-2xl h-4/5 grid place-items-center gap-10 my-3">
            <div className="flex justify-center pt-3">
            <div className="flex flex-col items-center justify-center h-full" >
                <p className="justify-center font-bold text-2xl text-[#0079DC] mb-3">TrUNews</p>
                <p className="justify-center text-base text-black leading-5">¡Welcome back!</p>
                <p className="justify-center text-base text-black leading-5 mb-3">Introduce your password to continue</p>
            </div>
            </div>
            <div className="flex justify-center">
            <div className="flex items-center justify-center py-5" >
                <LoginWelcome />
                <LoginInputs />
            </div>
            </div>
        </div>

    );
}