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

    addManager : AdManager | null
}

export type AdManager = {
    expiredAt : Date
    add_count: number,
    postedAd: number,

    feature_count: number,
    featured: number,

    bump_count: number,
    bumped: number
}

export interface IDivision {
    "id": number,
    "name": string,
    "bn_name": string,
    "lat": number,
    "long": number
}

export interface IDistrict {
    "id": number,
    "division_id": number,
    "name": string,
    "bn_name": string,
    "lat": number,
    "long": number
}

export type TService = {
    "_id": string,
    "name": string,
    "icon": string,
    "isActive": boolean,
}

export type TSubService = {
    "_id": string,
    "web_name": string,
    "web_link": string,
    "web_img": string,
    "pet_type": "cat" | "dog" | "both",
    "description": string,
    "location": string,
    "service": string,
    "serviceName": string,
    position: number
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
    _id: string
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    description: string;
    isReplied: boolean;
    reply_message: null | string,
    replied_At: Date
}

export interface IReport {
    _id: string,
    product: IProduct,
    user: IUser,
    reason: string,
    status: "pending" | "resolved",
    createdAt: Date
}

export interface IBrand {
    _id: string,
    name: string,
    status: "pending" | "approved" | "rejected"
}