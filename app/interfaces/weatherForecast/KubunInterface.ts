export interface MeteorologicalObservatoryInterface {
    meteorologicalObservatoryCode: string,
    meteorologicalObservatoryName: string
}

export interface KubunInterface {
    kubunCode: string,
    kubunName: string,
    meteorologicalObservatories: Array<MeteorologicalObservatoryInterface>
}
