export enum Area {
  Center = "center",
  Office = "office",
  Stadium = "stadium",
}

export interface Apartment {
  readonly _id: number;
  price: string;
  address: string;
  area: Area;
  tags: Array<string>;
}

export type BasicInfoApartment = Pick<Apartment, "_id" | "price" | "address">;

export type NewApartmentEntry = Omit<Apartment, "_id">;
