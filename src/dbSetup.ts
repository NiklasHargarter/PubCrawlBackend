import { Base64 } from "https://deno.land/x/bb64@1.1.0/mod.ts";
import { addLocation, addUser } from "./controller.ts";
import { parse } from "https://deno.land/std@0.194.0/flags/mod.ts";
import {
  addActionQuery,
  getLocationsQuery,
  getUsersQuery,
  initTablesQuery,
} from "./db.ts";
import { Location } from "./models/index.ts";

async function serverInit() {
  const flags = parse(Deno.args, {
    boolean: ["demo_actions"],
  });

  console.log("deleting old database...");
  try {
    await Deno.remove("database.db");
    console.log("deleted successfully!");
  } catch {
    console.log("no old database was found!");
  }
  console.log("initializing database");
  initDatabase();
  if (flags.demo_actions) {
    console.log("adding example actions");
    initActions();
  }
}

await serverInit();

function initDatabase(): void {
  initTablesQuery();

  const user_names: Array<string> = [
    "Niklas",
    "Aaron",
    "Martin",
    "Susi",
    "Björn",
    "Hendrik",
    "David",
    "Stephan",
    "Juri",
    "Robert",
  ];
  user_names.forEach((user_name) => {
    addUser(user_name);
  });

  const locations: Array<Location> = [
    {
      location_name: "McMelson",
      lat: 54.788126668440555,
      long: 9.435695677862876,
      address: "Norderhofenden 10, 24937 Flensburg",
      location_image: "",
    },
    {
      location_name: "Bärenhöhle",
      lat: 54.78868089344407,
      long: 9.43493850990987,
      address: "17, Norderhofenden Altstadt, 24937 Flensburg",
      location_image: "",
    },
    {
      location_name: "Lord Nelson",
      lat: 54.78878005364739,
      long: 9.433598926820851,
      address: "Speicherlinie 12, 24937 Flensburg",
      location_image: "",
    },
    {
      location_name: "Porticus",
      lat: 54.789634701694816,
      long: 9.431498042353077,
      address: "Marienstraße 1, 24937 Flensburg",
      location_image: "",
    },
    {
      location_name: "Daddel Du",
      lat: 54.78732689202365,
      long: 9.439407557322212,
      address: "Kurze Str. 6, 24937 Flensburg",
      location_image: "",
    },
    {
      location_name: "Zum Albatros",
      lat: 54.78827385804804,
      long: 9.44206141464488,
      address: "Brixstraße 24, 24943 Flensburg",
      location_image: "",
    },
  ];

  locations.forEach((location) => {
    location.location_image = Base64.fromFile(
      `src/static/locations/${location.location_name}.webp`,
    ).toStringWithMime();
    addLocation(location);
  });
}

export function initActions() {
  const user = getUsersQuery();
  const locations = getLocationsQuery();
  addActionQuery({
    type: "checkin",
    user_id: user[0].user_id,
    location_id: locations[0].location_id!,
    action_image: Base64.fromFile("src/static/actions/checkin.png")
      .toStringWithMime(),
  });
  addActionQuery({
    type: "checkout",
    user_id: user[0].user_id,
    location_id: locations[0].location_id!,
    action_image: Base64.fromFile("src/static/actions/checkout.png")
      .toStringWithMime(),
  });
  addActionQuery({
    type: "checkin",
    user_id: user[1].user_id,
    location_id: locations[0].location_id!,
    action_image: Base64.fromFile("src/static/actions/checkin.png")
      .toStringWithMime(),
  });
}
