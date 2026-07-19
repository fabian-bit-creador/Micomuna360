import type { CommuneData } from "../types";
import { categories } from "./categories";
import { events } from "./events";
import { indicators } from "./indicators";
import { locations } from "./locations";
import { news } from "./news";
import { organizations } from "./organizations";
import { phones } from "./phones";
import { places } from "./places";
import { procedures } from "./procedures";
import { profiles } from "./profiles";
import { requests } from "./requests";

/** Dataset demo de Los Aromos: 100% ficticio. */
export const losAromosData: CommuneData = {
  categories,
  locations,
  profiles,
  requests,
  news,
  events,
  indicators,
  procedures,
  phones,
  places,
  organizations,
};
