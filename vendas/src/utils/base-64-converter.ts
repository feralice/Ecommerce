import { LoginPayload } from "@/modules/auth/application/dto/login-payload.dto";

export const authorizantionToLoginPayload = (
  authorization: string,
): LoginPayload => {
  const authorizationSplited = authorization.split(".");

  if (authorizationSplited.length < 3 || !authorizationSplited[1]) {
    return undefined;
  }
  //conversão com buffer
  return JSON.parse(
    Buffer.from(authorizationSplited[1], "base64").toString("ascii"),
  );
};
