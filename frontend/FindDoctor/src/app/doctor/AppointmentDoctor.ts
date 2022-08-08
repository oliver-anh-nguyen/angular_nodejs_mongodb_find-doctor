export interface AppointmentDoctor {
  patient: {
    username: string,
    fullname: string,
    phone: string,
    avatarurl: string
  },
  time: number,
  status: string
}
