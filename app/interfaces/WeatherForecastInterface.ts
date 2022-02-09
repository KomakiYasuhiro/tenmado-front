interface ForecastInterface {
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

interface ReportInterface {
    reportDate: Date,
    forecastTargetDateFrom: Date
    forecastTargetDateTo: Date
    forecastdays: number
    forecasts: Array<ForecastInterface>
}

export interface WeatherForecastInterface {
    meteorologicalObservatoryName: string
    largeAreaCode: string,
    largeAreaName: string,
    cityCode: string,
    cityName: string,
    reportDateFrom: Date,
    reportDateto: Date,
    reportDays: number,
    reports: Array<ReportInterface>
}