import { Icon } from "./Icon";

export default function ChallengeCard({ text }: { text: string }) {
  return (
    <section className="bg-surface-container-high rounded-xl p-md flex flex-col gap-sm border border-surface-variant glow-success">
      <div className="flex items-center gap-3 mb-xs">
        <div className="w-10 h-10 rounded-lg bg-primary-container/20 flex items-center justify-center">
          <Icon name="stars" className="text-primary-container" fill />
        </div>
        <h3 className="font-title-md text-title-md text-on-surface">Daily Quest</h3>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>
      <button
        type="button"
        className="mt-auto bg-surface-bright border-2 border-primary py-3 rounded-lg font-label-bold text-label-bold text-primary flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all"
      >
        <Icon name="send" /> CONTACT LEADER
      </button>
    </section>
  );
}
