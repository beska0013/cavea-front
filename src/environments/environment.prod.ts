
const endpoint = '';
export const environment = {
  production: true,
  api:{
    inventory: `${endpoint}/inventory`,
    locations: `${endpoint}/inventory/locations`
  }
};
