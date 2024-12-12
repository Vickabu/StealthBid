import { fetchListings, fetchSearchListings } from "../api/listings/read";

export async function fetchListingsData(
  query = "",
  limit = 100,
  sort = "endsAt",
  sortOrder = "asc",
) {
  if (query) {
    return fetchSearchListings(query, 1, limit, sort, sortOrder);
  } else {
    return fetchListings(1, limit, "", sort, sortOrder);
  }
}
