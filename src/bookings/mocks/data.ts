import type { Booking } from '../typings';
import { add, startOfDay, startOfWeek, sub } from 'date-fns';

export const nil: Booking = {
  id: '',
  propertyId: '', // nil
  from: '',
  to: '',
  offsetDays: 0,
};

export const oceanHouse1: Booking = {
  id: 'ocean-house-001',
  propertyId: 'ocean-house',
  from: sub(startOfWeek(Date.now()), { weeks: 3, days: 1 }).toISOString(),
  to: sub(startOfWeek(Date.now()), { weeks: 2, days: 2 }).toISOString(),
  offsetDays: 0.5,
};

export const peninsulaCottage1: Booking = {
  id: 'peninsula-cottage-001',
  propertyId: 'peninsula-cottage',
  from: add(startOfWeek(Date.now()), { weeks: 3, days: -2 }).toISOString(),
  to: add(startOfWeek(Date.now()), { weeks: 4, days: 3 }).toISOString(),
  offsetDays: 1,
};

export const peninsulaCottage2: Booking = {
  id: 'peninsula-cottage-002',
  propertyId: 'peninsula-cottage',
  from: add(startOfWeek(Date.now()), { weeks: 6, days: 0 }).toISOString(),
  to: add(startOfWeek(Date.now()), { weeks: 6, days: 3 }).toISOString(),
  offsetDays: 1,
};

export const treeNook1: Booking = {
  id: 'tree-nook-001',
  propertyId: 'tree-nook',
  from: sub(startOfDay(Date.now()), { days: 3 }).toISOString(),
  to: add(startOfDay(Date.now()), { days: 2 }).toISOString(),
  offsetDays: 3,
};

export const bookingById = new Map<Booking['id'], Booking>([
  [oceanHouse1.id, oceanHouse1],
  [peninsulaCottage1.id, peninsulaCottage1],
  [peninsulaCottage2.id, peninsulaCottage2],
  [treeNook1.id, treeNook1],
]);
