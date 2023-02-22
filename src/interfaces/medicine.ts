// Generated by https://quicktype.io

export interface MedicinesResponse {
    ok:             boolean;
    page:           string;
    totalPages:     number;
    totalMedicines: number;
    medicines:      Medicine[];
}

export interface Medicine {
    name:         string;
    ch:           string;
    medicines:    InnerMedicine[];
    type:         MedicineType;
    id:           string;
    description?: string;
}

export interface InnerMedicine {
    _id:  string;
    name: string;
    ch:   string;
}

export interface MedicineResponse {
    ok:       boolean;
    medicine: Medicine;
}

export enum MedicineType {
    FORMULA = 'formula',
    MEDICINE = 'medicine'
}

