
import PostComponent from "@/components/PostComponent"

export default async function Articulo({ params }: any) {

    return (
        <>
            <PostComponent id= {params.id} />
        </>

    )
}