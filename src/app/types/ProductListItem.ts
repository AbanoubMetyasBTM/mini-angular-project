export interface ProductListItem {
  id:               number;
  title:            string;
  price:            number;
  description:      string;
  category:         string;
  image:            string;
  rating:           Rating;
  requestQuantity?: number;
}

export interface Rating {
  rate:  number;
  count: number;
}
