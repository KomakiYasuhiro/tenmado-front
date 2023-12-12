export interface ForecastInterface {
    forecastTargetDate: Date
    weatherCode: string
    weather: string
    weatherFigUrl: string
    pop: string
    reliability: string
    lowestTemperature: number
    lowestTemperatureLower: number
    lowestTemperatureUpper: number
    highestTemperature: number
    highestTemperatureLower: number
    highestTemperatureUpper: number
}

export interface WeatherForecastInterface {
    meteorologicalObservatoryName: string
    largeAreaCode: string,
    largeAreaName: string,
    cityCode: string,
    cityName: string,
    reportDate: Date,
    forecasts: Array<ForecastInterface>
}