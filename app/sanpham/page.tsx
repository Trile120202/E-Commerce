"use client"
import React, {useEffect, useState} from 'react';
import {useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {apiCall} from "@/lib/call-api";

interface Product {
    _id: string;
    name: string;
    price: number;
    category_id: {
        _id: string;
        name: string;
        image_id: string;
        status: boolean;
        createdAt: string;
        __v: number;
    };
    image_id: {
        _id: string;
        imageBase64: string;
    };
    description: string;
    stock: number;
    status: boolean;
    createdAt: string;
    __v: number;
}

const Page = () => {
    const searchParams = useSearchParams();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const handlePageChange = (page: number) => {
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };
    // @ts-ignore
    const tag = searchParams.get('tag');
    // @ts-ignore
    const search = searchParams.get('search')??'';
    const [data, setData] = useState<{
        data: Product[];
        total: number;
        currentPage: number;
        totalPages: number
    }>({data: [], total: 0, currentPage: 1, totalPages: 1});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/products/search?limit=12&page=${currentPage}&name=${search}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
                setTotalPages(result.totalPages)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const content = () => {
        if (loading) return <p>Loading...</p>;

        if (data.data.length === 0) return <p>No products found.</p>;

        return (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                {data.data.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image_id.imageBase64} alt={product.name} />
                        <h2>{product.name}</h2>
                        <p>{product.price.toLocaleString()} VNĐ</p>
                    </div>
                ))}
            </div>
        );
    };


    const headerContent = () => {
        return (
            <>
                <div>

                </div>
            </>
        )
    }
    const pageination = () => {
        if (totalPages <= 1) return <div className={cn('py-10')}></div>;
        return (
            <div className={cn('py-10')}>
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() => handlePageChange(currentPage - 1)}
                            />
                        </PaginationItem>
                        {Array.from({length: totalPages}, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink
                                    href="#"
                                    isActive={currentPage === index + 1}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {totalPages > 5 && currentPage < totalPages - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis/>
                            </PaginationItem>
                        )}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() => handlePageChange(currentPage + 1)}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        )
    }

    return (
        <div className={cn("px-6 md:px-20 lg:px-24")}>
            {headerContent()}
            {content()}
            {pageination()}
        </div>
    );
};

export default Page;