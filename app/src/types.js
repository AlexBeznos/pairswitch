export interface Dev {
  id: string,
  name: string
}

export interface Task {
  id: string,
  title: string,
  url: string,
  participants: array<Dev>
}
