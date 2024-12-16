export const formatType = (type : string) => {
    switch(type){
        case "mysql":
            return "MySQL";
        case "postgresql":
            return "PostgreSQL";
        default:
            return type.toUpperCase();
    }
}
