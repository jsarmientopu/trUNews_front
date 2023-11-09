import React from 'react'

interface Props {}

function Page({params}:any) {
    

    return (
        <div>
            {params.id}
        </div>
    )
}

export default Page
