import FlowingMenu from "@/components/ui/FlowingMenu";
import { MagicCard } from "@/components/ui/magic-card";
import { ShineBorder } from "@/components/ui/shine-border"; 

const demoItems = [
  {
    link: "events/technical",
    text: "technical",
    image: "https://picsum.photos/600/400?random=1",
    paragraph: "Technical events are a showcase of innovation and creativity in the field of technology."
  },
  {
    link: "events/non_technical",
    text: "non technical",
    image: "https://picsum.photos/600/400?random=2",
    paragraph: "Non-technical events are a showcase of creativity and talent in various fields such as art, music, and literature."
  },
  {
    link: "events/cultural",
    text: "cultural",
    image: "https://picsum.photos/600/400?random=3",
    paragraph: "Cultural events are a celebration of art, dance, and creativity."
  },
  {
    link: "events/mega",
    text: "mega",
    image: "https://picsum.photos/600/400?random=4",
    paragraph: "Mega events are the grand spectacles of the fest, featuring a variety of competitions and performances that showcase the talents and skills of participants in a larger-than-life setting."
  }
];

export default function EventWidget() {
  return (
      <div style={{ height: "600px", position: "relative" }}>
        {/* <MagicCard gradientFrom="hsl(var(--primary))" gradientTo="hsl(var(--secondary))"> */}
          <FlowingMenu items={demoItems} />
        {/* </MagicCard> */}
      </div>
  );
}
