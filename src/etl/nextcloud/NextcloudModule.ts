import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config';
import { NextcloudService } from './NextcloudService';

@Module({
    exports: [NextcloudService],
    imports: [ConfigModule],
    providers: [NextcloudService],
})
export class NextcloudModule { }
