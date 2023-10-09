// components/Carousel.tsx
// import the hook and options type
'use client'
import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { PropsWithChildren, useEffect, useState } from "react";
import CarouselDots from "./CarouselDots";
import React from 'react'
import CarouselControls from "@/components/main/CarouselControls";
// Define the props
type Props = PropsWithChildren & EmblaOptionsType;

const Carousel = ({ children, ...options }: Props) => {
    // 1. useEmblaCarousel returns a emblaRef and we must attach the ref to a container.
    // EmblaCarousel will use that ref as basis for swipe and other functionality.
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => {
        function selectHandler() {
            // selectedScrollSnap gives us the current selected index.
            const index = emblaApi?.selectedScrollSnap();
            setSelectedIndex(index || 0);
        }

        emblaApi?.on("select", selectHandler);
        // cleanup
        return () => {
            emblaApi?.off("select", selectHandler);
        };
    }, [emblaApi]);

    const length = React.Children.count(children);
    const canScrollPrev = !!emblaApi?.canScrollPrev();
    const canScrollNext = !!emblaApi?.canScrollNext();
    return (
        // Attach ref to a div
        // 2. The wrapper div must have overflow:hidden
        <>
            <CarouselControls
                canScrollNext={canScrollNext}
                canScrollPrev={canScrollPrev}
                onNext={() => emblaApi?.scrollNext()}
                onPrev={() => emblaApi?.scrollPrev()}
            />
            <div className="overflow-hidden mb-10" ref={emblaRef}>
                {/* 3. The inner div must have a display:flex property */}
                {/* 4. We pass the children as-is so that the outside component can style it accordingly */}
                <div className="flex">{children}</div>
            </div>
            <CarouselDots itemsLength={length} selectedIndex={selectedIndex} />
        </>
    );
};
export default Carousel;
