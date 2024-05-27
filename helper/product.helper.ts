import models from "../models/index";
import database from "../models/index";

export const createProduct=async (data:any)=>{
    try {
        const user =await database.ProductModel.create({
      userId:data.userId,
      productName:data.productName,
      description:data.description,
      price:data.price,
      image:data.image,
      category:data.category
        })
        return user;

    } catch (error:any ) {
        console.log('Error creating product',error)
        return false
    }
}

 export const updateProductbyId= async(id:number,productData:object)=>{
    try {
        const response=await database.ProductModel.update(productData,{
            where:{id}
        })
        return response;
        
    } catch (error:any) {
        console.log("Error update product", error);
    return false;
  
    }
}

export const deleteProduct=async (id:any)=>{
    try {
        const deleteProductById =await database.ProductModel.destroy({
            where:{id},
        })
        return deleteProductById;
    } catch (error) {
        console.log('Error delete product ')
        return false
        
    }
}
  

export const checkproductIdIsExisting = async (productId:any,userId:any)=>{
    try {
        const checkproductIdOrUserID = await database.ProductModel.findOne({
          where: { id: productId, userId: userId },
          raw: true,
        });
        return checkproductIdOrUserID;
}catch(error:any){
    console.error("Error finding productId and userId:", error);
    throw new Error("Database error");
  }
}

export const getProductByIdOruserId=async( productId:any,userId:any)=>{
    try {
      let checkProductIdOrUserID:any
        if(productId){

           checkProductIdOrUserID = await database.ProductModel.findOne({
                where: { id: productId ,userId:userId },
                raw: true,
              });
        }else{
           checkProductIdOrUserID = await database.ProductModel.findAll({
            where: { userId: userId },
            raw: true,
          });
        }
    return checkProductIdOrUserID;

    } catch (error) {
        console.error("Error finding productId and userId:", error);
        throw new Error("Database error");        
    }
} 

 