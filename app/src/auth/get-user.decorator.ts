import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Member } from "./member.interface";

// export const GetMember = createParamDecorator((data, req): Member => {
//     return req.user;
//   });


// Nestjs 7
  export const GetMember = createParamDecorator((data, ctx: ExecutionContext): Member => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
});