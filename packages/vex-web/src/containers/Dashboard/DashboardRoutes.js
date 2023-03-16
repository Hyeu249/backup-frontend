import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
  {
    path: 'asset-warehouse',
    component: lazy(() =>
      import('@iso/vex_containers/AssetWarehouse/AssetWarehouse')
    ),
  },
  {
    path: 'manage-vehicle/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageVehicle/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-vehicle',
    component: lazy(() =>
      import('@iso/vex_containers/ManageVehicle/ManageVehicle')
    ),
  },
  {
    path: 'vehicle-type',
    component: lazy(() =>
      import('@iso/vex_containers/VehicleType/VehicleType')
    ),
  },
  {
    path: 'manage-tyre/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageTyre/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-tyre',
    component: lazy(() => import('@iso/vex_containers/ManageTyre/ManageTyre')),
  },
  {
    path: 'manage-vehicle-driver/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageDriver/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-vehicle-driver',
    component: lazy(() =>
      import('@iso/vex_containers/ManageDriver/ManageDriver')
    ),
  },
  {
    path: 'driver-deposit-type',
    component: lazy(() =>
      import('@iso/vex_containers/DriverDepositType/DriverDepositType')
    ),
  },
  {
    path: 'driver-document-type',
    component: lazy(() =>
      import('@iso/vex_containers/DriverDocumentType/DriverDocumentType')
    ),
  },
  {
    path: 'maintenance-type',
    component: lazy(() =>
      import('@iso/vex_containers/MaintenanceType/MaintenanceType')
    ),
  },
  {
    path: 'manage-equipment/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageEquipment/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-equipment',
    component: lazy(() =>
      import('@iso/vex_containers/ManageEquipment/ManageEquipment')
    ),
  },
  {
    path: 'equipment-group',
    component: lazy(() =>
      import('@iso/vex_containers/EquipmentGroup/EquipmentGroup')
    ),
  },
  {
    path: 'manage-supplier/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageSupplier/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-supplier',
    component: lazy(() =>
      import('@iso/vex_containers/ManageSupplier/ManageSupplier')
    ),
  },
  {
    path: 'contract/:id',
    component: lazy(() =>
      import('@iso/vex_containers/Contract/EditOverall/EditOverall')
    ),
  },
  {
    path: 'contract',
    component: lazy(() => import('@iso/vex_containers/Contract/Contract')),
  },
  {
    path: 'fuel-request/:id',
    component: lazy(() =>
      import('@iso/vex_containers/FuelRequest/EditOverall/EditOverall')
    ),
  },
  {
    path: 'fuel-request',
    component: lazy(() =>
      import('@iso/vex_containers/FuelRequest/FuelRequest')
    ),
  },
  {
    path: 'service-type',
    component: lazy(() =>
      import('@iso/vex_containers/ServiceType/ServiceType')
    ),
  },
  {
    path: 'supplier-quote/:id',
    component: lazy(() =>
      import('@iso/vex_containers/SupplierQuote/EditOverall/EditOverall')
    ),
  },
  {
    path: 'supplier-quote',
    component: lazy(() =>
      import('@iso/vex_containers/SupplierQuote/SupplierQuote')
    ),
  },
  {
    path: 'fuel',
    component: lazy(() => import('@iso/vex_containers/Fuel/Fuel')),
  },
  {
    path: 'fuel-price-quote/:id',
    component: lazy(() =>
      import('@iso/vex_containers/FuelPriceQuote/EditOverall/EditOverall')
    ),
  },
  {
    path: 'fuel-price-quote',
    component: lazy(() =>
      import('@iso/vex_containers/FuelPriceQuote/FuelPriceQuote')
    ),
  },
  {
    path: 'tyre-price-quote/:id',
    component: lazy(() =>
      import('@iso/vex_containers/TyrePriceQuote/EditOverall/EditOverall')
    ),
  },
  {
    path: 'tyre-price-quote',
    component: lazy(() =>
      import('@iso/vex_containers/TyrePriceQuote/TyrePriceQuote')
    ),
  },
  {
    path: 'tyre-service-request/:id',
    component: lazy(() =>
      import('@iso/vex_containers/TyreServiceRequest/EditOverall/EditOverall')
    ),
  },
  {
    path: 'tyre-service-request',
    component: lazy(() =>
      import('@iso/vex_containers/TyreServiceRequest/TyreServiceRequest')
    ),
  },
  {
    path: 'vehicle-document-type',
    component: lazy(() =>
      import('@iso/vex_containers/VehicleDocumentType/VehicleDocumentType')
    ),
  },
  {
    path: 'equipment-service-request/:id',
    component: lazy(() =>
      import(
        '@iso/vex_containers/EquipmentServiceRequest/EditOverall/EditOverall'
      )
    ),
  },
  {
    path: 'equipment-service-request',
    component: lazy(() =>
      import(
        '@iso/vex_containers/EquipmentServiceRequest/EquipmentServiceRequest'
      )
    ),
  },
  {
    path: 'service-request/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ServiceRequest/EditOverall/EditOverall')
    ),
  },
  {
    path: 'service-request',
    component: lazy(() =>
      import('@iso/vex_containers/ServiceRequest/ServiceRequest')
    ),
  },
  {
    path: 'manage-role/:id',
    component: lazy(() =>
      import('@iso/vex_containers/ManageRole/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-role',
    component: lazy(() => import('@iso/vex_containers/ManageRole/ManageRole')),
  },
  {
    path: 'manage-role-of-user/:id',
    component: lazy(() =>
      import('@iso/vex_containers/RoleOfUser/EditOverall/EditOverall')
    ),
  },
  {
    path: 'manage-role-of-user',
    component: lazy(() => import('@iso/vex_containers/RoleOfUser/RoleOfUser')),
  },
];

export default function AppRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}
