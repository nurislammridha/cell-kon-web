const normalizeLocationText = (value = '') => String(value)
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/\//g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const createNormalizedSet = (items = []) => new Set(items.map((item) => normalizeLocationText(item)));

const INSIDE_DHAKA_SUB_DISTRICTS = createNormalizedSet([
    'Kadamtoli',
    'Hatirjheel',
    'Dakshin Khan',
    'Daskhinkhan',
    'Dakshinkhan',
    'Dakshin Khan / Daskhinkhan',
    'Kamrangirchar',
    'Khilgaon',
    'Khilkhet',
    'Kotwali',
    'Lalbag',
    'Mirpur Model',
    'Mohammadpur',
    'Motijheel',
    'Mugda',
    'New Market',
    'Pallabi',
    'Paltan',
    'Ramna',
    'Rampura',
    'Rupnagar',
    'Sabujbag',
    'Shah Ali',
    'Shahbag',
    'Shahjahanpur',
    'Sherebanglanagar',
    'Shyampur',
    'Sutrapur',
    'Tejgaon',
    'Tejgaon I/A',
    'Tejgaon IA',
    'Turag',
    'Uttara',
    'Uttara West',
    'Uttarkhan',
    'Vatara',
    'Wari',
    'Adabor',
    'Airport / Biman Bandar',
    'Airport',
    'Biman Bandar',
    'Badda',
    'Banani',
    'Bangshal',
    'Bhashantek',
    'Cantonment',
    'Chackbazar',
    'Chawkbazar',
    'Darussalam',
    'Demra',
    'Dhanmondi',
    'Gandaria',
    'Gulshan',
    'Hazaribag',
    'Jatrabari',
    'Kafrul',
    'Kalabagan',
]);

const NEAREST_DHAKA_UPAZILLAS = createNormalizedSet([
    'Savar',
    'Dhamrai',
    'Keraniganj',
    'Nawabganj',
    'Dohar',
]);

const NEAREST_DHAKA_DISTRICTS = createNormalizedSet([
    'Gazipur',
    'Narayanganj',
]);

export const SHIPPING_FEE = {
    INSIDE_DHAKA: 60,
    NEAREST_DHAKA: 100,
    OUTSIDE_DHAKA: 120,
};

export const getShippingFeeByAddress = (address = {}) => {
    const district = normalizeLocationText(address?.district);
    const upazilla = normalizeLocationText(address?.upazilla);
    const nearestArea = normalizeLocationText(address?.nearestArea);

    if (district === 'dhaka') {
        if (INSIDE_DHAKA_SUB_DISTRICTS.has(nearestArea) || INSIDE_DHAKA_SUB_DISTRICTS.has(upazilla)) {
            return SHIPPING_FEE.INSIDE_DHAKA;
        }

        if (NEAREST_DHAKA_UPAZILLAS.has(upazilla) || NEAREST_DHAKA_UPAZILLAS.has(nearestArea)) {
            return SHIPPING_FEE.NEAREST_DHAKA;
        }

        return SHIPPING_FEE.OUTSIDE_DHAKA;
    }

    if (NEAREST_DHAKA_DISTRICTS.has(district)) {
        return SHIPPING_FEE.NEAREST_DHAKA;
    }

    return SHIPPING_FEE.OUTSIDE_DHAKA;
};
