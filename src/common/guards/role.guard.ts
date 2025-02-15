import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from 'src/constant/role';

/**
 * 权限路由守卫
 */
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 获取路由处理函数上装饰器的 roles 元数据
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());

    // 如果没有定义 roles 装饰器，默认允许访问
    if (!requiredRoles) {
      return true;
    }

    // 获取请求中的用户信息
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // 如果用户不存在或者用户角色数组中不包含所需角色，抛出权限不足异常
    if (!user || !user.roles || !user.roles.some(role => requiredRoles.includes(RoleEnum[role]))) {
      throw new UnauthorizedException('权限不足');
    }

    return true;
  }
}
