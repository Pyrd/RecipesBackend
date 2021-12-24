import { HttpService, Injectable } from '@nestjs/common';
import { IngredientsService } from '../recepies/ingredients/ingredients.service';
import { CreateItemCategoryDto } from '../recepies/item-category/dto/create-item-category.dto';
import { ItemCategoryService } from '../recepies/item-category/item-category.service';
import { CreateItemDto } from '../recepies/items/dto/create-item.dto';
import { Item } from '../recepies/items/entities/item.entity';
import { ItemsService } from '../recepies/items/items.service';
import { OpenFoodFacts_IngredientsResp } from './interfaces/openfoodfacts.interface';
import { IRaw_Data_Ingredients } from './interfaces/rawdata-ingredient.interface';

@Injectable()
export class InitService {
  constructor(
    private readonly httpService: HttpService,
    private readonly itemService: ItemsService,
    private readonly itemCategoryService: ItemCategoryService,
  ) {}

  async initIngredients(file: Express.Multer.File) {
    const buffer = file.buffer;
    const string = buffer.toString('utf-8');
    const json = this.tsvJSON(string);
    const dtos: {
      items: CreateItemDto[];
      categories: CreateItemCategoryDto[];
    } = this.processJsonIngredients(json);
    await this.itemCategoryService.batchCreate(dtos.categories);
    await this.itemService.batchCreate(dtos.items);
    return json;
  }

  processJsonIngredients(json: Array<IRaw_Data_Ingredients>): any {
    const categories = new Set();
    return {
      items: json.map((e) => {
        categories.add({ id: e.categorie_code, label: e.categorie });
        return {
          id: e.ingredient_id,
          code: e.ingredient_code,
          label: e.ingredient,
          description: '',
          category: {
            id: e.categorie_code,
          },
          points: +e.points,
          ingredient_url: e.ingredient_url,
        };
      }),
      categories,
    };
  }

  private tsvJSON(tsv: string) {
    const lines = tsv.split('\n');

    const result = [];

    const headers = lines[0]
      .split('\t')
      .map((e: string) => e.replace('\r', ''));

    for (let i = 1; i < lines.length; i++) {
      const obj = {};
      const currentline = lines[i]
        .split('\t')
        .map((e: string) => e.replace('\r', ''));

      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }

      result.push(obj);
    }

    return result;
  }

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
