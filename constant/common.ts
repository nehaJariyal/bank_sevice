export const TABLES:any={
    USERS:"bankUsers",
    CARD:"cardTables",
    ACCOUNT:"accountTables",
    DIPOSIT:"depositTables",
    WITHDRAWAL:'withdrawalTables',
    TRANSATION:"transactionTables",
    PRODUCT:"productTables",
    ADDCART:"addToCartTables"
}
export const userStatus={
    ACTIVE:1,
    BLOCKED:2,
    DELETED:3
}
export const  responceCode={
    ERROR:400,
    SUCCESS:200,
    SERVER_ERROR:500
}
export const massage={
    ERROR_MASSAGE: "UserId not found" 
}
export const depositMassage={
    SERVER_ERROR_MASSAGE :"Failed to create deposit",
}
export const withdrawalMassage={
   SERVER_ERROR_MASSAGE: "Failed to create withdrawal"
}