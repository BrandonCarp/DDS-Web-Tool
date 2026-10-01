/**
 * The door photos the Residential and Commercial welcome cards rotate through
 * — Brandon, 1/10/2026. The files live in public/door-photos/, resized to
 * 640px wide WebP (about twice the size they show at).
 *
 * To add one: save it as a .webp in the right folder and add its name here.
 * door-photos.test.ts checks every name has its file.
 */
const list = (folder: string, names: string[]) => names.map((n) => `/door-photos/${folder}/${n}.webp`);

export const RESIDENTIAL_PHOTOS = list("residential", [
  "avante", "avantesleek", "bridgeport", "canelements", "canmodern", "chevron", "classicsteel",
  "classicwood", "coachman", "extira", "fivelayer", "fourlayer", "gallerysteel", "grandharbor",
  "louver", "modernsteel", "modernultra", "vertistack", "woodcustom", "woodmodern",
]);

export const COMMERCIAL_PHOTOS = list("commercial", [
  "archalum", "archsteel", "energy", "extreme", "industrial", "intelenergy", "vertistackclear",
]);
