import { NewApartmentEntry, Area } from "../types/types";

const isString = (string: string): boolean => {
  return typeof string === "string";
};

const isArea = (param: any): boolean => {
  return Object.values(Area).includes(param);
};

const isArrayOfStrings = (strings: Array<string>): boolean => {
  return (
    Array.isArray(strings) && strings.every((tag) => typeof tag === "string")
  );
};

const parsePrice = (priceFromRequest: any): string => {
  const numericPart = priceFromRequest.slice(1);

  if (!isString(priceFromRequest)) throw new Error("price should be a string");

  if (priceFromRequest[0] !== "$")
    throw new Error("price should start with a $");

  if (isNaN(numericPart) || Number(numericPart) < 0)
    throw new Error("price should be a positive number");

  return priceFromRequest;
};

const parseAddress = (addressFromRequest: any): string => {
  const addressRegex = /^\d+\s[\w\s]*,\s[\w\s]*,\s[\w\s]*,\s\d{4}$/;

  if (!isString(addressFromRequest))
    throw new Error("address should be a string");

  if (!addressFromRequest.match(addressRegex))
    throw new Error("address should have a valid address format");

  return addressFromRequest;
};

const parseArea = (areaFromRequest: any): Area => {
  if (!isArea(areaFromRequest)) throw new Error("area should be a valid Area");
  return areaFromRequest;
};

const parseTags = (tagsFromRequest: any): Array<string> => {
  if (!isArrayOfStrings(tagsFromRequest))
    throw new Error("tags should be an array of strings");
  return tagsFromRequest;
};

const toNewApartmentEntry = (object: any): NewApartmentEntry => {
  const newApartmentEntry: NewApartmentEntry = {
    price: parsePrice(object.price),
    address: parseAddress(object.address),
    area: parseArea(object.area),
    tags: parseTags(object.tags),
  };
  return newApartmentEntry;
};

export default toNewApartmentEntry;
