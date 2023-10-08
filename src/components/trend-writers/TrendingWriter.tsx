import Image from "next/image";

export default function TrendingWriter({ id, profilePic, username }: any) {
    return (

        <div className="flex flex-col items-center justify-center gap-2 w-52">
            <Image src={profilePic} width={85} height={85} className="rounded-full" alt={`profilePic-${id}`} />

            <div className="bg-white py-1 px-2 rounded-lg break-all">
                <p className="text-center text-lg font-semibold">{username}</p>
            </div>

        </div>
    );

}