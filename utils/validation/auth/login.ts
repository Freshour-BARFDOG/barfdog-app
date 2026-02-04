import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("이메일 형식이 올바르지 않아요."),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const defaultLoginValues = (initialUserEmail: string | null) => {
  return {
    email: initialUserEmail || "",
    password: "",
  };
};
