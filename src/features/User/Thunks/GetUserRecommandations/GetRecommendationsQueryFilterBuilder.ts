export default class GetRecommendationsQueryFilterBuilder {
  request: string = '';
  static asQueryFilter() {
    return new this();
  }

  withLimit(limit: number) {
    this.request += `?limit=${limit}`;
    return this;
  }

  withOffset(offset: number) {
    this.request += `&offset=${offset}`;
    return this;
  }
  withCity(city: string | undefined) {
    if (city !== undefined) {
      this.request += `&city=${city}`;
    }
    return this;
  }

  withInterests(interests: number[] | undefined) {
    if (interests !== undefined) {
      interests.forEach(interestId => {
        this.request += `&interests=${interestId}`;
      });
    }
    return this;
  }

  withSearchType(searchType: string | undefined) {
    if (searchType !== undefined) {
      this.request += `&search_type=${searchType}`;
    }
    return this;
  }

  withMinOld(min_old: number | undefined) {
    if (min_old !== undefined) {
      this.request += `&min_old=${min_old}`;
    }
    return this;
  }

  withMaxOld(max_old: number | undefined) {
    if (max_old !== undefined) {
      this.request += `&max_odl=${max_old}`;
    }
    return this;
  }

  buildCommand() {
    return this.request;
  }
}
