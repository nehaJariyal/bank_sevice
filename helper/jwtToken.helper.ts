import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.TOKEN_KEY || "secretkey";

export const generateJwtToken = (
  payload: { id?: string; email?: string },
  expiresIn: string | number = "3h"
): string => {
  try {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  } catch (error) {
    console.error("Error generating JWT token:", error);
    throw new Error("JWT token generation failed");
  }
};
export default generateJwtToken;
