import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IPublishPostDTO } from 'src/core/post/application';

export class PublishPostDTO implements Omit<IPublishPostDTO, 'authorId'> {
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  title!: string;

  @IsString()
  @IsNotEmpty()
  content!: string;

  @IsArray()
  @ArrayMinSize(1)
  tagIds!: number[];
}
