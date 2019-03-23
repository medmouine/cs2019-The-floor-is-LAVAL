export class Article {
  private _id: string;
  private _title: string;
  private _subtitle: string;
  private _leadParagraph: string;
  private _imageUrl: string;
  private _body: string;
  private _date: Date;
  private _category: string;


  get id(): string {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get subtitle(): string {
    return this._subtitle;
  }

  get leadParagraph(): string {
    return this._leadParagraph;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  get body(): string {
    return this._body;
  }

  get date(): Date {
    return this._date;
  }

  get category(): string {
    return this._category;
  }
}
