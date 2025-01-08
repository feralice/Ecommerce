import { UserType } from "@/modules/user/application/enum/user-type.enum";
import { SetMetadata } from "@nestjs/common";

export const ROLES_KEY = "roles";
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
