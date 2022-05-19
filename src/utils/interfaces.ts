export interface Country {
  cca2: string;
  flag: string;
  prefix: string;
  name: string;
}

interface JsonCountryIdd {
  root: string;
  suffixes: string[];
}

interface JsonCountryFlags {
  svg: string;
}

interface JsonCountryName {
  common: string;
}

export interface JsonCountry {
  idd: JsonCountryIdd;
  cca2: string;
  flags: JsonCountryFlags;
  name: JsonCountryName;
}

export type ArrowDirection = 'up' | 'down';
