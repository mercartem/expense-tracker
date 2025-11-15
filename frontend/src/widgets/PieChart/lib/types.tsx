export interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  value: number;
  startAngle: number;
  endAngle: number;
  fill: string;
}

export interface Category {
  name: string;
  value: number;
}

export interface ExpensesAnalysisProps {
  categories: Category[];
  period?: [Date, Date];
}
