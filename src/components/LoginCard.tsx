import LoginInputs from "./LoginInputs";
import LoginWelcome from "./LoginWelcome";

export default function LoginCard() {

    return (
        
        <div id = "login-container" className=" bg-white p-16 rounded-[17px] h-4/5 grid place-items-center">
            <div className="flex justify-center pt-3">
            <div className="flex flex-col items-center justify-center h-full" >
                <p className="justify-center font-bold text-2xl text-sky-500 mb-3">TrUNews</p>
                <p className="justify-center text-base text-black leading-5">¡Bienvenid@ de vuelta!</p>
                <p className="justify-center text-base text-black leading-5 mb-3">Ingresa tu contraseña para continuar</p>
            </div>
            </div>
            <div className="flex justify-center">
            <div className="flex items-center justify-center pt-5" >
                <LoginWelcome />
                <LoginInputs />
            </div>
            </div>
        </div>

    );
}