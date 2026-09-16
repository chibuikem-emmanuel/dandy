export interface GuestRSVP {
  id: number;
  fullName?: string;
  full_name?: string;
  name?: string;
  attendance: "yes" | "no";
  submittedAt?: string;
  submitted_at?: string;
  created_at?: string;
}

export interface RSVPSummary {
  total_responses: number;
  attending_count: number;
  declined_count: number;
}