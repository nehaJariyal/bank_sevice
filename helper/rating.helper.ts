import database from "../models/index";

export const createProductRating = async (data: any) => {
  try {
    const user = await database.RatingModel.create({
      productId: data.productId,
      userId: data.userId,
      rating: data.rating,
      review: data.review,
    });
    return user;
  } catch (error: any) {
    console.log("Error product rating detail:", error);
    return false;
  }
};

export const checkProductIdorUserIdIsExisting = async (
  productId: number,
  userId: any
) => {
  try {
    const checkCartIdOrUserID = await database.RatingModel.findOne({
      where: {
        productId: productId,
        userId: userId,
      },
      raw: true,
    });
    return checkCartIdOrUserID;
  } catch (error) {
    console.log("Error finding productId and userId:", error);
    throw new Error("Database error");
  }
};

export const getallRatings = async (productId: any) => {
  try {
    const productWithRatings = await database.ProductModel.findOne({
      where: { id: productId },
      include: [
        {
          model: database.RatingModel,
          as: "rating",
          required: true,
        },
      ],
    });

    const ratings = await database.RatingModel.findAll({
      where: { productId: productId },
      attributes: ["id", "userId", "productId", "rating", "review"],
    });

    const total_rating = await database.RatingModel.sum("rating", {
      where: { productId: productId },
    });

    const total_person = ratings.length;
    const average_rating = total_rating / total_person;

    console.log("Total:", total_rating);

    return {
      productWithRatings,
      total_person,
      average_rating,
    };
  } catch (error) {
    console.log("Error fetching ratings:", error);
    return false;
  }
};
