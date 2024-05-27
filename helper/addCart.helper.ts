import database from "../models/index";




export const createAddTocart = async (data: any) => {
    console.log("data",data);
    
    try {
      const user = await database.AddCartModel.create({
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity, 
        status: data.status,
      });
      return user;
    } catch (error: any) {
      console.error("Error creating add to card entry:", error);
return false
    }
  };




  export const isProductIdOrUserIdExisting = async (userId: any, productId: any) => {
    try {
      const existingEntry = await database.AddCartModel.findOne({
        where: { userId, productId },
       
        raw: true,
      });
      return existingEntry  
    } catch (error) {
      console.error("Error finding entry by userId and productId:", error);
     return false
    }
  };
  

  export const updateQuantity = async (userId: any, productId: any, quantity: number) => {
    try {
      const response = await database.AddCartModel.update(
        { quantity },
        {
          where: { userId, productId },
        }
      );
  
      return response;
    } catch (error: any) {
      console.error("Error updating quantity:", error);
      return false;
    }
  };
 
export const getcartProfile = async (productId:any) => {
  try {
    const user = await database.ProductModel.findAll({
      where: { id: productId },
      include: [
        {
          model: database.AddCartModel,
          as: 'addToCard',
          required: true
        }
      ]
    });
    return user;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};