const shipping_countries={
  "JP": "Japan"
};


const subdivisions = {
  "IN-AN": "Andaman and Nicobar Islands",
  "IN-AP": "Andhra Pradesh",
  "IN-AR": "Arunāchal Pradesh",
  "IN-AS": "Assam",
  "IN-BR": "Bihār",
  "IN-CH": "Chandigarh",
  "IN-CT": "Chhattīsgarh",
  "IN-DL": "Delhi",
  "IN-DH": "Dādra and Nagar Haveli and Damān and Diu",
  "IN-GA": "Goa",
  "IN-GJ": "Gujarāt",
  "IN-HR": "Haryāna",
  "IN-HP": "Himāchal Pradesh",
  "IN-JK": "Jammu and Kashmīr",
  "IN-JH": "Jhārkhand",
  "IN-KA": "Karnātaka",
  "IN-KL": "Kerala",
  "IN-LA": "Ladākh",
  "IN-LD": "Lakshadweep",
  "IN-MP": "Madhya Pradesh",
  "IN-MH": "Mahārāshtra",
  "IN-MN": "Manipur",
  "IN-ML": "Meghālaya",
  "IN-MZ": "Mizoram",
  "IN-NL": "Nāgāland",
  "IN-OR": "Odisha",
  "IN-PY": "Puducherry",
  "IN-PB": "Punjab",
  "IN-RJ": "Rājasthān",
  "IN-SK": "Sikkim",
  "IN-TN": "Tamil Nādu",
  "IN-TG": "Telangāna",
  "IN-TR": "Tripura",
  "IN-UP": "Uttar Pradesh",
  "IN-UT": "Uttarākhand",
  "IN-WB": "West Bengal"
};

const shipping_options = [
  {
    "id": "ship_DWy4oG8OM56Jx2",
    "description": "Domestic",
    "price": {
      "raw": 0,
      "formatted": "0.00",
      "formatted_with_symbol": "₹0.00",
      "formatted_with_code": "0.00 INR"
    },
    "countries": [
      "JP"
    ]
  },
  {
    "id": "ship_DWy4oG8OM56Jy3",
    "description": "Overseas",
    "price": {
      "raw": 0,
      "formatted": "0.00",
      "formatted_with_symbol": "₹0.00",
      "formatted_with_code": "0.00 INR"
    },
    "countries": [
      "JP"
    ]
  }
]


export function createPaymentMethod() {
  return {
    paymentMethod:{
      id:'payment_'+Math.random().toString(32).substring(2) // 'a6dpgjqlq8g' 等
    }
  };
}
  
export function getSubdivisions() {
  return JSON.parse(JSON.stringify(subdivisions));
}

export function getShippingCountries() {
  return JSON.parse(JSON.stringify(shipping_countries));
}

export function getShippingOptions() {
  return JSON.parse(JSON.stringify(shipping_options));
}
