interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p className="font-mono text-[13px] text-muted">
      <span className="text-vermilion-soft">{number}</span> {label}
    </p>
  );
}
