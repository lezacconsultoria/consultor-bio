
export enum AppRoutes {
  HOME = '/',
  BOOKING = '/booking',
  BIO = '/bio',
  SUCCESS = '/success'
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Testimonial {
  metric: string;
  label: string;
  context: string;
}
