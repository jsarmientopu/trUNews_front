
import PostComponent from "@/components/main/PostComponent"

export default async function Articulo({ params }: any) {

    return (
        <>
            <PostComponent id= {params.id} />
        </>

    )
}