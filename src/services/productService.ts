import productModel from "../models/productModel";

// function to add products inside db
export const getAllProducts = async () => {
  return await productModel.find();
};

// array to seed products in db one time ( best practice to call this function while app starting)
export const seedInitialProducts = async () => {
  const products = [
    {
      title: "Course-1",
      image: "image.png",
      price: 120,
      discription: "This is a first course !",
      ratings: 3,
    },
    {
      title: "Course-2",
      image: "image.png",
      price: 100,
      discription: "This is a secound course !",
      ratings: 4,
    },
  ];

  const courseProducts = await getAllProducts();
  // if no products inside db create products , if yes do not do anything
  if (courseProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
