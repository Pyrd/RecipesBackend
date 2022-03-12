import { HttpService, Injectable, Logger } from '@nestjs/common';
import { CreateItemDto } from '../recepies/items/dto/create-item.dto';
import { ItemsService } from '../recepies/items/items.service';
import { IRawIngredient } from './interfaces/ingredient-scrapper.interface';

@Injectable()
export class InitService {
  logger = new Logger(InitService.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly itemService: ItemsService,
  ) {}

  async initIngredients(file: Express.Multer.File) {
    const buffer = file.buffer;
    const string = buffer.toString('utf-8');
    const json: IRawIngredient[] = JSON.parse(string);
    const dtos: CreateItemDto[] = [];
    for (const letter of json) {
      for (const ingr of letter.ingredients) {
        const exts = ingr.image.split('.');
        dtos.push({
          label_fr: ingr.title,
          ingredient_url: ingr.link,
          images: [
            {
              mimetype: exts.pop(),
              url: ingr.image,
            },
          ],
          letter: letter.letter,
        });
      }
    }
    this.logger.log(`Importing ${dtos.length} ingredients`);

    await this.itemService.batchCreate(dtos);
    return json;
  }

  // async initIngredients(file: Express.Multer.File) {
  //   const buffer = file.buffer;
  //   const string = buffer.toString('utf-8');
  //   const json = this.tsvJSON(string);
  //   const dtos: {
  //     items: CreateItemDto[];
  //     categories: CreateItemCategoryDto[];
  //   } = this.processJsonIngredients(json);
  //   await this.itemCategoryService.batchCreate(dtos.categories);
  //   await this.itemService.batchCreate(dtos.items);
  //   return json;
  // }

  // processJsonIngredients(json: Array<IRaw_Data_Ingredients>): any {
  //   const categories = new Set();
  //   return {
  //     items: json.map((e) => {
  //       categories.add({ id: e.categorie_code, label: e.categorie });
  //       return {
  //         id: e.ingredient_id,
  //         code: e.ingredient_code,
  //         label: e.ingredient,
  //         description: '',
  //         category: {
  //           id: e.categorie_code,
  //         },
  //         points: +e.points,
  //         ingredient_url: e.ingredient_url,
  //       };
  //     }),
  //     categories,
  //   };
  // }

  // private tsvJSON(tsv: string) {
  //   const lines = tsv.split('\n');

  //   const result = [];

  //   const headers = lines[0]
  //     .split('\t')
  //     .map((e: string) => e.replace('\r', ''));

  //   for (let i = 1; i < lines.length; i++) {
  //     const obj = {};
  //     const currentline = lines[i]
  //       .split('\t')
  //       .map((e: string) => e.replace('\r', ''));

  //     for (let j = 0; j < headers.length; j++) {
  //       obj[headers[j]] = currentline[j];
  //     }

  //     result.push(obj);
  //   }

  //   return result;
  // }

  // OLD OPENFOODFACTS DATA SOURCE
  //   async initIngredients(file: Express.Multer.File) {
  //     console.log('Starting ingredients initiation');
  //     const resp = await this.httpService
  //       .get(`${process.env.OPENFOODFACTS_URL_API}/ingredients.json`)
  //       .toPromise();

  //     const rawIngredients: OpenFoodFacts_IngredientsResp = resp.data;
  //     console.log('Starting ingredients processing');

  //     const filtered = await this.processRawIngredients(rawIngredients);
  //     console.log('Passing to ingredients service for creation');
  //   }

  //   private processRawIngredients(raw: OpenFoodFacts_IngredientsResp) {
  //     let i = 0;

  //     const filteredTags = raw.tags.filter((e, i) => {
  //       return (
  //         e.name &&
  //         e.name.length > 1 &&
  //         e.name[2] != ':' &&
  //         !e.name.startsWith('E')
  //       );
  //     });
  //     console.log(filteredTags.length);

  //     return filteredTags;
  //   }
}
