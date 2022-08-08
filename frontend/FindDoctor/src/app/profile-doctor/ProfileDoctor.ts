export interface ProfileDoctor {
  username: string,
  fullname: string,
  phone: string,
  avatarurl: string,
  specialty: string,
  description: string,
  degrees: string,
  location: {
    street: string,
    city: string,
    state: string,
    zipcode: string
  }
}
