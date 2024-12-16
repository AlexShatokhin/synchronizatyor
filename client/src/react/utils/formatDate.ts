import { getZero } from "./getZero";

export const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return `${getZero(dateObj.getDate())}.${getZero(dateObj.getMonth())}.${dateObj.getFullYear()} ${getZero(dateObj.getHours())}:${getZero(dateObj.getMinutes())}:${getZero(dateObj.getSeconds())}`
}
