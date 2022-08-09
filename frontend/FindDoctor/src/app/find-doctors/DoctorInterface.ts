export interface Doctor {
    username: String,
    fullname: String,
    phone: String,
    avatarurl: String,
    specialty: String,
    description: String,
    degrees: String,
    location: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    },
    appointments: [{
        username: String,
        phone: String,
        time: Date,
        status: String
    }]
}
