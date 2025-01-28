"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";


const Products = () => {
  interface Product {
    title: string;
    discountPercentage: number | null;
    isNew: boolean;
    tags: string[];
    imageUrl: string;
    price: number;
    description: string;
    _id: string;
  }

  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products data
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"]{
        title,
        discountPercentage,
        isNew,
        tags,
        "imageUrl": productImage.asset->url,
        price,
        description,
        _id,
      }`;

      const fetchedProducts = await client.fetch(query);
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  if (!products || products.length === 0) {
    return <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-center text-2xl font-bold">Loading Products...
      </h1>
      <div className="animate-spin h-24 w-24 rounded-full border-2 border-b-blue-800 mt-10"></div>
    </div>
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-5">
        {products.map((product) => (
          <Link href={`/${product._id}`} key={product._id}>
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer">
              <Image
                src={product.imageUrl}
                alt={product.title}
                height={250}
                width={300}
                className="w-full h-64 object-cover"
                priority
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
                  {product.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  ${product.price.toFixed(2)}
                </p>

                {product.discountPercentage && (
                  <span className="inline-block bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                    {product.discountPercentage}% Off
                  </span>
                )}

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all">
                  View Details
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;