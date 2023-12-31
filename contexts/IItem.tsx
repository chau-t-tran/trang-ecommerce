export enum ItemType {
  Normal = 'Normal',
  Featured = 'Featured',
  SubFeatured = 'SubFeatured',
}

export interface IItem {
  id: string,
  image: string,
  name: string,
  desc: string,
  pricePerUnit: number,
  totalQuantity: number,
  quantityUnit: string,
  rating: number,
  reviews: number,
  sale: number,
  type: ItemType,
}
