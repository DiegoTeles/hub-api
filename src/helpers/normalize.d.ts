export const splitOrder: ({
    tipo: {
        start: number;
        end: number;
    };
    date?: undefined;
    product?: undefined;
    value?: undefined;
    saller?: undefined;
} | {
    date: {
        start: number;
        end: number;
    };
    tipo?: undefined;
    product?: undefined;
    value?: undefined;
    saller?: undefined;
} | {
    product: {
        start: number;
        end: number;
    };
    tipo?: undefined;
    date?: undefined;
    value?: undefined;
    saller?: undefined;
} | {
    value: {
        start: number;
        end: number;
    };
    tipo?: undefined;
    date?: undefined;
    product?: undefined;
    saller?: undefined;
} | {
    saller: {
        start: number;
        end: number;
    };
    tipo?: undefined;
    date?: undefined;
    product?: undefined;
    value?: undefined;
})[];
