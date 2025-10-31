
import BottomStudio from "../components/bottomPart/bottomStudio";
import AnimatedTextSpace from "../components/animatedText/animatedTextSpace";
import AnimatedTopStudio from "../components/animatedTop/animatedTopStudio";
import Image from "next/image";
import TeamSection from "../components/animatedImages/animatedTeamSection";
import TableStudio from "../components/tableStudio/tableStudio";

export default function Studio() {
    return (
        <div>
            <section className="max-w-[1440px] mx-auto pt-[180px] pb-[90px]">
                <AnimatedTopStudio />
            </section>

            <section className="max-w-[1440px] mx-auto py-[90px]">
                <div className="max-w-[720px] mx-auto text-center">
                    <AnimatedTextSpace text="A space should not demand attention — it should reward presence." />

                </div>
            </section>

            <section className="max-w-[1440px] mx-auto py-[90px]">
                <TeamSection />
            </section>

            <section className="max-w-[1440px] mx-auto py-[90px]">
                <TableStudio />
            </section>


            <BottomStudio />
        </div >
    );
}
