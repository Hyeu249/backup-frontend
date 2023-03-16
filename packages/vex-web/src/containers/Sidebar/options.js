import React from 'react';
import { CarIcon, PeopleIcon } from '@iso/config/icon.config';
import {
  HouseIcon,
  EquipmentIcon,
  NewspaperIcon,
  ClipboardIcon,
  FlameIcon,
  UserTieIcon,
} from '@iso/vex_config/icon.config';

const options = [
  {
    key: 'asset-warehouse',
    label: 'sidebar.assetWarehouse',
    leftIcon: <HouseIcon size={19} />,
  },
  {
    key: 'vehicle',
    label: 'sidebar.vehicle',
    leftIcon: <CarIcon size={19} />,
    children: [
      {
        key: 'manage-vehicle',
        label: 'sidebar.manageVehicle',
      },
      {
        key: 'vehicle-type',
        label: 'sidebar.vehicleType',
      },
      {
        key: 'manage-tyre',
        label: 'sidebar.manageTyre',
      },
      {
        key: 'vehicle-document-type',
        label: 'sidebar.vehicleDocumentType',
      },
    ],
  },
  {
    key: 'vehicle-driver',
    label: 'sidebar.vehicleDriver',
    leftIcon: <PeopleIcon size={19} />,
    children: [
      {
        key: 'manage-vehicle-driver',
        label: 'sidebar.manageVehicleDriver',
      },
      {
        key: 'driver-deposit-type',
        label: 'sidebar.driverDepositType',
      },
      {
        key: 'driver-document-type',
        label: 'sidebar.driverDocumentType',
      },
    ],
  },
  {
    key: 'equipment',
    label: 'sidebar.equipment',
    leftIcon: <EquipmentIcon size={19} />,
    children: [
      {
        key: 'manage-equipment',
        label: 'sidebar.manageEquipment',
      },
      {
        key: 'equipment-group',
        label: 'sidebar.equipmentGroup',
      },
      {
        key: 'maintenance-type',
        label: 'sidebar.maintenanceType',
      },
    ],
  },
  {
    key: 'supplier',
    label: 'sidebar.supplier',
    leftIcon: <NewspaperIcon size={19} />,
    children: [
      {
        key: 'manage-supplier',
        label: 'sidebar.manageSupplier',
      },
      {
        key: 'contract',
        label: 'sidebar.contract',
      },
      {
        key: 'service-type',
        label: 'sidebar.serviceType',
      },
      {
        key: 'supplier-quote',
        label: 'sidebar.supplierQuote',
      },
      {
        key: 'fuel-price-quote',
        label: 'sidebar.fuelPriceQuote',
      },
      {
        key: 'tyre-price-quote',
        label: 'sidebar.tyrePriceQuote',
      },
    ],
  },
  {
    key: 'request',
    label: 'sidebar.request',
    leftIcon: <ClipboardIcon size={19} />,
    children: [
      {
        key: 'fuel-request',
        label: 'sidebar.fuelRequest',
      },
      {
        key: 'service-request',
        label: 'sidebar.serviceRequest',
      },
      {
        key: 'equipment-service-request',
        label: 'sidebar.equipmentServiceRequest',
      },
      {
        key: 'tyre-service-request',
        label: 'sidebar.tyreServiceRequest',
      },
    ],
  },
  {
    key: 'manage-fuel',
    label: 'sidebar.fuel',
    leftIcon: <FlameIcon size={19} />,
    children: [
      {
        key: 'fuel',
        label: 'sidebar.fuel',
      },
    ],
  },
  {
    key: 'admin',
    label: 'sidebar.admin',
    leftIcon: <UserTieIcon size={19} />,
    children: [
      {
        key: 'manage-role',
        label: 'sidebar.manageRole',
      },
      {
        key: 'manage-role-of-user',
        label: 'sidebar.manageRoleOfUser',
      },
    ],
  },
];
export default options;
