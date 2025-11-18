export default function ProjectItem({ title, description }) {
  return (
    <div className="flex gap-6 items-center my-8">
      <div className="w-[160px] h-[110px] bg-gray-300 rounded-md"></div>
      <div>
        <div className="text-xl font-bold font-kalam">{title}</div>
        <div className="opacity-60">{description}</div>
      </div>
    </div>
  )
}
