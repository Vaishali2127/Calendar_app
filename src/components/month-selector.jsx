// Month Selector component
const MonthSelector = ({ onChange }) => (
  <select
    defaultValue={new Date().getMonth()}
    onChange={(e) => onChange(Number(e.target.value))}
    className="border rounded-md px-4 py-2 outline-none"
  >
    {Array.from({ length: 12 }, (_, i) => (
      <option value={i} key={i}>
        {new Date(2023, i).toLocaleString("default", { month: "long" })}
      </option>
    ))}
  </select>
);

export default MonthSelector;
