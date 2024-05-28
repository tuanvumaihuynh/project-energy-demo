interface RouteProps {
  path: string;
  label: string;
}

interface ItemPagination<T> {
  items: T[];
  page: number;
  page_size: number;
  total_count: number;
  total_pages: number;
}
