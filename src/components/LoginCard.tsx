import LoginInputs from "./LoginInputs";
import LoginWelcome from "./LoginWelcome";


export default function LoginCard() {
    return (
        <div id = "login-container" className="bg-white my-[2rem] p-10 rounded-[13px]">
            <div className="flex flex-col items-center justify-center" >
                <p className="justify-center font-bold text-2xl text-sky-500 mb-3">TrUNews</p>
                <p className="justify-center text-base text-black leading-5">¡Bienvenid@ de vuelta!</p>
                <p className="justify-center text-base text-black leading-5 mb-3">Ingresa tu contraseña para continuar</p>
            </div>
            
            <div className="flex items-center justify-center" >
                <LoginWelcome />
                <LoginInputs />
            </div>
        </div>

    );
}