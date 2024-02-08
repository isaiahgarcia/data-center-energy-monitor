import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-full bg-white">
      <div className="bg-[url('/images/background-image.jpeg')] h-[500px] bg-no-repeat bg-center bg-cover flex items-center justify-center">
        <div className="flex flex-col space-y-20 items-center justify-center">
          <p className="text-6xl text-balance text-center">
            Increasing transparency on data center energy usage
          </p>
          <button className="w-[200px] bg-white rounded-md text-black p-3">
            <p className="text-sm">
              Explore Industry Trends
            </p>
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center text-black">
        <div className="flex flex-col items-center justify-center p-20">
          <div className="flex flex-row items-start space-x-10 pb-10">
            <h1 className="basis-1/4 text-5xl">About Us</h1>
            <p className="basis-3/4">
              We are a team of University of California, Santa Barbara
              based researchers aiming to increase transparency and
              understanding of trends in global data center energy use.
              This website is a dashboard for modelers, policy-makers,
              and the general public to gain insight into data currently
              being reported by many of the world largest technology
              companies. Our visualization uses aggregated energy data
              primarily collected from publicly disclosed corporate
              sustainability reports.
            </p>
          </div>
          <div className="w-full flex flex-col">
            <div className="bg-primary p-3 rounded-md">
              <h1 className="text-xl text-white">
                Research Papers
              </h1>
            </div>
            <div className="bg-[#F5F5F5] p-5 rounded-md">
              <div className="flex flex-row">
                <div className="basis-1/2 flex flex-col space-y-5">
                  <h1 className="text-lg">
                    Published
                  </h1>
                  <div>
                    <a href="https://escholarship.org/content/qt84p772fc/qt84p772fc.pdf" rel="noopener noreferrer" target="_blank">
                      <p className="underline underline-offset-2 hover:bg-[#d1ecf6]">United States Data Center Energy Report</p>
                    </a>
                    <a href="https://www.science.org/doi/abs/10.1126/science.aba3758" rel="noopener noreferrer" target="_blank">
                      <p className="underline underline-offset-2 hover:bg-[#d1ecf6]">Recalibrating global data center energy-use estimates</p>
                    </a>
                    <a href="https://www.science.org/doi/abs/10.1126/science.aba3758" rel="noopener noreferrer" target="_blank">
                      <p className="underline underline-offset-2 hover:bg-[#d1ecf6]">Report to Congress on Server and Data Center Energy Efficiency: Public Law 109-431</p>
                    </a>
                  </div>
                </div>
                <div className="basis-1/2">
                  <h1 className="text-lg">
                    Ongoing
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
