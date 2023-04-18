export class PageDto<TDto> {
  constructor(public data: TDto[], public count: number) {}
}
