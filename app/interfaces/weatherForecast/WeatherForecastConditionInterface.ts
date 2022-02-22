import { MeteorologicalObservatoryInterface } from '~/interfaces/weatherForecast/MeteorologicalObservatoryInterface'

export interface WeatherForecastConditionInterface {
    meteorologicalObservatoryCode: string
    largeAreaCode: string
    intervalSourceYear: string
    intervalSourceMonth: string
}