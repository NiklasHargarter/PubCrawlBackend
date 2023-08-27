import {
  addActionQuery,
  addLocationQuery,
  addUserQuery,
  getLocationsQuery,
  getLocationWithActionsQuery,
  getUsersQuery,
} from "./db.ts";
import { Action, Location, User } from "./models/index.ts";

export function addUser(name: string): User {
  const uuid = crypto.randomUUID();
  const newUser = { user_id: uuid, user_name: name };
  addUserQuery(newUser);
  return newUser;
}
export function getUsers(): Array<User> {
  return getUsersQuery();
}

export function getLocations(): Array<Location> {
  return getLocationsQuery();
}

export function getLocation(
  location_id: string,
): Location {
  return getLocationWithActionsQuery(location_id);
}
export function addLocation(location: Location): Location {
  const uuid = crypto.randomUUID();

  const newLocation = {
    location_id: uuid,
    location_name: location.location_name,
    lat: location.lat,
    long: location.long,
    address: location.address,
    location_image: location.location_image,
  };
  addLocationQuery(newLocation);
  return newLocation;
}

export function addAction(action: Action): Action {
  addActionQuery(action);
  return action;
}
