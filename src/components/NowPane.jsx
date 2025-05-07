function NowPane({ city, temp, description }) {
    return (
      <section className="flex flex-col items-center gap-2 pt-12">
        <h1 className="text-6xl font-light tracking-tight">{city}</h1>
        <p className="text-[9rem] leading-none font-thin -mt-4">
          {Math.round(temp)}°
        </p>
        <p className="capitalize text-xl tracking-wide">{description}</p>
      </section>
    );
  }
  