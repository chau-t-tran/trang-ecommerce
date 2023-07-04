export enum ItemType {
  Normal = 'Normal',
  Featured = 'Featured',
  SubFeatured = 'SubFeatured',
}

export interface IItem {
  image: string,
  name: string,
  desc: string,
  pricePerUnit: number,
  totalQuantity: number,
  quantityUnit: string,
  rating: number,
  reviews: number,
  type: ItemType,
}
