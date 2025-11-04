import { worksData } from "@/app/data/worksData";
import AnimatedSwiperWorks from "@/app/works/components/animatedWorksSlide";
import AnimatedWorksDetails from "@/app/works/components/animatedWorksDetails";

interface WorksDetailProps {
  params: { slug: string };
}

export default async function WorksDetail({ params }: WorksDetailProps) {
  // destructure slug
  const { slug } = await params; 

  // find the project
  const project = worksData.find(work => work.slug === slug);

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <section
        className="bg-cover bg-center bg-no-repeat min-h-screen relative flex items-end px-[30px]"
        style={{ backgroundImage: `url(${project.mainImage})` }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-black/0"></div>
        <div className="max-w-[1440px] mx-auto w-full flex items-end justify-between gap-[70px] mb-[90px]">
          <p className="flex-1 text-[51px] text-white">{project.title}</p>
          <p className="flex-1 text-lg text-white max-w-[650px]">{project.description}</p>
        </div>
      </section>

      <section className="px-[30px] py-[90px]">
        <div className="max-w-[1440px] mx-auto flex justify-between gap-5">
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-5 max-w-[568px]">
              <p className="text-[36px]">{project.details}</p>
              <p className="text-lg max-w-[530px]">{project.detailsText}</p>
            </div>

            <div className="flex gap-[30px]">
              <p className="text-lg">
                <strong>Location</strong> {project.location}
              </p>
              <p className="text-lg">
                <strong>Surface</strong> {project.surface}
              </p>
              <p className="text-lg">
                <strong>Year</strong> {project.year}
              </p>
            </div>
          </div>

          <div className="max-w-[710px] w-full">
            <AnimatedSwiperWorks slides={project.slider} />
          </div>
        </div>
      </section>

      <section className="px-[30px] py-[90px]">
        <AnimatedWorksDetails project={project} />
      </section>
    </div>
  );
}
