import { worksData } from "@/app/data/worksData";
import AnimatedSwiperWorks from "../components/animatedWorksSlide";
import AnimatedWorksDetails from "../components/animatedWorksDetails";

interface WorksDetailProps {
  params: Promise<{ slug: string }>;
}

export default async function WorksDetail({ params }: WorksDetailProps) {
  const { slug } = await params;

  const project = worksData.find(work => work.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <section
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex items-end px-2.5 md:px-[30px]"
        style={{ backgroundImage: `url(${project.mainImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-black/0 z-0"></div>

        <div className="max-w-[1440px] mx-auto w-full flex flex-col xl:flex-row xl:items-end justify-between gap-[30px] xl:gap-[70px] mb-[90px] z-10">
          <p className="flex-1 text-[51px] text-white">
            {project.title}
          </p>

          <p className="flex-1 text-lg text-white max-w-[650px]">
            {project.description}
          </p>
        </div>
      </section>


      <section className="px-2.5 md:px-[30px] py-[90px]">
        <div className="max-w-[1440px] mx-auto flex flex-col 3xl:flex-row justify-between gap-5">
          <div className="flex flex-col justify-between gap-[90px] 3xl:gap-0">
            <div className="flex flex-col gap-5 3xl:max-w-[568px]">
              <p className="text-[36px]">{project.details}</p>
              <p className="text-lg 3xl:max-w-[530px]">{project.detailsText}</p>
            </div>

            <div className="flex flex-col md:flex-row gap-2.5 md:gap-[30px]">
              <p className="text-lg">
                <strong className="font-normal!">Location</strong> {project.location}
              </p>
              <p className="text-lg">
                <strong className="font-normal!">Surface</strong> {project.surface}
              </p>
              <p className="text-lg">
                <strong className="font-normal!">Year</strong> {project.year}
              </p>
            </div>
          </div>

          <div className="3xl:max-w-[710px] w-full">
            <AnimatedSwiperWorks slides={project.slider} />
          </div>
        </div>
      </section>

      <section className="px-0 md:px-[30px] py-[90px]">
        <AnimatedWorksDetails project={project} />
      </section>
    </div>
  );
}