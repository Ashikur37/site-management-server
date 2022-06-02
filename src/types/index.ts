export type MyContext ={
    req: Request &{session:any},
    res:Response,
    payload?:{userId:string},
    userId?:number
}