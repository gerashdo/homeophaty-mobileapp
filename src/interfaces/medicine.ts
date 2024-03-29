
export interface MedicinePostRequest {
    name: string,
    type: MedicineType,
    ch: string,
    medicines: Medicine[],
}


export interface MedicinePostResponse {
    ok:       boolean;
    medicine: Medicine;
}

export interface MedicinesResponse {
    ok:             boolean;
    page:           string;
    totalPages:     number;
    totalMedicines: number;
    medicines:      Medicine[];
}

export interface DeletePrescriptionResponse {
    prescription: Prescription;
}

export interface Medicine {
    _id:           string;
    name:         string;
    ch:           string;
    medicines:    Medicine[];
    prescription?: Prescription[];
    type?:         MedicineType;
    description?: string;
    createdAt?:    string;
    updatedAt?:    string;
}

export interface MedicineResponse {
    ok:       boolean;
    medicine: Medicine;
}

export interface UpdatePrescriptionResponse {
    prescription: Prescription;
}

export interface Prescription {
    _id:         string;
    description: string;
    createdAt?:   string;
    updatedAt?:   string;
}

export interface NewPrescriptionRequest {
    description: string;
}

export interface NewPrescriptionResponse {
    medicine: Medicine;
}

export interface Prescription {
    _id:         string;
    description: string;
}

export enum MedicineType {
    FORMULA = 'formula',
    MEDICINE = 'medicine'
}



