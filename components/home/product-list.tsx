'use client'
import * as React from "react"
import {Card, CardContent, CardHeader} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
}

interface ProductHotProps {
    data: Product[];
    title: string;
    classNameTitle?: string;
    delay?: number;
    linkTitle?:string
}

export function ProductList({data, title,classNameTitle,delay,linkTitle}: ProductHotProps) {
    return (
        <>
            <div className={cn('py-10')}>
                <div className={cn('bg-orange-500 p-4 rounded-bl-2xl text-white font-bold mb-8',classNameTitle)}>
                    {linkTitle && <a href={linkTitle}>{title}</a>}
                    {!linkTitle && <>{title}</>}
                </div>
                <div className={cn('w-full flex justify-center ')}>
                    <Carousel
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                        plugins={
                            [
                                Autoplay({delay:delay?? 4500, stopOnInteraction: true}),
                            ]
                        }
                        className="w-full max-w-[90%]"
                    >
                        <CarouselContent>
                            {data.map((item) => (
                                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
                                    <div className="py-1 px-2.5">
                                        <Card
                                            className={cn('min-h-[400px] max-h-[400px] flex flex-col justify-between')}>
                                            <CardHeader className="flex items-center justify-center">
                                                <Image src={item.image} alt={item.name} width={213} height={213}/>
                                            </CardHeader>
                                            <CardContent className="flex flex-col justify-between flex-grow">
                                                <div className="flex w-full justify-center text-[18px] font-semibold">
                                                    <a href={`/sanpham/${item.id}`}>{item.name}</a>
                                                </div>
                                                <div className="flex w-full justify-center mt-auto text-gray-400">
                                                    Giá: {item.price.toLocaleString('vi-VN', {
                                                    style: 'currency',
                                                    currency: 'VND'
                                                })}
                                                </div>
                                                <Button onClick={()=>window.location.href=`/sanpham/${item.id}`} className={cn('bg-red-700')}>Mua ngay</Button>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>

                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                </div>
            </div>
        </>
    )
}
