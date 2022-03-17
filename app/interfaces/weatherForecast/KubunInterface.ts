export interface LargeAreaInterface {
    largeAreaCode: string,
    largeAreaName: string
}

export interface MeteorologicalObservatoryInterface {
    meteorologicalObservatoryCode: string,
    meteorologicalObservatoryName: string,
    largeAreas: Array<LargeAreaInterface>
}

export interface KubunInterface {
    kubunCode: string,
    kubunName: string,
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>
}

export interface FlattenKubunInterface {
    kubunCode: string,
    kubunName: string,
    meteorologicalObservatoryCode: string,
    meteorologicalObservatoryName: string,
    largeAreaCode: string,
    largeAreaName: string
}

export interface KubunResponseInterface {
    kubuns: Array<KubunInterface>
    flattenkubuns: Array<FlattenKubunInterface>
}