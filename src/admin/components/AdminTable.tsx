import { Icon } from "../../components/common/navigation";

type AdminTableProps = {
  title: string;
  rows: string[][];
  onRowAction?: (rowIndex: number) => void;
  actionLabel?: string;
  onSecondaryAction?: (rowIndex: number) => void;
  secondaryActionLabel?: string;
};

export default function AdminTable({
  title,
  rows,
  onRowAction,
  actionLabel = "•••",
  onSecondaryAction,
  secondaryActionLabel = "Delete",
}: AdminTableProps) {
  return (
    <div className="data-card">
      <div className="data-head">
        <h2>{title}</h2>

        <button>
          <Icon name="search" /> Search
        </button>
      </div>

      <div className="data-table">
        {rows.map((row, rowIndex) => (
          <div className="data-row" key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <span
                key={cellIndex}
                className={
                  cellIndex === row.length - 1
                    ? `status status-${cell.toLowerCase()}`
                    : ""
                }
              >
                {cell}
              </span>
            ))}

            <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  {onRowAction && (
    <button
      type="button"
      onClick={() => onRowAction(rowIndex)}
    >
      {actionLabel}
    </button>
  )}

  {onSecondaryAction && (
    <button
      type="button"
      onClick={() => onSecondaryAction(rowIndex)}
      style={{
        color: "#c0392b",
        border: "1px solid #e8c5c0",
        borderRadius: "6px",
        padding: "6px 12px",
        background: "transparent",
        cursor: "pointer",
      }}
    >
      {secondaryActionLabel}
    </button>
  )}
</div>
          </div>
        ))}
      </div>
    </div>
  );
}