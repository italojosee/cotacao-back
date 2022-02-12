export interface IProductQuotation{
  id: number;
  quantity: number;
}
export interface IQuotationStore{
  description: string;
  dateInit: Date;
  dateEnd: Date;
  agents: number[],
  products: IProductQuotation[]
  // optionals

}
