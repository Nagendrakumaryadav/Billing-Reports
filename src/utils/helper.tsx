import moment from "moment";

export const getCurrentDate = () => moment(Date.now()).format("DD-MM-YYYY");

export const isEmpty = (array: IBilling[]) => array.length === 0;
