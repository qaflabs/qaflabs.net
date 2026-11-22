interface SectionLabelProps {
  number: string;
  label: string;
}

export function SectionLabel({ number, label }: SectionLabelProps) {
  return (
    <p className="text-sm text-muted">
      <span className="font-mono text-vermilion-soft">{number}</span> {label}
    </p>
  );
}
