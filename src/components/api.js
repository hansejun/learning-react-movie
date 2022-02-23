export const getReviews = async ({
  order = "createdAt",
  offset = 0,
  limit = 6,
}) => {
  const query = `order=${order}&offset=${offset}&limit=${limit}`;
  const response = await fetch(
    `https://learn.codeit.kr/api/film-reviews?${query}`
  );
  if (!response.ok) {
    throw new Error("ㄹㅣ뷰를 불러오는데 실패하였습니다.");
  }
  const body = await response.json();
  return body;
};

export default getReviews;
