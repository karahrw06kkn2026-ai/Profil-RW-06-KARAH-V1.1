interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconBg?: string;
}

export default function StatCard({ icon, value, label, iconBg = "bg-primary-900" }: StatCardProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className={`w-12 h-12 ${iconBg} rounded-xl flex items-center justify-center text-white shrink-0`}>
        {icon}
      </div>
      <div>
        <div className="font-bold text-gray-900 text-xl leading-tight">{value}</div>
        <div className="text-gray-500 text-sm">{label}</div>
      </div>
    </div>
  );
}
