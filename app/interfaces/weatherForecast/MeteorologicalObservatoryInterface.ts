interface LargeAreaInterface {
    largeAreaCode: string,
    largeAreaName: string
}

export interface MeteorologicalObservatoryInterface {
    meteorologicalObservatoryCode: string,
    meteorologicalObservatoryName: string,
    largeAreas: Array<LargeAreaInterface>
}