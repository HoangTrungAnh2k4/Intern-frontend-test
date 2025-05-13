export const avatarImageAPI = (name: string) => {
  const [first = "", last = ""] = name.toLowerCase().split(" ");
  const avatarName = `${first}+${last}`;

  return `https://ui-avatars.com/api/?background=random&rounded=true&name=${avatarName}`;
};

export const listUserAPI = (listUserId: number[]) =>
  `https://jsonplaceholder.typicode.com/users?_end=10&_start=0&${listUserId
    .map((id) => `id=${id}`)
    .join("&")}`;

export const userDetailAPI = (id: number) =>
  `https://jsonplaceholder.typicode.com/users/${id}`;

export const albumsOfUserAPI = (id: string) =>
  `https://jsonplaceholder.typicode.com/albums?_end=10&_start=0&userId=${id}`;
export const listAlbumAPI = (pageEnd: number, pageStart: number) =>
  `https://jsonplaceholder.typicode.com/albums?_end=${pageEnd}&_start=${pageStart}`;

export const albumDetailAPI = (id: string) =>
  `https://jsonplaceholder.typicode.com/albums/${id}`;

export const photosOfAlbumAPI = (id: string) =>
  `https://jsonplaceholder.typicode.com/photos?_end=10&_start=0&albumId=${id}`;
