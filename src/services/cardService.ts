import { cardModel } from "../models/cardModel";
import productModel from "../models/productModel";

interface createCardForUser {
  userId: string;
}

// create card for user
const createCardForUser = async ({ userId }: createCardForUser) => {
  const card = await cardModel.create({ userId, totalAmount: 0 });
  await card.save();
  return card;
};

interface GetActiveCardForUser {
  userId: "string";
}

export const getActiveCardForUse = async ({ userId }: GetActiveCardForUser) => {
  let card = await cardModel.findOne({ userId, status: "Active" });

  if (!card) {
    card = await createCardForUser({ userId });
  }

  return card;
};

interface AddItemToCard {
  productId: any;
  quantity: string;
  userId?: any;
}

export const addItemToCard = async ({
  userId,
  productId,
  quantity,
}: AddItemToCard) => {
  const card = await getActiveCardForUse({ userId });

  // check if there is any item in the card
  const existedCard = card.items.find((p) => {
    p.product.toString() === productId;
  });

  if (existedCard) {
    return { data: "Item is already existed in the card", statusCode: 400 };
  }

  // Fetch the product
  const product = await productModel.findById(productId);

  if (!product) {
    return { data: "Product is not found!", statusCode: 400 };
  }

  // push the item
  card.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: quantity,
  });

  // update the totalAmount for the card

  card.totalAmount += product.price * parseInt(quantity);

  const updatedCard = await card.save();

  return { data: updatedCard, statusCode: 201 };
};
