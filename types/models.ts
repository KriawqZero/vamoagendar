export enum Plan {
  FREE = "FREE",
  PLUS = "PLUS",
  PRO = "PRO",
}

export enum ExceptionType {
  UNAVAILABLE = "UNAVAILABLE",
  OVERRIDE = "OVERRIDE",
}

export enum AppointmentStatus {
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum SubscriptionStatus {
  ACTIVE = "ACTIVE",
  PAST_DUE = "PAST_DUE",
  CANCELED = "CANCELED",
  INACTIVE = "INACTIVE",
  TRIALING = "TRIALING",
}

export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
  bookingCode: string | null;
  customSlug: string | null;
  slugChangedAt: Date | null;
  plan: Plan;
  accentColor: string;
  logoUrl: string | null;
  businessName: string | null;
}

export interface Service {
  id: string;
  userId: string;
  name: string;
  durationMinutes: number;
  active: boolean;
  createdAt: Date;
  user?: User;
}

export interface WorkingHours {
  id: string;
  userId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  user?: User;
}

export interface AvailabilityException {
  id: string;
  userId: string;
  date: Date;
  startTime: string | null;
  endTime: string | null;
  type: ExceptionType;
  user?: User;
}

export interface Holiday {
  id: string;
  userId: string;
  date: Date;
  name: string;
  user?: User;
}

export interface Appointment {
  id: string;
  userId: string;
  serviceId: string;
  clientName: string;
  clientEmail: string | null;
  clientPhone: string | null;
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  createdAt: Date;
  user?: User;
  service?: Service;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: Plan;
  status: SubscriptionStatus;
  mpSubscriptionId: string | null;
  mpCustomerId: string | null;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  canceledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
}
