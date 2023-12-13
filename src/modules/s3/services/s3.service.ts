import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class S3Service {
	private s3 = new AWS.S3({
		accessKeyId: 'YOUR_ACCESS_KEY_ID',
		secretAccessKey: 'YOUR_SECRET_ACCESS_KEY',
	});

	async uploadFile(
		key: string,
		bucketName: string,
		file: Express.Multer.File,
	): Promise<string> {
		const params = {
			Key: key,
			Body: file.buffer,
			Bucket: bucketName,
			ContentType: file.mimetype,
		};

		const result = await this.s3.upload(params).promise();
		return result.Location;
	}
}
