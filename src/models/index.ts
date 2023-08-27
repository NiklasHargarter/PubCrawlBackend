export type User = {
  user_id: string;
  user_name: string;
}

export type Location = {
  location_id?: string;
  location_name: string;
  lat: number;
  long: number;
  address: string;
  location_image: string;
  actions?: Array<Action>;
}

export type Action = {
  type: string;
  user_id: string;
  location_id: string;
  action_image: string;
}

