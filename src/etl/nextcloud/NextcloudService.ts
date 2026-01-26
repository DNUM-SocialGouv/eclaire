import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as fs from 'fs';
//import path from 'path';

@Injectable()
export class NextcloudService {
    private baseUrl: string;
    private auth: { username: string; password: string };

    constructor(private readonly configService: ConfigService) {
        this.baseUrl = `${this.configService.get('NEXTCLOUD_URL')}/remote.php/webdav${this.configService.get('NEXTCLOUD_BASE_PATH')}`;
        this.auth = {
            username: this.configService.get('NEXTCLOUD_USERNAME'),
            password: this.configService.get('NEXTCLOUD_APP_PASSWORD'),
        };
    }

    // TEST 1 — Check the connexion
    /* private async getClient() {
        if (this.client) return this.client;

        console.log('test here3 ////')
        const { createNextcloudClient } = await import(path.join(__dirname, 'nextcloud-client-wrapper.mjs'));
        //const { createClient } = await import('webdav'); // 👈 IMPORTANT

        this.client = createNextcloudClient(
            `${this.configService.get('NEXTCLOUD_URL')}/remote.php/webdav${this.configService.get('NEXTCLOUD_BASE_PATH')}`,
            {
                username: this.configService.get('NEXTCLOUD_USERNAME'),
                password: this.configService.get('NEXTCLOUD_APP_PASSWORD'),
            },
        );

        return this.client;
    } */
    async testConnection() {
        const response = await axios({
            method: 'PROPFIND',
            url: this.baseUrl,
            auth: this.auth,
            headers: { Depth: 1 },
        });
        return response.data;
    }


    // TEST 2 — Download the file from Nextcloud
    async downloadFile(remoteFileName: string, localPath: string) {
        const url = `${this.baseUrl}/${remoteFileName}`;
        const response = await axios.get(url, {
            auth: this.auth,
            responseType: 'stream',
        });

        const writer = fs.createWriteStream(localPath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', resolve);
            writer.on('error', reject);
        });
    }
}
