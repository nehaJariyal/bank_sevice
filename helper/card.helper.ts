import database from "../models/index";

export const createAtmCard = async (data: any) => {
  try {
    const user = database.CardModel.create({
      userId: data.userId,
      cardholderName: data.cardholderName,
      cardNo: data.cardNo,
      epireDate: data.epireDate,
      cardType: data.cardType,
      balance: data.balance,
    });
    return user;
  } catch (error: any) {
    console.error("Error creating user:", error);
    return false;
  }
};

export const deleteCard = async (id: any) => {
  try {
    const deleteCardById = await database.CardModel.destroy({
      where: { id },
    });
    return deleteCardById;
  } catch (error) {
    console.error("Error deleting by destroy db:", error);
    throw new Error("Database error");
  }
};

export const updateCardById = async (id: number, cardData: object) => {
  try {
    const response = await database.CardModel.update(cardData, {
      where: { id },
    });

    return response;
  } catch (error: any) {
    console.log("Update Atm By Id  catch error", error);
    return false;
  }
};
export const checkCardTypeIsExisting = async (
  cardType: string,
  userId: any
) => {
  try {
    const checkCardType = await database.CardModel.findOne({
      where: { cardType: cardType, userId: userId },

      raw: true,
    });
    return checkCardType;
  } catch (error) {
    console.error("Error finding  cardType and userId:", error);
    throw new Error("Database error");
  }
};
export const checkCardIdIsExisting = async (cardId: string, userId: any) => {
  try {
    const checkCardIdOrUserID = await database.CardModel.findOne({
      where: { id: cardId, userId: userId },
      raw: true,
    });
    return checkCardIdOrUserID;
  } catch (error) {
    console.error("Error finding cardId and userId:", error);
    throw new Error("Database error");
  }
};
export const getCardByIdOruserId=async( cardId:any,userId:any)=>{
    try {
      let checkCardIdOrUserID:any
        if(cardId){

           checkCardIdOrUserID = await database.CardModel.findOne({
                where: { id: cardId ,userId:userId },
                raw: true,
              });
        }else{
           checkCardIdOrUserID = await database.CardModel.findAll({
            where: { userId: userId },
            raw: true,
          });
        }
    return checkCardIdOrUserID;

    } catch (error) {
        console.error("Error finding cardId and userId:", error);
        throw new Error("Database error");        
    }
} 