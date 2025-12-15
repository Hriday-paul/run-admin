export type IUser = {
    "id": number,
    "email": string | null,

    status: boolean,
    phone: string,
    first_name: string,
    last_name: string | null,
    whatsapp: string | null
    picture: { url: string, key: string } | null
    auth: {
        role: "Admin",
        status: boolean
    },
    address: string | null,

    division: string | null,
    district: string | null,
    upzilla: string | null,

    facebook: string | null
    twitter: string | null,
    youtube: string | null,
    instagram: string | null
    linkedin: string | null,

    addManager: AdManager | null
}

export type AdManager = {
    expiredAt: Date
    add_count: number,
    postedAd: number,

    feature_count: number,
    featured: number,

    bump_count: number,
    bumped: number
}

export interface IDivision {
    id: number,
    name: string
    bName: string | null
}

export interface IDistrict {
    id: number,
    name: string
    bName: string | null
    division : IDivision
}
export interface IArea {
    id: number,
    name: string
    bName: string | null
    division : IDivision
    district : IDistrict
}

export type TPayment = {
    id: number
    userId: number
    user: IUser
    amount: number
    paid_amount: number
    isPaid: boolean
    subscriptionId: number | null
    subscription: Subscription | null

    order: IOrder | null

    transactionId: string
    createdAt: Date
    updatedAt: Date

    type: "subscription" | "vehicle_process" | "document_download",
}

export interface OrderFields {
    id: number,
    orderId: number
    requirementId: number | null

    fileId: number
    File: { key: string, url: string } | null
    fieldType: FieldType
    data: string | null,
    requirement : Requirement | null
}

export enum FieldType {
    Text = "Text",
    File = "File",
    Date = "Date",
    Textarea = "Textarea",
}

export interface IOrder {
    id: number

    user: IUser

    status: "PENDING" | "PROCESSING" | "COMPLETED"

    fields: OrderFields[] // uploaded files by the user
    isPaid: boolean

    otherFiles: string[]

    serviceId: number
    service: DocumentService

    createdAt: Date
    updatedAt: Date

    payment : TPayment
}

export interface DocumentService {
    id: number
    name: string
    price: number
    description: string | null
    requirements: Requirement[]
    icon: String | null
    category: ServiceCategory
}

interface Requirement {
  id : number
  serviceId : number
  name : string
  bnName : string
  fieldType : FieldType
  required : boolean

  field_name : string

  service : DocumentService
}

export enum ServiceCategory {
    Car_Owner_Check = "Car_Owner_Check",
    Car_Document_Calculation = "Car_Document_Calculation",
    Fitness_Appointment = "Fitness_Appointment",
    Owner_File_Appointment_Scan = "Owner_File_Appointment_Scan",
    Larner_Card = "Larner_Card",
    New_Car_Import_Check = "New_Car_Import_Check",
    Owner_File_Process = "Owner_File_Process",
    Tin_Certificate = "Tin_Certificate",
    License_Renew = "License_Renew",
    License_Exam_Date = "License_Exam_Date",
    Car_Document_Payment = "Car_Document_Payment",
    Online_Gd = "Online_Gd",
    Advice = "Advice"
}

export interface Subscription {
    id: number;
    userId: number;
    packageId: number;
    transactionId: string;
    autoRenewal: boolean;
    renewalDate?: Date | null;
    lastRenewalDate: Date;
    renewalCount: number;
    isPaid: boolean;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    user: IUser;
    package: Package;
}


export interface Package {
    id: number;
    name: string;
    description?: string | null;
    duration: number;
    price: number;
    discount?: string | null;
    top_add_count: number;
    bumpup_count: number;
    feature_count: number;
    add_count: number;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}


export interface IMeta {
    "page": number,
    "limit": number,
    "total": number,
    "totalPage": number
}

export interface IEarning {
    "_id": string,
    "clientName": string,
    "amount": number,
    "transactionDate": string,
    "createdAt": string,
}

export interface IAdminStats {
    "totalUsers": number,
    totalEarnimgs: number,
    totalVendors: number
}
export interface INotification {
    _id: string
    title: string,
    message: string,
    "isRead": boolean,
    "createdAt": string,
    "updatedAt": string,
    "__v": 0
}

export interface IStore {
    _id: string
    name: string,
    cover_photo: string,
    photo: string,
    open_time: string,
    address: string,

    location: { type: string, coordinates: number[] },

    status: "pending" | "approved" | "rejected",
    user: IUser,
    "createdAt": string,
    "updatedAt": string,
}

export interface IProduct {
    title: string;
    category: "womens_clothes" | "mens_clothes" | "health/beauty" | "purses" | "accessories",
    sub_category: string | null
    images: string[],
    brand: { name: string, _id: string } | null,
    price: number,
    quantity: number,
    details: string,
    // location : {type : string, coordinates : number[]}
    sizes: string[],
    colors: string[],
    isDeleted: boolean,
    user: IUser,
    store: IStore,
    total_views: number,

    could_not_find_reqs: IUser[]
    bought_reqs: { user: IUser, type: "available" | "unavailable" }[],
    "avgRating": number,
    "reviewCount": number,
}

export interface Icontact {
    id: string
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    description: string;
    isReplied: boolean;
    reply_message: null | string,
    replied_At: Date
    createdAt : Date
}