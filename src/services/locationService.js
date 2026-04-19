import Axios from "axios";

const getResult = async (url) => {
    const response = await Axios.get(url);
    if (response?.data?.status) {
        return response?.data?.result || [];
    }

    return [];
};

export const getDivisions = async () => {
    return getResult(`${process.env.REACT_APP_API_URL}location/divisions`);
};

export const getDistricts = async (divisionId) => {
    return getResult(`${process.env.REACT_APP_API_URL}location/districts/${divisionId}`);
};

export const getUpazillas = async (districtId) => {
    return getResult(`${process.env.REACT_APP_API_URL}location/upazillas/${districtId}`);
};

export const getUnions = async (upazillaId) => {
    return getResult(`${process.env.REACT_APP_API_URL}location/unions/${upazillaId}`);
};

export const getNearestAreas = async (upazillaId) => {
    return getResult(`${process.env.REACT_APP_API_URL}location/nearest-areas/${upazillaId}`);
};
