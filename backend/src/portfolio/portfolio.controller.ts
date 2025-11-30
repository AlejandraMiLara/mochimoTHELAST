import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get(':id')
  getPortfolio(@Param('id') userId: string,) {
    return this.portfolioService.getPortfolio(userId);
  }

  @Get('project/:projectId')
  getPublicProject(@Param('projectId') projectId: string) {
    return this.portfolioService.getPublicProject(projectId);
  }
}