export interface store {
  user: {email: string | undefined, firstname: string | undefined, lastname: string | undefined},
  nearGroups: [{} | undefined]
}

export interface messageType {
  user: {
    id: string,
    firstname: string,
    lastname: string,
    photo: string,
  },
  message: string | undefined,
  messageImage: string | undefined,
  date: Date,
  readed: Boolean,
}