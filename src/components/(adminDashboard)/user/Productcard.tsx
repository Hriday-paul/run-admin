import { Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import product1 from '@/assets/image/product.jpg'
import product2 from '@/assets/image/product2.png'
import product3 from '@/assets/image/product3.png'
import { IProduct } from '@/redux/types';

const Productcard = ({ productData }: { productData: IProduct }) => {
    const number = Math.round(Math.random() * 3)

    const image = number == 1 ? product1 : number == 2 ? product2 : product3

    return (
        <div className="w-64 bg-white rounded-lg overflow-hidden shadow-sm">
            {/* Product Image */}
            <div className="aspect-[4/5] bg-gray-100">
                <Image
                    src={productData?.images[0]}
                    alt="product image"
                    className="w-full h-full object-cover"
                    height={1500}
                    width={1000}
                />
            </div>

            {/* Card Content */}
            <div className="p-4 space-y-2">
                {/* Star Rating */}
                <div className="flex items-center gap-1">

                    {[...Array(5)].map((_, i) => {
                        const index = i + 1;
                        const isFull = (productData?.avgRating || 0) >= index;
                        const isHalf = (productData?.avgRating || 0) >= index - 0.5 && (productData?.avgRating || 0) < index;

                        return (
                            <div key={i} className="relative w-4 h-4">
                                {/* Empty star */}
                                <Star className="absolute w-4 h-4 text-gray-300" />

                                {/* Full or half-filled star */}
                                {isFull ? (
                                    <Star className="absolute w-4 h-4 fill-yellow-400 text-yellow-400" />
                                ) : isHalf ? (
                                    <div className="absolute w-2 h-4 overflow-hidden">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    </div>
                                ) : null}
                            </div>
                        );
                    })}

                    <span className="text-sm text-gray-500 ml-1">({productData?.reviewCount || 0})</span>
                </div>

                {/* Product Title */}
                <h3 className="text-lg font-semibold text-gray-900 leading-tight">{productData?.title}</h3>

                {/* Brand Name */}
                <p className="text-sm text-gray-600">Brand : {productData?.brand?.name || "N/A"}</p>

                {/* Pricing */}
                <div className="flex items-center gap-2">
                    {/* <span className="text-sm text-gray-500 line-through">15$</span> */}
                    <span className="text-lg font-bold text-red-500">{productData?.price} $</span>
                </div>
            </div>
        </div>
    );
};

export default Productcard;