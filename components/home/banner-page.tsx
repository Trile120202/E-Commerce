"use client"
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {cn} from "@/lib/utils";
import Image from "next/image";

export function CarouselPlugin() {
    const plugin = React.useRef(
        Autoplay({delay: 4000, stopOnInteraction: true})
    )

    const data = [
        {
            id: 0,
            image: "/aaaa.jpg",
            link: "www.banner.png",
        },
        {
            id: 1,
            image: "/aaaa.jpg",
            link: "www.banner.png",
        },
        {
            id: 2,
            image: "/aaaa.jpg",
            link: "www.banner.png",
        },
        {
            id: 3,
            image: "/aaaa.jpg",
            link: "www.banner.png",
        }
    ]

    return (
        <>
            <div className={cn('flex w-full justify-center py-10')}>
                <Carousel
                    plugins={[plugin.current]}
                    opts={
                        {
                            loop: true
                        }
                    }
                    orientation="horizontal"
                    className="w-full h-1/2"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                >
                    <CarouselContent>
                        {
                            data.map((item, index) => (
                                <CarouselItem key={index} className="w-full">
                                    <a href={item.link}>
                                        <div className="relative overflow-hidden ">
                                            <div className="flex flex-col justify-center">
                                                <Image
                                                    src={item.image}
                                                    alt={item.image}
                                                    className="object-cover w-full "
                                                    width={1024}
                                                    height={200}
                                                />
                                            </div>
                                        </div>
                                    </a>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"/>
                    <CarouselNext className="absolute top-1/2 right-10 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg"/>
                </Carousel>
            </div>
        </>
    )
}
