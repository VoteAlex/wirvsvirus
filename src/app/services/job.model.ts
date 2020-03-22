
export interface Job {
    uid?: string;
    title?: string;
    address?: string;
    city: string;
    zipCode: string;
    hyperlinkToJob: string;
    dateSubmitted?: Date;
    email?: string;
    fullDescription?: string;
    fulltime?: boolean;
    jobExperience?: string;
    wage?: string;
    workHoursPerWeek?: number;
    locationLat?: number;
    locationLng?: number;
    place?: any;

}
