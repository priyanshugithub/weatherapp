function DailyGrid({ days }) {
    // collapse the 3‑hourly data into days here
    return (
      <section className="mt-4 px-6">
        <div className="divide-y divide-white/20">
          {days.map((d) => (
            <div key={d.date} className="flex items-center py-2">
              <span className="w-1/4">{formatDay(d.date)}</span>
              <div className="flex-1 flex items-center gap-2">
                <img
                  src={`https://openweathermap.org/img/wn/${d.icon}.png`}
                  alt=""
                  className="w-8 h-8"
                />
                {/* temperature bar */}
                <div className="relative h-1 flex-1 bg-white/20 rounded-full">
                  <div
                    className="absolute h-1 bg-white rounded-full"
                    style={{ left: `${d.minPct}%`, width: `${d.maxPct - d.minPct}%` }}
                  />
                </div>
                <span className="w-10 text-right">{d.max}°</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }  