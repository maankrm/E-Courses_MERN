import { cardModel } from "../models/cardModel";

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
