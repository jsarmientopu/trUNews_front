import React from "react";
import {Card, CardBody, Skeleton} from "@nextui-org/react";

const SkeletonCard=({mode}:{mode:Number})=>{
  if (mode==1){
    return(
      <Card className="w-[200px] space-y-5 p-4 w-full" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300"></div>
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">  
            <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      </Card>
    );
  }
  return (
    <Card className="w-[80%] p-unit-lg shadow-lg bg-[#F0F2F4] flex item-center space-y-4" radius="lg">
        <div>
        <Skeleton className="rounded-lg">
          <div className="h-64 rounded-lg bg-default-300"></div>
        </Skeleton>
        </div>
        <div className="space-y-4">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-5 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-5 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">  
            <div className="h-5 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
    </Card>
  );
}

export default SkeletonCard;