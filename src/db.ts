import { DB } from "https://deno.land/x/sqlite@v3.7.3/mod.ts";
import { Action, Location, User } from "./models/index.ts";

export function initTablesQuery(): void {
  const db = new DB("database.db");

  db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS locations (
    location_id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    lat REAL NOT NULL,
    long REAL NOT NULL,
    address TEXT NOT NULL,
    location_image TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS actions (
    type TEXT CHECK ( type IN ('checkin', 'checkout') ) NOT NULL,
    user_id TEXT NOT NULL,
    location_id TEXT NOT NULL,
    action_image TEXT NOT NULL,
    PRIMARY KEY (type, location_id, user_id),
    FOREIGN KEY (user_id)
      REFERENCES users (user_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION,
    FOREIGN KEY (location_id)
      REFERENCES locations (location_id)
        ON DELETE CASCADE
        ON UPDATE NO ACTION
  );
`);

  db.close();
}

export function addUserQuery(user: User): void {
  const db = new DB("database.db");
  db.transaction(() =>
    db.query("INSERT INTO users VALUES (?, ?)", [user.user_id, user.user_name])
  );

  db.close();
}

export function getUsersQuery(): Array<User> {
  const db = new DB("database.db");

  const entries = db.queryEntries<User>(
    "SELECT * FROM users",
  );
  db.close();
  return entries;
}

export function addLocationQuery(loc: Location): void {
  const db = new DB("database.db");
  db.transaction(() =>
    db.query("INSERT INTO locations VALUES (?, ?, ?, ?, ?, ?)", [
      loc.location_id,
      loc.location_name,
      loc.lat,
      loc.long,
      loc.address,
      loc.location_image,
    ])
  );

  db.close();
}

export function getLocationsQuery(): Array<Location> {
  const db = new DB("database.db");
  const entries = db.queryEntries<Location>("Select * FROM locations");
  db.close();
  return entries;
}
export function getLocationWithActionsQuery(
  location_id: string,
): Location {
  const db = new DB("database.db");

  const location =
    db.queryEntries<Location>("SELECT * FROM locations WHERE location_id = ?", [
      location_id,
    ])[0];

  location.actions = db.queryEntries<Action>(
    "SELECT * FROM actions WHERE location_id = ?",
    [location_id],
  );

  db.close();
  return location;
}

export function addActionQuery(action: Action): void {
  const db = new DB("database.db");

  db.query("INSERT INTO actions VALUES (?, ?, ?, ?)", [
    action.type,
    action.user_id,
    action.location_id,
    action.action_image,
  ]);

  db.close();
}
