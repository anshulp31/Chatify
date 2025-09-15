import "dotenv/config";

export const ENV={
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    EMAIL_FROM_NAME:process.env.EMAIL_FROM_NAME,
    EMAIL_FROM:process.env.EMAIL_FROM,
    JWT_SECRET:process.env.JWT_SECRET,
    CLIENT_URL:process.env.CLIENT_URL
}