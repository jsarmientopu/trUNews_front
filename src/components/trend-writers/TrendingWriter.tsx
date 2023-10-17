import Image from "next/image";
import Link from "next/link";

export default function TrendingWriter({ id, profilePic, username }: any) {
    return (

        <Link className="flex flex-col items-center justify-center gap-2 w-52 my-3 xl:my-auto" href={`profile/${id}`}>
            <Image src={profilePic} width={85} height={85} className="rounded-full shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]" alt={`profilePic-${id}`} />

            <div className="bg-white py-1 px-2 rounded-lg break-all shadow-[0_35px_60px_-15px_rgba(0,0,0,1)]">
                <p className="text-center text-lg font-semibold">{username}</p>
            </div>
        </Link>
    );

}