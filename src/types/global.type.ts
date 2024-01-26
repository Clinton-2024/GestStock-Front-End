export interface ICategoryGetAllDto
{
    id : number;
    name : string;
    IsActive : boolean;
}

export interface ICategoryCreateDto
{
      name : string;
}


export class StaticStatutInventaire
{
     static  Normal :string = "Stock normal";
     static  Disponible : string = "Stock Non disponible";
    static  Faible :string = "Stock faible";

}

export interface IInventaireGetAllDto {
    reference: string;
    designation: string;
    categoryName: string;
    unite: string;
    seuilAlerte: number;
    stockInitial: number;
    entries: number;
    output: number;
    stockFinal: number;
    cump: number;
    valeur: number;
    statut: string;
}

export interface IOperationGetAllDto {
    num: number;
    createdAt: string;
    updatedAt: string;
    price: number;
    quantity: number;
    total: number;
    type: string;
    reference: string;
    designation: string;
    unite: string;
    categoryName: string;
}

export interface IOperationCreateDto {
    price: number;
    quantity: number;
    type: string;
    reference: string;
}

export class StaticTypeOperation {
    static Entrie: string = "Entrée";
    static OutPut: string = "Sortie"
}



export interface IMarchandiseCreateDto {
    reference: string;
    photo: string;
    designation: string;
    unite: string;
    seuilAlerte: number;
    stockInitial: number;
    prixUnitaire: number;
    categoryId: number;

}

export interface IMarchandiseEditDto {
    reference: string;
    designation: string;
    unite: string;
    seuilAlerte: number;
    stockInitial: number;
    prixUnitaire: number;
    categoryId: number;

}


export interface IMarchandise {
    categoryId: number;
    categoryName: string;
    createdAt: string;
    designation: string
    isActive: boolean;
    photo: string
    prixUnitaire: number;
    reference: string;
    seuilAlerte: number;
    stockInitial: number;
    total: number;
    unite: string;
    updatedAt: string;
}


export interface IMarchandiseGetDto {
    reference: string;
    photo: string;
    designation: string;
    unite: string;
    seuilAlerte: number;
    stockInitial: number;
    prixUnitaire: number;
    total: number;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    categoryId: number;
    categoryName: string;
}

export interface ICategoryGetAllDto {
    id: number;
    name: string;
    isActive: boolean;
}

export interface ICategoryServiceResponse {
    isSucceed: boolean;
    message: string;
    list_Data: ICategoryGetAllDto[];
    data: ICategoryGetAllDto;
}