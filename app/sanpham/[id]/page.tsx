'use client'
import React, { useEffect, useState } from 'react';

const ProductPage = ({ params }: { params: { id: string } }) => {
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products/${params.id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                const data = await response.json();
                setProduct(data.data);
            } catch (err) {
                // @ts-ignore
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [params.id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    if (!product) return null;

    return (
        <div className="max-w-5xl mx-auto py-10 px-4">
            {/* Product Title */}
            <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Image Section */}
                <div className="flex flex-col gap-4">
                    <img
                        className="w-full h-auto rounded-md"
                        src={product.image_id?.imageBase64}
                        alt={product.name}
                    />
                    <div className="grid grid-cols-2 gap-2">
                        {product.image_ids?.map((image: any) => (
                            <img
                                key={image._id}
                                className="w-full h-auto rounded-md"
                                src={image.imageBase64}
                                alt="Product Image"
                            />
                        ))}
                    </div>
                </div>

                {/* Product Details */}
                <div className="space-y-6">
                    {/* Price */}
                    <p className="text-2xl font-semibold text-green-600">
                        {product.price.toLocaleString()} VND
                    </p>

                    {/* Description */}
                    <p className="text-lg text-gray-700">{product.description}</p>

                    {/* Category */}
                    <p className="text-gray-600">
                        Category: <span className="font-semibold">{product.category_id?.name}</span>
                    </p>

                    {/* Stock Information */}
                    <p className="text-gray-600">
                        In Stock: <span className="font-semibold">{product.stock}</span>
                    </p>

                    {/* Sold Information */}
                    <p className="text-gray-600">
                        Sold: <span className="font-semibold">{product.sold}</span>
                    </p>

                    {/* Add to Cart Button */}
                    <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
