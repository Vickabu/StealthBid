import { API_LISTINGS } from "../constant";
import { headers } from "../headers";

export async function fetchListings(
  page = 1,
  limit = 12,
  tag = "",
  sort = "endsAt",
  sortOrder = "asc",
  active = true
) {
  try {
    const url = new URL(API_LISTINGS);
    url.searchParams.append("_seller", "true");
    url.searchParams.append("_bids", "true");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", limit);
    url.searchParams.append("tag", tag);
    url.searchParams.append("sort", sort);
    url.searchParams.append("sortOrder", sortOrder);

    if (active) {
      url.searchParams.append("_active", "true");
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const { data } = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}

export async function fetchListing(id) {
  try {
    const url = new URL(`${API_LISTINGS}/${id}`);
    url.searchParams.append("_seller", "true");
    url.searchParams.append("_bids", "true");

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const { data } = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching listing:", error);
    return null;
  }
}
