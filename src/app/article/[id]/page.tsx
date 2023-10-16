
import PostComponent from "@/components/main/PostComponent"

export default async function Article({ params }: any) {

    return (
        <>
            <PostComponent id= {params.id} />
        </>

    )
}