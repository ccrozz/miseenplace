export interface Product {
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    slug: "chef-polo-grey",
    name: "The Chef Polo — Grey",
    price: 98,
    image: "/images/polo-grey-flat.png",
    description: "Pima cotton piqué. Chef-coat closure. Made in Portugal.",
  },
  {
    slug: "chef-polo-navy",
    name: "The Chef Polo — Navy",
    price: 98,
    image: "/images/polo-navy-flat.png",
    description: "Pima cotton piqué. Contrast collar. Brass buttons.",
  },
];
