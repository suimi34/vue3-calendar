type Note = {
  name: String
  url: String
  tags: Tag[]
}

type Tag = {
  name: String
}

export { Note, Tag }
