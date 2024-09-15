import { Card } from "@/components/ui/card";
import Image from "next/image";
import {cn} from "@/lib/utils";

export const MenuBanner = () => {
    const data = [
        {
            id: 1,
            name: "Apple",
            image: "/apple.png",
        },
        {
            id: 2,
            name: "Dell",
            image: "/dell.png",
        },
        {
            id: 3,
            name: "HP",
            image: "/hp.png",
        },
        {
            id: 4,
            name: "Lenovo",
            image: "/lenovo.png",
        },
        {
            id: 5,
            name: "Asus",
            image: "/asus.png",
        },
        {
            id: 6,
            name: "Acer",
            image: "/acer.png",
        },

        {
            id: 7,
            name: "Microsoft",
            image: "/microsoft.png",
        },
        {
            id: 9,
            name: "Microsoft",
            image: "/microsoft.png",
        },

        {
            id: 10,
            name: "Microsoft",
            image: "/microsoft.png",
        }
    ];

    return (
        <Card className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-3">
            {data.map((item) => (
                <div key={item.id} className="flex flex-col items-center">
                    <div className={cn('p-[10px] md:p-[40px] lg:p-[40px] m-4 lg:hover:border rounded-2xl lg:hover:shadow')}>
                        <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="object-contain"
                        />
                        <p className="text-center font-[14px] mt-2">{item.name}</p>
                    </div>
                </div>
            ))}
        </Card>
    );
};
