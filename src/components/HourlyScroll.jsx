import { Scroll } from "lucide-react"; // or any icon set

function HourlyScroll({ list }) {
  return (
    <section className="mt-8 overflow-x-auto pb-4">
      <ul className="flex gap-4 px-6 snap-x snap-mandatory">
        {list.slice(0, 8).map((h) => (
          <li
            key={h.dt}
            className="flex flex-col items-center gap-1 snap-center min-w-[4.5rem]"
          >
            <span className="text-sm">{formatHour(h.dt_txt)}</span>
            <img
              src={Scroll}
              alt=""
              className="w-10 h-10"
            />
            <span className="text-lg">{Math.round(h.main.temp)}°</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
export default HourlyScroll;