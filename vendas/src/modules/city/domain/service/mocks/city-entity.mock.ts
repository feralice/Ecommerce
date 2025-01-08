import { CityEntity } from "@/modules/city/domain/entity/city.entity";

export const mockCity = (): CityEntity => {
  return {
    id: 1,
    stateId: 1,
    name: "Cityville",
    createdAt: new Date(),
    updatedAt: new Date(),
    addresses: [],
    state: {
      id: 1,
      name: "Stateville",
      createdAt: new Date(),
      updatedAt: new Date(),
      cities: [],
    },
  };
};
