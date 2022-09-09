interface Location {
  name: string;
  targetImg: string;
  vacaImg: string;
  lat: number;
  long: number;
  topic: string;
}

export const locations: Location[] = [
  {
    name: "Community Garden",
    targetImg: "garden.jpg",
    vacaImg: "maine.jpg",
    lat: 40.5435976381065,
    long: -74.6262345897213,
    topic: "Bar Harbor",
  },
  {
    name: "Garden Kitchen",
    targetImg: "gardenkitchen.jpg",
    vacaImg: "stjohn.jpg",
    lat: 40.5444445267909,
    long: -74.6239888931953,
    topic: "St. John",
  },
  {
    name: "Hay Barn",
    targetImg: "haybarn.webp",
    vacaImg: "ireland.jpg",
    lat: 40.5487475343524,
    long: -74.6221008194847,
    topic: "Ireland",
  },
  {
    name: "Fountain",
    targetImg: "fountain.jpg",
    vacaImg: "costrica.jpg",
    lat: 40.5514497924134,
    long: -74.6189740302535,
    topic: "Costa Rica",
  },
  {
    name: "Coach Barn & Clock Tower",
    targetImg: "coachbarn.jpg",
    vacaImg: "rhine.jpg",
    lat: 40.5561373864226,
    long: -74.628457107937,
    topic: "Rhine Trip",
  },
  {
    name: "Meditation Garden",
    targetImg: "meditationgarden.jpg",
    vacaImg: "tahoe.jpg",
    lat: 40.5567464132275,
    long: -74.6323077416542,
    topic: "SF + Tahoe",
  },
  {
    name: "Orchid Greenhouse",
    targetImg: "orchidgreenhouse.jpg",
    vacaImg: "korea.jpg",
    lat: 40.5512787283704,
    long: -74.6279647154426,
    topic: "Seoul",
  },
  {
    name: "Old Foundation",
    targetImg: "foundation.jpg",
    vacaImg: "iceland.jpg",
    lat: 40.5508768405915,
    long: -74.6329697902071,
    topic: "Iceland",
  },
  {
    name: "Great Falls",
    targetImg: "falls.jpg",
    vacaImg: "wedding.jpg",
    lat: 40.5508410574626,
    long: -74.6376065865997,
    topic: "Wedding",
  },
];
