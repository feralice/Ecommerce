import { authorizantionToLoginPayload } from "../utils/base-64-converter";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const { authorization } = ctx.switchToHttp().getRequest().headers;

  const loginPayload = authorizantionToLoginPayload(authorization);

  return loginPayload?.id;
});
