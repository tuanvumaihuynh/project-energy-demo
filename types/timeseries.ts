type IntervalType = "SECOND" | "MINUTE" | "HOUR" | "DAY" | "WEEK" | "MONTH";
type AggregationType = "AVG" | "SUM" | "COUNT" | "MIN" | "MAX";

interface AttributeResponse {
  key: string;
  value: any;
  last_update: string;
}
