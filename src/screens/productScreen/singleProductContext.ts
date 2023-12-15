import { useState, createContext } from "react";

interface SingleProductProps {
  data: any;
  addtoCart: Function;
  loadingCart: boolean;
  addWishlist: Function;
  favorite: boolean;
  openReview: Function;
  reviews: any[];
  deleteReview: Function;
  reviewMeta: any;
  reviewPage: number;
  reviewPageSize: number;
  getReviewPage: Function;
  reviewLoading: boolean;
  variants: any;
  selectedVariant: any;
  setSelectedVariant: Function;
  activeVariant: any;
}

export const SingleProductContext = createContext<SingleProductProps | null>(
  null
);
