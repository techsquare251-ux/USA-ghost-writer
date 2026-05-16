import { PORTFOLIO_CATEGORY_LABELS, type PortfolioBook, type PortfolioCategory } from "@/src/data/portfolio";

const apiBaseUrl = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").replace(/\/+$/, "");

export async function fetchPortfolioBooks(
  category?: PortfolioCategory,
  signal?: AbortSignal
): Promise<PortfolioBook[]> {
  const searchParams = new URLSearchParams();
  if (category) {
    searchParams.set("category", category);
  }

  const endpoint = apiBaseUrl
    ? `${apiBaseUrl}/api/portfolio${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
    : `/api/portfolio${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

  const response = await fetch(endpoint, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new Error(`Could not load portfolio items (${response.status})`);
  }

  return (await response.json()) as PortfolioBook[];
}

export { PORTFOLIO_CATEGORY_LABELS };
