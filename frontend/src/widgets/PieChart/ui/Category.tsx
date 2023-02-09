function SummaryCategory({
  category,
  amount,
  color,
  percent,
}: {
  category: string;
  amount: number;
  color: string;
  percent: number;
}) {
  return (
    <tr>
      <td>
        <div style={{ background: color }} />
      </td>
      <td>{category}</td>
      <td>{amount.toLocaleString()} ₽</td>
      <td>{percent.toFixed(2)}%</td>
    </tr>
  );
}

export default SummaryCategory;
