const localDataName = 'mateInvoice';
const orderStatusOptions = ['Pending', 'Shipped', 'Delivered'];

const fakedata = [
  {
    key: '0818ca6d-2f09-4a3e-bb35-51c2199ea9e8',
    id: '0818ca6d-2f09-4a3e-bb35-51c2199ea9e8',
    vehicle_type_id: '7e9b7b7b-61ca-42e2-a960-abd5b6caba86',
    name: '1100 [2018 Toyota Prius]',
    brand: '2003-Present',
    Model: 'Prius',
    build_date: '2023-02-06T12:30:45Z',
    wheel_count: 4,
    tyre_rotation_max_threshold_km: 1000,
    is_trailer: true,
    create_time: '2023-02-06T13:32:18Z',
    update_time: '2023-02-06T13:32:18Z',
  },
  {
    key: '48694a2b-13aa-4949-bdc4-035ef85dcf8e',
    id: '48694a2b-13aa-4949-bdc4-035ef85dcf8e',
    vehicle_type_id: '7e9b7b7b-61ca-42e2-a960-abd5b6caba86',
    name: '4100 [2012 Freightliner Cascadia]',
    brand: '1916-Present',
    Model: 'Cascadia',
    build_date: '2023-02-06T12:30:45Z',
    wheel_count: 1,
    tyre_rotation_max_threshold_km: 700,
    is_trailer: true,
    create_time: '2023-02-06T14:14:24Z',
    update_time: '2023-02-06T14:14:24Z',
  },
  {
    key: '60b5d152-97ed-41f6-aec2-1e3e6e640e7c',
    id: '60b5d152-97ed-41f6-aec2-1e3e6e640e7c',
    vehicle_type_id: '7e9b7b7b-61ca-42e2-a960-abd5b6caba86',
    name: '3100 [2014 Chevrolet Express Cargo]',
    brand: 'Toyota',
    Model: '1947-present',
    build_date: '2023-02-06T12:30:45Z',
    wheel_count: 4,
    tyre_rotation_max_threshold_km: 1500,
    is_trailer: true,
    origin: 'Vsico',
    create_time: '2023-02-06T15:16:37Z',
    update_time: '2023-02-06T15:16:37Z',
  },
];

const createDemoData = () => {
  const localData = localStorage.getItem(localDataName);
  if (localData) {
    try {
      const invoices = JSON.parse(localData);
      if (invoices && invoices.length > 0) {
        return invoices;
      }
    } catch (e) {}
  }
  return fakedata;
};

export { fakedata, createDemoData, localDataName, orderStatusOptions };
