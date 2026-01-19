// OpenWeatherMap API response types
import type { ReactNode } from 'react';

export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface MainWeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
}

export interface WindData {
    speed: number;
    deg: number;
    gust?: number;
}

export interface CloudsData {
    all: number;
}

export interface SysData {
    type?: number;
    id?: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export interface Coordinates {
    lon: number;
    lat: number;
}

export interface WeatherData {
    coord: Coordinates;
    weather: WeatherCondition[];
    base: string;
    main: MainWeatherData;
    visibility: number;
    wind: WindData;
    clouds: CloudsData;
    dt: number;
    sys: SysData;
    timezone: number;
    id: number;
    name: string;
    cod: number;
}

export interface GeocodingResult {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
}

export type TemperatureUnit = 'metric' | 'imperial';

export interface WeatherCardData {
    title: string;
    value: string | number;
    unit?: string;
    subtitle: string;
    icon: ReactNode;
    color?: string;
}

