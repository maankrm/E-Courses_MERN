import { cardModel } from "../models/cardModel";
import productModel from "../models/productModel";

interface createCardForUser {
  userId: string;
}

// create card for user------------------------------------------------------------------------------------------------------------
// user has not any card >> the first time function
const createCardForUser = async ({ userId }: createCardForUser) => {
  const card = await cardModel.create({ userId, totalAmount: 0 });
  // save the card in db
  await card.save();
  return card;
};

interface GetActiveCardForUser {
  userId: string;
}

// user is already has a card just get it 
export const getActiveCardForUse = async ({ userId }: GetActiveCardForUser) => {
  // if there is a card for user
  let card = await cardModel.findOne({ userId, status: "Active" });

  // if no card create one
  if (!card) {
    card = await createCardForUser({ userId });
  }

  return card;
};


// add items-----------------------------------------------------------------------------------------------------------------------
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


// update -----------------------------------------------------------------------------------------------------------------
interface UpdateItemInCard {
  userId: string;
  productId: any;
  quantity: number;
}
export const updateItemInCard = async ({
  userId,
  productId,
  quantity,
}: UpdateItemInCard) => {
  const card = await getActiveCardForUse({ userId });
  const existedCard: any = card.items.find((p) => {
    p.product.toString() === productId;
  });

  if (!existedCard) {
    return { data: "No Item in card yet ", statusCode: 400 };
  }

  const product = await productModel.findById(productId);

  // calculate card quantity (total amount)

  const otherItem = card.items.filter(
    (p) => p.product.toString() !== productId
  );

  let totalAmout = otherItem.reduce((total, product: any) => {
    total += product.quantity * product.unitPrice;
    return total;
  }, 0);

  existedCard.quantity = quantity;

  totalAmout += existedCard.quantity * existedCard.unitPrice;

  const updatedCard = await card.save();

  return { data: updatedCard, statusCode: 200 };
};
