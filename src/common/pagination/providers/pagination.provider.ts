import { ObjectLiteral, Repository } from 'typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination.query.dto';

// This provider expects two arguments
// first one is an object (skip an take)
// second one is repository to which paginate should be applied

@Injectable()
export class PaginationProvider {
  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ) {
    let results = await repository.find({
      take: paginationQuery.limit, //take means take 10 posts from the database at one time
      skip: (paginationQuery.page - 1) * paginationQuery.limit, // 1-1 * 10
    });

    return results;
  }
}
