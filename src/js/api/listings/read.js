import {
  API_LISTINGS,
  API_LISTINGS_SEARCH,
  API_AUCTION_PROFILES,
} from "../constant";
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
    url.searchParams.append("_active", active ? "true" : "false");

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

export async function fetchSearchListings(
  query,
  page = 1,
  limit = 12,
  sort = "endsAt",
  sortOrder = "asc"
) {
  try {
    const url = new URL(API_LISTINGS_SEARCH);
    url.searchParams.append("sort", sort);
    url.searchParams.append("sortOrder", sortOrder);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);
    url.searchParams.append("q", encodeURIComponent(query));

    console.log("Final URL:", url.toString());

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

export async function fetchUserListings(name) {
  try {
    const response = await fetch(`${API_AUCTION_PROFILES}/${name}/listings`, {
      method: "GET",
      headers: headers(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user listings: ${response.status}`);
    }

    const listingsData = await response.json();
    return listingsData;
  } catch (error) {
    console.error("Error fetching user listings:", error);
    throw error;
  }
}
