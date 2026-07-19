export interface ITestStats {
    count: number;
    _id: string;
}

export interface ITest {
    "_id": string,
    "text": string,
    "ratting": number,
    "user": string,
    "status": string,
}