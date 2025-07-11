import { z } from "zod";
export const JWT_SECRET = "qwertyui";
export const UserInputValidation = z.object({
  username: z.string().min(2).max(100).trim(),
  password: z
    .string()
    .min(8)
    .max(50)
    .trim()
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain atleast one uppercase letter",
    })
    .refine((password) => /[!@#$%^&*]/.test(password), {
      message: "Password must contain aleast one speacial character",
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "Password must contain atleast one number",
    }),
});
export const ContentValidation = z.object({
  title: z.string().min(3).trim(),
  type: z.string(),
  link: z.string().optional(),
  // tags: z.string()
});
export const LinkValidation = z.object({
  share: z.boolean(),
});
export function randomHash() :string{
  let str: string = "";
  const characters: string =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i: number = 0; i < 15; i++) {
    let randomNum: number = Math.floor(Math.random() * characters.length) + 1;
    str += characters.charAt(randomNum);
  }
  return str;
}
