interface IPoint {
  type: "Point";
  coordinates: number[];
}

class Point implements IPoint {
  public type: "Point";
  public coordinates: number[];

  constructor(coordinates: number[]) {
    this.type = "Point";
    this.coordinates = coordinates;
  }
}

interface IFeature {
  feature: {
    type: "Feature";
    geometry: IPoint;
    properties: { [x: string]: unknown };
  };
}

class Feature implements IFeature {
  public feature: {
    type: "Feature";
    geometry: IPoint;
    properties: { [x: string]: unknown };
  };

  constructor(coordinates: number[], properties: { [x: string]: unknown }) {
    this.feature = {
      type: "Feature",
      geometry: new Point(coordinates),
      properties,
    };
  }
}

interface IGeoJSON {
  type: "FeatureCollection";
  features: IFeature[];
}

type CoordinatesWithDataType = {
  coordinates: number[];
  properties: { [x: string]: unknown };
};

interface IGeoJSONConstructor {
  coordinatesWithData: CoordinatesWithDataType[];
}

export class GeoJSON implements IGeoJSON {
  public type: "FeatureCollection";
  public features: IFeature[];

  constructor({ coordinatesWithData }: IGeoJSONConstructor) {
    this.type = "FeatureCollection";
    this.features = [];
    this.concatCoordinates(coordinatesWithData);
  }

  concatCoordinates(coordinatesWithData: CoordinatesWithDataType[]) {
    coordinatesWithData.forEach(({ coordinates, properties }) => {
      const feature = new Feature(coordinates, properties);
      this.features.push(feature);
    });
  }
}
