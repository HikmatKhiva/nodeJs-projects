interface ViewData {
  value?: number;
  result?: number;
  from?: any;
  to?: string;
  [key: string]: any; // 👈 allow dynamic keys
}
