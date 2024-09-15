import Image from "next/image";
import {CarouselPlugin} from "@/components/home/banner-page";
import { ProductList} from "@/components/home/product-list";
import {cn} from "@/lib/utils";
import Example from "@/components/home/banner-slider";
import {MenuBanner} from "@/components/home/menu-banner";

export default function Home() {
    const data = [
        {
            id: 0,
            name: 'Ram PATRIOT Viper Steel RGB 32GB | DDR4, 3200MHz, 2x16GB',
            image: '/sp.webp',
            price: 1299000,
        },
        {
            id: 1,
            name: 'Thùng máy Case Magic M-01 | Micro ATX, Không Fan',
            image: '/sp.webp',
            price: 1099000,
        },
        {
            id: 2,
            name: 'Product 3',
            image: '/sp.webp',
            price: 999000,
        },
        {
            id: 3,
            name: 'Product 4',
            image: '/sp.webp',
            price: 899000,
        },
        {
            id: 4,
            name: 'Product 5',
            image: '/sp.webp',
            price: 799000,
        },
        {
            id: 5,
            name: 'Product 6',
            image: '/sp.webp',
            price: 699000,
        }, {
            id: 6,
            name: 'Product 7',
            image: '/sp.webp',
            price: 599000,
        }, {
            id: 7,
            name: 'Product 8',
            image: '/sp.webp',
            price: 499000,
        }, {
            id: 8,
            name: 'Product 9',
            image: '/sp.webp',
            price: 399000,
        },
        {
            id: 9,
            name: 'Product 9',
            image: '/sp.webp',
            price: 399000,
        }
    ]
    return (
        <main className={cn("px-6 md:px-20 lg:px-24")}>
            <CarouselPlugin/>
            <MenuBanner/>
            <ProductList data={data} classNameTitle={cn('bg-red-600')} title={"Sản phẩm bán chạy"} linkTitle={"/sanpham?tag=laptop-ban-chay"}/>
            <ProductList data={data} classNameTitle={cn('bg-green-600')} title={"Laptop gaming"} delay={5000} linkTitle={"/sanpham?tag=laptop-gaming"}/>
            <ProductList data={data} title={"Laptop văn phòng"} delay={6000} linkTitle={"/sanpham?tag=laptop-van-phong"}/>
        </main>
    );
}
