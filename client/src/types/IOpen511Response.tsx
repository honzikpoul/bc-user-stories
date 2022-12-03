

export default interface IOpen511Response<Type> {
    events: Type[],
    pagination: {
        next_url: string,
        offset: number
    },
    meta: {
        url: string,
        version: string,
        up_url: string
    }
    //... todo later 
}
