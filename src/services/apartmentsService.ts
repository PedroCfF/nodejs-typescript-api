import apartmentsData from "../appdata/appdata.json";
import {
  Apartment,
  NewApartmentEntry,
  BasicInfoApartment,
} from "../types/types";

let apartments: Array<Apartment> = apartmentsData as Array<Apartment>;

export const getApartments = () => apartments;

export const getApartmentsBasicInfo = (): BasicInfoApartment[] => {
  return apartments.map(({ _id, price, address }) => {
    return {
      _id,
      price,
      address,
    };
  });
};

export const getApartmentById = (id: number) => {
  const apartmentToGet = apartments.find((x) => x._id === id);

  if (apartmentToGet) return apartmentToGet;

  throw new Error(`apartment whith id ${id} was not found`);
};

export const getApartmentBasicInfoById = (id: number): BasicInfoApartment => {
  const apartmentById = apartments.find((x) => x._id === id);

  if (apartmentById) {
    const { tags, area, ...basicInfo } = apartmentById;
    return basicInfo;
  }

  throw new Error(`apartment whith id ${id} was not found`);
};

export const addApartment = (
  newApartmentEntry: NewApartmentEntry
): Apartment => {
  let uniqueId = apartments.length + 1;

  const newAparment = {
    _id: uniqueId,
    ...newApartmentEntry,
  };

  apartments.push(newAparment);

  return newAparment;
};

export const updateApartment = (
  id: number,
  UpdatedApartmentEntry: NewApartmentEntry
): Apartment => {
  const apartmentToUpdate = apartments.find((x) => x._id === id);

  if (!apartmentToUpdate) {
    throw new Error(`apartment whith id ${id} was not found`);
  }

  const updatedApartment = {
    _id: id,
    price: UpdatedApartmentEntry.price,
    address: UpdatedApartmentEntry.address,
    area: UpdatedApartmentEntry.area,
    tags: UpdatedApartmentEntry.tags,
  };

  apartments = apartments.map((apartment) =>
    apartment._id === id ? updatedApartment : apartment
  );

  return updatedApartment;
};

export const removeApartment = (id: number) => {
  const apartmentToRemove = apartments.find((x) => x._id === id);

  if (!apartmentToRemove) {
    throw new Error(`apartment whith id ${id} was not found`);
  }

  apartments = apartments.filter((x) => x._id !== id);
};
