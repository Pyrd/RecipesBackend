import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStorageService {
  constructor() {}

  async getBienImages(id: number): Promise<{ name: string; url: string }[]> {
    return new Promise((resolve, reject) => {
      admin
        .storage()
        .bucket()
        .getFiles({
          directory: `recepies/images/${id}`,
        })
        .then(async (results) => {
          const files = results[0];
          const urls = [];

          for (let i = 0; i < files.length; i++) {
            const name = files[i].name;
            const bienImgUrls = await files[i].getSignedUrl({
              action: 'read',
              expires: Date.now() + 15 * 60 * 1000, // Expiration date = 15 mn
            });

            urls.push({
              name,
              url: bienImgUrls[0],
            });
          }

          resolve(urls);
        });
    });
  }

  async deleteBienImage(id: string, url: string) {
    const arr = url?.substring(0, url.indexOf('?'))?.split('/');
    const name = arr[arr.length - 1];
    Logger.log(`Delete image ${name}`);

    return admin
      .storage()
      .bucket()
      .file(`recepies/images/${id}/${name}`)
      .delete()
      .catch(() => {
        throw new HttpException(
          'Cannot delete image',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      });
  }

  async setBienImages(id: string, files: Array<Express.Multer.File>) {
    const bucket = admin.storage().bucket();
    const promises: Promise<string>[] = [];
    const filenames: string[] = [];
    const addImage = (imageName, fileMulter) => {
      const file = bucket.file(`recepies/images/${id}/${imageName}`);

      const writeStream = file.createWriteStream({
        metadata: {
          contentType: fileMulter.mimetype,
        },
      });

      const result: Promise<string> = new Promise((resolve, reject) => {
        writeStream.on('error', (err) => reject(err));
        writeStream.on('finish', () => resolve(imageName));
        writeStream.end(fileMulter.buffer);
      });

      // console.log('ok');
      promises.push(result);
    };

    files.forEach((file) => {
      const filename = `photo-${id}-${Math.floor(
        Math.random() * 100000,
      )}.${file.mimetype.replace('image/', '')}`;
      filenames.push(filename);
      addImage(filename, file);
    });
    await Promise.all(promises);
    return filenames;
  }

  async deleteBien(bienId: string) {
    await admin
      .storage()
      .bucket()
      .deleteFiles({
        prefix: `recepies/images/${bienId}`,
      });
  }

  //   async getTarifsFile(): Promise<string> {
  //     return new Promise((resolve, reject) => {
  //       admin
  //         .storage()
  //         .bucket()
  //         .getFiles({
  //           directory: `documents`,
  //         })
  //         .then(async (results) => {
  //           const file = results[0].find((e) =>
  //             e['metadata']['name'].includes('tarifs.pdf'),
  //           );
  //           const tarifsUrl = await file.getSignedUrl({
  //             action: 'read',
  //             expires: Date.now() + 60 * 24 * 60 * 1000, // Expiration date = 1DAY
  //           });
  //           resolve(tarifsUrl[0]);
  //         });
  //     });
  //   }
}
