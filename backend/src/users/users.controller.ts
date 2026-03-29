// import {
//   Controller,
//   Get,
//   Patch,
//   Body,
//   UseGuards,
//   Req,
// } from '@nestjs/common';
// import { UsersService }  from './users.service.js';
// import { UpdateUserDto } from './dto/update-user.dto.js';
// import { JwtAuthGuard }  from '../auth/jwt.guard.js';

// @Controller('users')
// @UseGuards(JwtAuthGuard) // ← all routes require auth
// export class UsersController {
//   constructor(private service: UsersService) {}

//   // GET /users/me
//   // Returns the current logged-in user's full profile
//   // Used by: job detail page, settings page, dashboard
//   @Get('me')
//   getMe(@Req() req) {
//     return this.service.getMe(req.user.sub);
//   }

//   // PATCH /users/me
//   // Updates name, email, or country
//   @Patch('me')
//   updateMe(@Req() req, @Body() dto: UpdateUserDto) {
//     return this.service.updateMe(req.user.sub, dto);
//   }
// }


import {
  Controller,
  Get,
  Patch,
  Post,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService }      from './users.service.js';
import { UpdateUserDto }     from './dto/update-user.dto.js';
import { ChangePasswordDto } from './dto/change-password.dto.js';
import { JwtAuthGuard }      from '../auth/jwt.guard.js';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private service: UsersService) {}

  // GET /users/me
  @Get('me')
  getMe(@Req() req) {
    return this.service.getMe(req.user.sub);
  }

  // PATCH /users/me — update name, email, country
  @Patch('me')
  updateMe(@Req() req, @Body() dto: UpdateUserDto) {
    return this.service.updateMe(req.user.sub, dto);
  }

  // POST /users/me/change-password
  @Post('me/change-password')
  changePassword(@Req() req, @Body() dto: ChangePasswordDto) {
    return this.service.changePassword(req.user.sub, dto);
  }
}